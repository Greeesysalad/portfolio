import React from 'react'
import DoodleRain from '../components/DoodleRain';

type Page = 'home' | 'about' | 'projects'

interface HomeProps {
  onNavigate: (page: Page) => void
}

const nameFont = { fontFamily: "'Merriweather',sans-serif" }
const bodyFont = { fontFamily: "'Montserrat', sans-serif" } 

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <>
      <DoodleRain count={14} />
      <div className="page home-page">
        <div className="hero">
          <h1 className="name" style={{ ...nameFont, fontWeight: 700 }}>
            Ted Yao
          </h1>
          <p className="tagline" style={{ ...bodyFont, fontWeight: 400 }}>
            Mechatronics & Biomedical Engineering
          </p>
          <div className="home-nav">
            <button onClick={() => onNavigate('about')} className="home-btn" style={{ ...bodyFont, fontWeight: 600 }}>
              About Me
            </button>
            <button onClick={() => onNavigate('projects')} className="home-btn" style={{ ...bodyFont, fontWeight: 600 }}>
              Projects
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
