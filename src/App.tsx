import { useState } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'

type Page = 'home' | 'about' | 'projects'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />
      case 'about':
        return <About onNavigate={setCurrentPage} />
      case 'projects':
        return <Projects onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="app">
      <nav className="nav">
        <button 
          className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentPage('home')}
        >
          Home
        </button>
        <button 
          className={`nav-btn ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => setCurrentPage('about')}
        >
          About
        </button>
        <button 
          className={`nav-btn ${currentPage === 'projects' ? 'active' : ''}`}
          onClick={() => setCurrentPage('projects')}
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
