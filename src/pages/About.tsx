import React from 'react'

type Page = 'home' | 'about' | 'projects'

interface AboutProps {
  onNavigate: (page: Page) => void
}

const techStack = [
  'TypeScript', 'React', 'Node.js', 'Python', 'Git', 'Docker'
]

const socials = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'Twitter', url: 'https://twitter.com' }
]

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="page about-page">
      <div className="about-container">
        <div className="about-image">
          <div className="image-placeholder">
            <span>Your Photo</span>
          </div>
        </div>
        <div className="about-content">
          <h2>About Me</h2>
          <p className="bio">
            Hi! I'm a software engineer passionate about building great products. 
            I specialize in full-stack development and love working with modern technologies.
          </p>
          <div className="tech-stack">
            <h3>Tech Stack</h3>
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
      </div>
    </div>
  )
}

export default About
