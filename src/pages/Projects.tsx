import React, { useState } from 'react'

import Adaptive1 from '../assets/AdaptiveWritingAid_Use.png'
import Adaptive2 from '../assets/AdaptiveWritingAid.png'
import Adaptive3 from '../assets/AdaptiveWritingAid_CAD.png'

type Page = 'home' | 'about' | 'projects'

interface Project {
  id: number
  title: string
  description: string
  details: string
  images: { src: string; caption?: string }[]
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
    description: 'Mechanical Engineer for McMaster Exoskeleton; A muti-disaplinary design team developing an assistive lower-limb exoskeleton. Responsible for the mechanical structure of the exoskeleton, including the design and testing of custom linkage, waist, and mounting components using SolidWorks.',
    details:
      '• Optimized part geometries for additive manufacturing to minimize support material and ensure print reliability.\n'+
      '• Managed tolerances and assembly dimensions using SolidWorks equations to maintain precision across 30+ interdependent components\n'+
      '• Refined ergonomics through iterative rapid prototyping and physical testing to ensure the design maintained a natural range of motion.\n'+
      '• Utilized top-down assembly modeling to ensure mechanical fit and kinematic integrity for complex structural linkages.',
    images: [
      { src: 'https://placehold.co/600x400/1a1a1a/white?text=Project+1+Image+1', caption: 'Main assembly view' },
      { src: 'https://placehold.co/600x400/1a1a1a/white?text=Project+1+Image+2', caption: 'Detailed linkage system' },
      { src: 'https://placehold.co/600x400/1a1a1a/white?text=Project+1+Image+3', caption: 'Final prototype' },
    ],
    github: 'https://github.com/McMaster-Exoskeleton',
  },
  {
    id: 2,
    title: 'Adaptive Writing Aid',
    description: 'Developed a personalized assistive device for a client with Multiple Sclerosis to assist with fine motor writing capabilities; Designed using 3D structured light scanning and mesh modeling in blender to create a custom ergonomic interface precisely matching the user’s hand geometry, ensuring optimal pressure distribution and stability during use. ',
    details:
    '• Collaborated directly with a client with Multiple Sclerosis to develop a personalized assistive writing aid tailored to their specific functional requirements.\n'+
    '• Utilized 3D scanning to capture high-resolution topological meshes of the user’s hand geometry for precision-fit modeling.\n'+
    '• Engineered ergonomic housing in Blender using mesh modeling techniques to wrap device geometry around the user’s unique finger orientation.\n'+
    '• Executed an iterative rapid prototyping workflow with 3D printing to validate grip comfort and mechanical stability through live user trials.',
    images: [
      { src: Adaptive1, caption: 'Demonstration of device in use' },
      { src: Adaptive2, caption: 'Isolated view of device' },
      { src: Adaptive3, caption: 'CAD model of device in blender' },
    ],
  }
]

const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [cardImageIndex, setCardImageIndex] = useState<{ [key: number]: number }>({})

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProject!.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) =>
      prev === selectedProject!.images.length - 1 ? 0 : prev + 1
    )
  }

  const handlePrevCardImage = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const project = projects.find((p) => p.id === projectId)!
    setCardImageIndex((prev) => ({
      ...prev,
      [projectId]:
        prev[projectId] === 0 || prev[projectId] === undefined
          ? project.images.length - 1
          : prev[projectId] - 1,
    }))
  }

  const handleNextCardImage = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const project = projects.find((p) => p.id === projectId)!
    setCardImageIndex((prev) => ({
      ...prev,
      [projectId]:
        prev[projectId] === undefined || prev[projectId] === project.images.length - 1
          ? 0
          : prev[projectId] + 1,
    }))
  }

  const formatDetailsAsList = (details: string) => {
    return details
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(/^•\s*/, ''))
  }

  return (
    <div className="page projects-page">
      <h2 className="page-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => handleSelectProject(project)}
          >
            <div className="project-image">
              <img src={project.images[cardImageIndex[project.id] || 0].src} alt={project.title} />
              {project.images.length > 1 && (
                <>
                  <button
                    className="gallery-arrow gallery-prev"
                    onClick={(e) => handlePrevCardImage(project.id, e)}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    className="gallery-arrow gallery-next"
                    onClick={(e) => handleNextCardImage(project.id, e)}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                  <div className="gallery-counter">
                    {(cardImageIndex[project.id] || 0) + 1} / {project.images.length}
                  </div>
                </>
              )}
              {project.images[cardImageIndex[project.id] || 0].caption && (
                <div className="card-image-caption">
                  {project.images[cardImageIndex[project.id] || 0].caption}
                </div>
              )}
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
                    className="project-link github-icon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .316.192.686.798.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
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
              <img src={selectedProject.images[currentImageIndex].src} alt={selectedProject.title} />
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    className="gallery-arrow gallery-prev"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    className="gallery-arrow gallery-next"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                  <div className="gallery-counter">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </>
              )}
            </div>
            {selectedProject.images[currentImageIndex].caption && (
              <div className="modal-image-caption">
                {selectedProject.images[currentImageIndex].caption}
              </div>
            )}
            <div className="modal-content">
              <h3>{selectedProject.title}</h3>
              <p className="modal-description">{selectedProject.description}</p>
              {formatDetailsAsList(selectedProject.details).length > 1 ? (
                <div className="modal-details-group">
                  <p className="modal-details-label">Highlights</p>
                  <ul className="modal-details-list">
                    {formatDetailsAsList(selectedProject.details).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="modal-details">{selectedProject.details}</p>
              )}
              <div className="modal-links">
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="modal-link github-icon"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .316.192.686.798.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
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
