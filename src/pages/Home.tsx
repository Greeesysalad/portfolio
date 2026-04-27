import React from 'react'

type Page = 'home' | 'about' | 'projects'

interface HomeProps {
  onNavigate: (page: Page) => void
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="page home-page">
      <div className="hero">
        <h1 className="name">Your Name</h1>
        <p className="tagline">Software Engineer</p>
        <div className="home-nav">
          <button onClick={() => onNavigate('about')} className="home-btn">
            About Me
          </button>
          <button onClick={() => onNavigate('projects')} className="home-btn">
            Projects
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
