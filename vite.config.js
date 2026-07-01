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
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: false, message: String(e) }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // 读取 .env 中所有变量（含非 VITE_ 前缀），注入到 process.env 供 api/contact.js 使用
  const env = loadEnv(mode, process.cwd(), '')
  if (env.RESEND_API_KEY) process.env.RESEND_API_KEY = env.RESEND_API_KEY

  return {
    plugins: [vue(), localApiPlugin()],
  }
})
