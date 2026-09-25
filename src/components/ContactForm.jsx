import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' , website: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed')

      setStatus('success')
      setFormData({ name: '', contact: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      console.error(error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <div className="contact-section">
      <h2>Связаться со мной</h2>
      <p className="contact-subtitle">Напишите мне — я отвечу в ближайшее время</p>

      <form className="contact-form" onSubmit={handleSubmit}>

        {/* Honeypot — скрытое поле для отлова ботов */}
        <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="honeypot"
            tabIndex="-1"
            autoComplete="off"
        />

        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Ваше имя *"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'sending'}
          />
          <input
            type="text"
            name="contact"
            placeholder="Email или Telegram"
            value={formData.contact}
            onChange={handleChange}
            disabled={status === 'sending'}
          />
        </div>

        <textarea
          name="message"
          placeholder="Ваше сообщение *"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === 'sending'}
        />

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Отправляю...' : 'Отправить'}
        </button>

        {status === 'success' && (
          <p className="form-message success">✓ Сообщение отправлено! Я свяжусь с вами.</p>
        )}
        {status === 'error' && (
          <p className="form-message error">✗ Что-то пошло не так. Попробуйте ещё раз.</p>
        )}
      </form>
    </div>
  )
}

export default ContactForm