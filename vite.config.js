import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// 本地 dev 适配器：把 /api/contact 的 Web 风格 handler 接到 Vite dev server
function localApiPlugin() {
  return {
    name: 'local-api-contact',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (!url.startsWith('/api/contact')) return next()

        const handlerUrl = fileURLToPath(new URL('./api/contact.js', import.meta.url))
        const mod = await import(handlerUrl + '?t=' + Date.now())
        const handler = mod.default

        const chunks = []
        for await (const c of req) chunks.push(c)
        const body = Buffer.concat(chunks).toString()

        const headers = new Headers()
        for (const [k, v] of Object.entries(req.headers)) {
          if (Array.isArray(v)) v.forEach((vv) => headers.append(k, vv))
          else if (v != null) headers.set(k, v)
        }

        const request = new Request('http://localhost' + url, {
          method: req.method || 'GET',
          headers,
          body: ['GET', 'HEAD'].includes(req.method || '') ? undefined : body,
        })

        try {
          const response = await handler(request)
          res.statusCode = response.status
          response.headers.forEach((v, k) => res.setHeader(k, v))
          res.end(await response.text())
        } catch (e) {
          // 详细错误仅记录到终端日志，不返回给客户端
          console.error('[dev api/contact error]', e)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: false, message: '服务器内部错误' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // 读取 .env 中服务端变量（仅复制白名单中的 key 到 process.env，不暴露到客户端 bundle）
  const env = loadEnv(mode, process.cwd(), '')
  const serverKeys = [
    'ALIYUN_DM_ACCESS_KEY_ID',
    'ALIYUN_DM_ACCESS_KEY_SECRET',
    'ALIYUN_DM_ACCOUNT_NAME',
    'ALIYUN_DM_FROM_ALIAS',
    'ALIYUN_DM_TO_ADDRESS',
    'TURNSTILE_SECRET_KEY',
    'ALLOWED_ORIGINS',
  ]
  serverKeys.forEach((k) => { if (env[k]) process.env[k] = env[k] })

  return {
    plugins: [vue(), localApiPlugin()],
  }
})
