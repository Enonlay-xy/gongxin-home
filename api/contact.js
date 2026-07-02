import Dm, { SingleSendMailRequest } from '@alicloud/dm20151123'
import { Config } from '@alicloud/openapi-client'

// ─── 速率限制（内存级，per-instance；生产环境建议升级为 Vercel KV / Upstash Redis）───
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 分钟窗口
const RATE_LIMIT_MAX = 3 // 每个 IP 每窗口最多 3 次
const rateLimitMap = new Map() // key: ip → { count, firstRequestTime }

// ─── 来源白名单 ───
function getAllowedOrigins() {
  const extra = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return [
    'https://gongxin-home.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    ...extra,
  ]
}

// ─── 工具函数 ───
function json(status, data, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  })
}

// 兼容 Node.js Runtime（headers 是普通对象）与 Edge Runtime（headers 是 Headers 对象）
function getHeader(req, name) {
  if (typeof req.headers.get === 'function') return req.headers.get(name) || ''
  return req.headers[name] || req.headers[name.toLowerCase()] || ''
}

function getClientIp(req) {
  const xff = getHeader(req, 'x-forwarded-for')
  return xff.split(',')[0].trim() || 'unknown'
}

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now })
    // 定期清理过期条目，防止内存无限增长
    if (rateLimitMap.size > 1000) {
      for (const [key, val] of rateLimitMap) {
        if (now - val.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
          rateLimitMap.delete(key)
        }
      }
    }
    return { allowed: true }
  }

  entry.count++
  if (entry.count > RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - entry.firstRequestTime)) / 1000),
    }
  }
  return { allowed: true }
}

// 过滤控制字符和零宽字符
function sanitize(str) {
  return str.replace(/[\x00-\x1F\x7F\u200B-\u200D\uFEFF]/g, '')
}

function verifyOrigin(req) {
  const origin = getHeader(req, 'origin')
  const referer = getHeader(req, 'referer')
  const allowed = getAllowedOrigins()

  // 精确匹配白名单
  if (allowed.some((a) => origin === a)) return true
  if (allowed.some((a) => referer.startsWith(a + '/') || referer.startsWith(a + '#'))) return true

  // 允许同项目的 Vercel 预览部署（https://gongxin-home-xxx.vercel.app）
  if (origin.startsWith('https://gongxin-home-') && origin.endsWith('.vercel.app')) return true
  if (referer.startsWith('https://gongxin-home-') && referer.includes('.vercel.app')) return true

  return false
}

async function verifyTurnstile(token, ip) {
  // 通过环境变量 TURNSTILE_ENABLED 控制是否启用验证（默认关闭，'true' 启用）
  if ((process.env.TURNSTILE_ENABLED ?? 'false') !== 'true') return true
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return false
  if (!token) return false

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: ip,
      }),
    })
    const data = await res.json()
    return data.success === true
  } catch {
    return false
  }
}

// ─── 主处理函数（使用 fetch Web Standard export 以获得标准 Request 对象）───
export default {
  async fetch(req) {
    // 仅允许 POST
    if (req.method !== 'POST') {
      return json(405, { success: false, message: 'Method not allowed' })
    }

    // 来源验证（CSRF 防护）
    if (!verifyOrigin(req)) {
      return json(403, { success: false, message: 'Forbidden' })
    }

    // IP 提取 + 速率限制
    const ip = getClientIp(req)
    const rateCheck = checkRateLimit(ip)
    if (!rateCheck.allowed) {
      return json(
        429,
        { success: false, message: '请求过于频繁，请稍后再试' },
        { 'Retry-After': String(rateCheck.retryAfter) },
      )
    }

    // 解析请求体
    let body
    try {
      body = await req.json()
    } catch {
      return json(400, { success: false, message: 'Invalid JSON' })
    }

    // Turnstile 人机验证
    const turnstileValid = await verifyTurnstile(body.turnstileToken, ip)
    if (!turnstileValid) {
      return json(403, { success: false, message: '人机验证失败' })
    }

    // 提取并清洗输入
    const name = sanitize((body.name || '').toString()).trim()
    const phone = sanitize((body.phone || '').toString()).trim()
    const message = sanitize((body.message || '').toString()).trim()

    // 必填校验：姓名、电话
    if (!name || !phone) {
      return json(400, { success: false, message: '姓名与电话为必填项' })
    }

    // 长度上限校验
    if (name.length > 50 || phone.length > 20 || message.length > 1000) {
      return json(400, { success: false, message: '字段长度超出限制' })
    }

    // 电话格式校验（仅允许数字、空格、+、-、括号）
    if (!/^[\d\s+\-()]{6,20}$/.test(phone)) {
      return json(400, { success: false, message: '电话格式不正确' })
    }

    // 阿里云 DirectMail 配置
    const {
      ALIYUN_DM_ACCESS_KEY_ID: accessKeyId,
      ALIYUN_DM_ACCESS_KEY_SECRET: accessKeySecret,
      ALIYUN_DM_ACCOUNT_NAME: accountName,
      ALIYUN_DM_FROM_ALIAS: fromAlias,
      ALIYUN_DM_TO_ADDRESS: toAddress,
    } = process.env

    if (!accessKeyId || !accessKeySecret || !accountName || !toAddress) {
      const missing = []
      if (!accessKeyId) missing.push('ALIYUN_DM_ACCESS_KEY_ID')
      if (!accessKeySecret) missing.push('ALIYUN_DM_ACCESS_KEY_SECRET')
      if (!accountName) missing.push('ALIYUN_DM_ACCOUNT_NAME')
      if (!toAddress) missing.push('ALIYUN_DM_TO_ADDRESS')
      console.error('邮件服务环境变量未配置完整，缺失:', missing.join(', '))
      return json(500, { success: false, message: '邮件服务未配置' })
    }

    // 组装阿里云 DirectMail 客户端
    // @alicloud/dm20151123 的 default 导出是命名空间对象，Client 类挂在 .default 上
    // DirectMail 服务区域为 cn-hangzhou
    const config = new Config({
      accessKeyId,
      accessKeySecret,
      regionId: 'cn-hangzhou',
      endpoint: 'dm.aliyuncs.com',
    })
    const client = new Dm.default(config)
    const request = new SingleSendMailRequest({
      accountName,
      addressType: 1,
      replyToAddress: false,
      toAddress,
      fromAlias,
      subject: '公信官网留言',
      textBody: `${name}  ${phone}\n${message}`,
    })

    try {
      await client.singleSendMail(request)
      return json(200, { success: true })
    } catch (err) {
      // 详细错误仅记录到服务端日志，不返回给客户端
      console.error('邮件发送失败:', err)
      return json(502, { success: false, message: '邮件发送失败' })
    }
  },
}
