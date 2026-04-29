import React from 'react'

type Page = 'home' | 'about' | 'projects'

interface AboutProps {
  onNavigate: (page: Page) => void
}

const techStack = [
  'Vite', 'Python', 'Git', 'MATLAB', 'Solidworks','Autodesk Inventor', 'blender', 'M365 suite', 'Microsoft Power Platform'
]

const socials = [
  { name: 'GitHub', url: 'https://github.com/Greeesysalad' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ted-yao-154320324/' },
]

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="page about-page">
      <div className="about-container">
        <div className="about-content">
          <h2>About Me</h2>
          <p className="bio">
            Undergrad student at McMaster University studying Mechatronics and
            biomedical engineering.
          </p>
          <div className="tech-stack">
            <h3>Technologies</h3>
            <div className="tech-tags">
              {techStack.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
          <div className="socials">
            <h3>Connect</h3>
            <div className="social-links">
              {socials.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="about-image">
          <div className="image-placeholder">
            <span>Your Photo</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
