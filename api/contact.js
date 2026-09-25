export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, contact, message, website } = req.body

  // Honeypot: если поле заполнено — это бот
    if (website) {
    // Отвечаем 200, чтобы бот думал, что всё ок
    return res.status(200).json({ message: 'OK' })
    }
    
  if (!name || !message) {
    return res.status(400).json({ message: 'Имя и сообщение обязательны' })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return res.status(500).json({ message: 'Ошибка конфигурации сервера' })
  }

  const text = `
🔔 *Новое сообщение с портфолио!*

*От:* ${name}
*Контакт:* ${contact || 'не указан'}
*Сообщение:*
${message}
  `

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      }
    )

    const data = await response.json()
    if (!data.ok) throw new Error(data.description || 'Failed to send')

    return res.status(200).json({ message: 'OK' })
  } catch (error) {
    console.error('Telegram error:', error)
    return res.status(500).json({ message: 'Не удалось отправить' })
  }
}