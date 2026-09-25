import { useEffect, useState } from 'react'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      
      setProgress(Math.min(100, Math.max(0, percent)))
      // Плашка появляется, когда пользователь начал прокручивать
      setVisible(scrollTop > 80)
    }

    handleScroll() // считаем сразу при загрузке
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Определяем текущее сообщение
  let message
  if (progress < 33) {
    message = 'Вы в начале своего пути'
  } else if (progress < 66) {
    message = 'Вы на полпути к мечте'
  } else {
    message = 'Ваша мечта уже здесь'
  }

  return (
    <>
      <div className="scroll-progress">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`scroll-progress-text ${visible ? 'visible' : ''}`}>
        <span className="scroll-percent">{Math.round(progress)}%</span>
        <span className="scroll-message">{message}</span>
      </div>
    </>
  )
}

export default ScrollProgress