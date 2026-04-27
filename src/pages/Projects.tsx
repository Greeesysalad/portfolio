import React, { useState } from 'react'

type Page = 'home' | 'about' | 'projects'

interface Project {
  id: number
  title: string
  description: string
  details: string
  image: string
  github?: string
  live?: string
}

interface ProjectsProps {
  onNavigate: (page: Page) => void
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Project One',
    description: 'A brief description of your first project.',
    details: 'This is a more detailed description of Project One. Here you can include more information about the technologies used, the challenges faced, and the outcomes achieved. You can also mention your specific role in the project and what you learned from it.',
    image: 'https://placehold.co/600x400/1a1a1a/white?text=Project+1',
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A brief description of your second project.',
    details: 'This is a more detailed description of Project Two. Include information about the problem you solved, the tech stack you used, and the impact of the project. Mention any notable achievements or metrics.',
    image: 'https://placehold.co/600x400/1a1a1a/white?text=Project+2',
    github: 'https://github.com'
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'A brief description of your third project.',
    details: 'This is a more detailed description of Project Three. Go deeper into the architecture, the decisions you made, and what you would do differently if you built it again.',
    image: 'https://placehold.co/600x400/1a1a1a/white?text=Project+3',
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    id: 4,
    title: 'Project Four',
    description: 'A brief description of your fourth project.',
    details: 'This is a more detailed description of Project Four. Share your journey, the team size, the timeline, and how the project evolved over time.',
    image: 'https://placehold.co/600x400/1a1a1a/white?text=Project+4',
    github: 'https://github.com'
  }
]

const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="page projects-page">
      <h2 className="page-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-links">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="modal-content">
              <h3>{selectedProject.title}</h3>
              <p className="modal-description">{selectedProject.description}</p>
              <p className="modal-details">{selectedProject.details}</p>
              <div className="modal-links">
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="modal-link"
                  >
                    GitHub
                  </a>
                )}
                {selectedProject.live && (
                  <a 
                    href={selectedProject.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="modal-link"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
