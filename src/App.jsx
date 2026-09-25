import { useState } from 'react'
import './App.css'
import Reveal from './components/Reveal'
import ThemeToggle from './components/ThemeToggle'
import Typewriter from './components/Typewriter'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import ContactForm from './components/ContactForm'

function App() {
  const projects = [
    {
      id: 1,
      context: 'Этот проект я создал, чтобы решить проблему...', // Текст перед карточкой
      title: 'Название проекта',
      description: 'Короткое описание: что делает, зачем нужен.',
      tags: ['Python', 'API'],
      link: 'https://github.com/username/project1'
    },
    {
      id: 2,
      context: 'Здесь я хотел разобраться с тем, как работает...',
      title: 'Второй проект',
      description: 'Пара слов о проекте и его особенностях.',
      tags: ['JavaScript', 'React'],
      link: 'https://github.com/username/project2'
    },
    {
      id: 3,
      context: 'Простая идея, которая превратилась в полноценный...',
      title: 'Третий проект',
      description: 'Ещё одно описание в одну-две строки.',
      tags: ['HTML', 'CSS'],
      link: 'https://github.com/username/project3'
    }
  ];

  // Текущий активный тег. 'all' — значит показать все проекты
const [activeTag, setActiveTag] = useState('all')

// Собираем уникальные теги из всех проектов автоматически
const allTags = ['all', ...new Set(projects.flatMap((p) => p.tags))]

// Фильтруем проекты по активному тегу
const filteredProjects = activeTag === 'all'
  ? projects
  : projects.filter((p) => p.tags.includes(activeTag))

  {filteredProjects.length === 0 && (
    <p className="empty-state">Здесь пока пусто. Скоро добавлю проекты.</p>
  )}

  const skills = ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Git'];

  return (
    <div className="container">

      <ScrollProgress />

      <nav className="navbar animate-fade-up">
        <a href="#about">Обо мне</a>
        <span className="nav-divider">·</span>
        <a href="#skills">Навыки</a>
        <span className="nav-divider">·</span>
        <a href="#projects">Проекты</a>
        <span className="nav-divider">·</span>
        <a href="#contacts">Контакты</a>
        <ThemeToggle />
      </nav>

      <header className="animate-fade-up">
        <div className="avatar-wrapper">
          <img src="/logoicon.png" alt="error" className="avatar" />
        </div>
        <div className="title-box">
          <Typewriter />
        </div>
        <p>Фронтенд-разработчик, который любит создавать удобные и красивые интерфейсы.</p>
      </header>

      <Reveal delay={0.1}>
        <section id="about" className="about animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h2>Обо мне</h2>
          <p>
            Я изучаю веб-разработку и создаю проекты на React. 
            Мне нравится превращать идеи в работающие приложения, 
            разбираться в новых технологиях и писать чистый код.
          </p>
        </section>
      </Reveal>

      <Reveal delay={0.15}>
        <section id="skills" className="skills-section animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <h2>Навыки</h2>
          <div className="skills-list">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Обновленный блок проектов */}
      <div id="projects" className="projects-section">
        {/* Кнопки-фильтры */}
        <Reveal delay={0.1}>
          <div className="projects-filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`filter-btn ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag === activeTag && tag !== 'all' ? 'all' : tag)}
              >
                {tag === 'all' ? 'Все' : tag}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Отфильтрованный список проектов */}
        <div className="projects">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <div className="project-wrapper">
                <div className="project-context">
                  <p>{project.context}</p>
                </div>
                <a 
                  className="card" 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.2}>
        <footer id="contacts" className="footer animate-fade-up" style={{ animationDelay: '1.4s' }}>
          <div className="footer-contacts">
            <h3>Связаться со мной</h3>
            
            <div className="social-links">
              
              <a 
                href="https://t.me/username" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Telegram" 
                className="social-link telegram"
                >
              
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                
                </svg>
              
                <span>Telegram</span>

              </a>

              <a 
                href="https://vk.com/username" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="ВКонтакте" 
                className="social-link vk"
                >
              
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                
                  <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974H.668c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.495 2.708z"/>
                
                </svg>
                
                <span>ВКонтакте</span>
              </a>

              <a 
                href="https://github.com/username" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub" 
                className="social-link github"
                >

                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>

                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div className="footer-schedule">
            <div className="schedule-card">
              <h3>График работы</h3>
              <ul className="schedule-list">
                <li><span>Пн — Пт</span><span>10:00 — 19:00</span></li>
                <li><span>Суббота</span><span>12:00 — 17:00</span></li>
                <li><span>Воскресенье</span><span className="day-off">выходной</span></li>
              </ul>
            </div>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
          
          <p className="footer-copy">
            {new Date().getFullYear()}. Все права защищены.
          </p>

        </footer>
      </Reveal>

      <BackToTop />

    </div>
  )
}

export default App