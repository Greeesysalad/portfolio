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
    title: 'Lower Limb Exoskeleton',
    description: 'Designed and prototyped lower-limb exoskeleton components in SolidWorks, utilizing 3D scans to ensure ergonomic fit through iterative design and rapid prototyping.',
    details: 'details',
    image: 'https://placehold.co/600x400/1a1a1a/white?text=Project+1',
    github: 'https://github.com/McMaster-Exoskeleton',
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
