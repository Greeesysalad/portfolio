import { useState, useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'

type Page = 'home' | 'about' | 'projects'

// Get initial page from URL hash
const getInitialPage = (): Page => {
  const hash = window.location.hash.replace('#', '') as Page
  if (hash === 'home' || hash === 'about' || hash === 'projects') {
    return hash
  }
  return 'home'
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage)

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page as Page | undefined
      if (page) {
        setCurrentPage(page)
      }
    }

    // Initialize history on first load
    if (!window.location.hash) {
      window.history.replaceState({ page: currentPage }, '', `#${currentPage}`)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [currentPage])

  // Handle scroll behavior for projects page
  useEffect(() => {
    if (currentPage === 'projects') {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [currentPage])

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
    window.history.pushState({ page }, '', `#${page}`)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />
      case 'about':
        return <About onNavigate={handleNavigate} />
      case 'projects':
        return <Projects onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="app">
      <nav className="nav">
        <button 
          className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => handleNavigate('home')}
        >
          Home
        </button>
        <button 
          className={`nav-btn ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => handleNavigate('about')}
        >
          About
        </button>
        <button 
          className={`nav-btn ${currentPage === 'projects' ? 'active' : ''}`}
          onClick={() => handleNavigate('projects')}
        >
          Projects
        </button>
      </nav>
      <main className="content">
        {renderPage()}
      </main>
      <footer className="site-footer">
        <span className="site-footer__icon" aria-hidden="true">©</span>
        <span>2026 Ted Yao</span>
      </footer>
    </div>
  )
}

export default App
