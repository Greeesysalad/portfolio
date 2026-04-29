import { useState, useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'

type Page = 'home' | 'about' | 'projects'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page as Page | undefined
      if (page) {
        setCurrentPage(page)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

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
    </div>
  )
}

export default App
