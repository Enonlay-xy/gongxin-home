import Dm, { SingleSendMailRequest } from '@alicloud/dm20151123'
import { Config } from '@alicloud/openapi-client'

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async function handler(req) {
  // 仅允许 POST
  if (req.method !== 'POST') {
    return json(405, { success: false, message: 'Method not allowed' })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return json(400, { success: false, message: 'Invalid JSON' })
  }

  const name = (body.name || '').toString().trim()
  const phone = (body.phone || '').toString().trim()
  const message = (body.message || '').toString().trim()

  // 必填校验：姓名、电话
  if (!name || !phone) {
    return json(400, { success: false, message: '姓名与电话为必填项' })
  }

  // 长度上限校验
  if (name.length > 50 || phone.length > 20 || message.length > 1000) {
    return json(400, { success: false, message: '字段长度超出限制' })
  }

  const {
    ALIYUN_DM_ACCESS_KEY_ID: accessKeyId,
    ALIYUN_DM_ACCESS_KEY_SECRET: accessKeySecret,
    ALIYUN_DM_ACCOUNT_NAME: accountName,
    ALIYUN_DM_FROM_ALIAS: fromAlias,
  } = process.env

  if (!accessKeyId || !accessKeySecret || !accountName) {
    return json(500, { success: false, message: '邮件服务未配置' })
  }

  // 组装阿里云 DirectMail 客户端
  const config = new Config({ accessKeyId, accessKeySecret })
  const client = new Dm(config)
  const request = new SingleSendMailRequest({
    accountName,
    addressType: 1,
    replyToAddress: false,
    toAddress: 'alfie@gongxintest.com',
    fromAlias,
    subject: '公信官网留言',
    textBody: `${name}  ${phone}\n${message}`,
  })

  try {
    await client.singleSendMail(request)
    return json(200, { success: true })
  } catch (err) {
    return json(502, {
      success: false,
      message: '邮件发送失败',
      detail: String(err.message || err),
    })
  }
}
