export default async function handler(req) {
  // 仅允许 POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ success: false, message: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const name = (body.name || '').toString().trim()
  const phone = (body.phone || '').toString().trim()
  const message = (body.message || '').toString().trim()

  // 必填校验：姓名、电话
  if (!name || !phone) {
    return new Response(JSON.stringify({ success: false, message: '姓名与电话为必填项' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // 长度上限校验
  if (name.length > 50 || phone.length > 20 || message.length > 1000) {
    return new Response(JSON.stringify({ success: false, message: '字段长度超出限制' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ success: false, message: '邮件服务未配置' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // 组装邮件：标题固定"公信官网留言"，正文两行（姓名  电话 / 留言）
  const emailPayload = {
    from: 'onboarding@resend.dev',
    to: 'alfie@gongxintest.com',
    subject: '公信官网留言',
    text: `${name}  ${phone}\n${message}`,
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    })

    if (!res.ok) {
      const errText = await res.text()
      return new Response(JSON.stringify({ success: false, message: '邮件发送失败', detail: errText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: '请求异常', detail: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
