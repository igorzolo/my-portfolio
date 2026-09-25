import { useEffect, useState } from 'react'

const phrases = [
  'Привет, я — Игорь',
  'Привет, я — Дизайнер',
  'Привет, я — Программист',
  'Привет, я — Создаю ваш комфорт',
  'Привет, я — Создаю будущее',
  'Привет, я — Работаю для вас',
]

function Typewriter() {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    // Настройки скорости (в миллисекундах)
    const typingSpeed = 80       // скорость печати одного символа
    const deletingSpeed = 20     // скорость стирания (обычно быстрее)
    const pauseAfterComplete = 2200 // пауза, когда фраза напечатана целиком
    const pauseBeforeTyping = 300   // пауза перед началом новой фразы

    let timeout

    if (!isDeleting && text === currentPhrase) {
      // Фраза напечатана — ждём и начинаем стирать
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterComplete)
    } else if (isDeleting && text === '') {
      // Фраза стёрта — переходим к следующей
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
      timeout = setTimeout(() => {}, pauseBeforeTyping)
    } else {
      // Печатаем или стираем один символ
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1)
        )
      }, isDeleting ? deletingSpeed : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, phraseIndex])

  return (
    <h1 className="typewriter">
      {text}
      <span className="cursor">|</span>
    </h1>
  )
}

export default Typewriter