import React, { useEffect, useRef, useState } from 'react'
import { FileText, Globe } from 'lucide-react'

import Adaptive1 from '../assets/AdaptiveWritingAid_Use.png'
import Adaptive2 from '../assets/AdaptiveWritingAid.png'
import Adaptive3 from '../assets/AdaptiveWritingAid_CAD.png'

import Exo1 from '../assets/Exo_Jesse.JPG'
import Exo2 from '../assets/Exo_closeup.JPG'
import Exo3 from '../assets/Exo_ManufacturedParts.png'
import Exo4 from '../assets/Exo_CAD.png'

import hand1 from '../assets/hand_gojo.png'
import hand2 from '../assets/hand_sukuna.png'
import hand3 from '../assets/hand_wolf.png'
import hand4 from '../assets/hand_nue.png'
import hand5 from '../assets/hand_toad.png'
import hand6 from '../assets/hand_neutral.png'

import pool1 from '../assets/pool_render.png'
import pool2 from '../assets/pool_unrendered.png'
import pool3 from '../assets/pool_cat.png'

import AptamerPdf from '../assets/Aptamer_Allergen_Biosensor.pdf'
import AptamerGraphical from '../assets/graphical_abstract.png'

import metal1 from '../assets/heavymetal_nocopper.jpg'
import metal2 from '../assets/heavymetal_copper.jpg'
import metal3 from '../assets/heavymetal_gell.png'


type Page = 'home' | 'about' | 'projects'
type ProjectSection = 'engineering' | 'Research'

interface Project {
  id: number
  title: string
  section: ProjectSection
  description: string
  details: string
  images: { src: string; caption?: string }[]
  github?: string
  website?: string
  pdf?: string
  live?: string
}

interface ProjectsProps {
  onNavigate: (page: Page) => void
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Lower Limb Exoskeleton',
    section: 'engineering',
    description: 'Mechanical Designer for McMaster Exoskeleton; A muti-disaplinary design team developing an assistive lower-limb exoskeleton. Responsible for the mechanical structure of the exoskeleton, including the design and testing of custom linkage, waist, and mounting components using SolidWorks.',
    details:
      '• Optimized part geometries for additive manufacturing to minimize support material and ensure print reliability.\n'+
      '• Managed tolerances and assembly dimensions using SolidWorks equations to maintain precision across 40+ interdependent components\n'+
      '• Refined ergonomics through iterative rapid prototyping and physical testing to ensure the design maintained a natural range of motion.\n'+
      '• Utilized top-down assembly modeling to ensure mechanical fit and kinematic integrity for complex structural linkages.',
    images: [
      { src: Exo1, caption: 'Full-body view of exoskeleton in operation' },
      { src: Exo2, caption: 'Detailed view of the lower-limb actuation and structural design' },
      { src: Exo4, caption: 'SolidWorks assembly of right leg of lower-limb exoskeleton' },
      { src: Exo3, caption: 'Manufactured exoskeleton linkage parts' },
    ],
    github: 'https://github.com/McMaster-Exoskeleton',
    website: 'https://www.macexo.com/'
  },

  {
    id: 2,
    title: 'Computer Vision Hand Sign Detector',
    section: 'engineering',
    description: 'Python-based computer vision application developed in collaboration with Carlson Zheng;  implemented a gesture-based control system that detects hand signs from the anime Jujutsu Kaisen with 95% accuracy using a live video feed, translating them into video game commands via simulated keyboard inputs.',
    details:
      '• Processed live video feeds using OpenCV and MediaPipe to detect hands and extract 3D spatial landmarks, generating real-time coordinate matrices from single and dual-hand inputs.\n'+
      '• Developed a Python data-logging script that processes image directories to detect hand regions, extracting 3D landmarks and automatically structuring the coordinate streams into Pandas DataFrames based on filename labels.\n'+
      '• Built and evaluated a multi-class TensorFlow/Keras neural network, using Scikit-learn to optimize training performance and achieve a 95%+ recognition accuracy when mapping spatial coordinates to specific Jujutsu Kaisen gestures.\n'+
      '• Utilized Git and GitHub for version control, managing parallel feature development through strategic branching and collaborative pull requests.',
    images: [
      { src: hand1, caption: "Successful hand sign classification for 'infinite void'" },
      { src: hand2, caption: "Successful hand sign classification for 'malevolent shrine'" },
      { src: hand3, caption: "Successful hand sign classification for 'divine dog'" },
      { src: hand4, caption: "Successful hand sign classification for 'nue'" },
      { src: hand5, caption: "Successful hand sign classification for 'toad'" },
      { src: hand6, caption: "Successful hand sign classification for neutral hand position" },
    ],
    github: 'https://github.com/carlzhng/domain-computer-vision',
  },

  {
    id: 3,
    title: 'Adaptive Writing Aid',
    section: 'engineering',
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
  },

    {
    id: 4,
    title: 'Pool Environment Render',
    section: 'engineering',
    description: 'Designed and rendered a 30-second animation of a pool environment inspired by artist Jared Pike. Implemented hard-surface polygonal modeling, custom procedural shading networks, and keyframe animations entirely within Blender.',
    details:
    '• Created a clean, non-destructive mesh architecture using hard surface modeling techniques, ensuring consistent face weighting and optimal polygon flow.\n'+
    '• Applied modular PBR (Physically Based Rendering) tile textures across cleanly unwrapped UV coordinates to guarantee realistic surface material responses under direct lighting.\n'+
    '• Created cat asset from scratch by translating real-world photographic references into a proportional 3D digital model.',
    images: [
      { src: pool1, caption: 'rendered camera view of scene' },
      { src: pool2, caption: 'un-rendered camera view of scene' },
      { src: pool3, caption: 'cat' },
    ],
    website: 'https://www.youtube.com/watch?v=_PZD7W4BIao'
  },

  {
    id: 5,
    title: 'Aptamer-Based Allergen Detection System',
    section: 'Research',
    description: 'This theoretical project designs a whole-cell E. coli biosensor to rapidly detect food allergens (casein, galactose, and gliadin) using ligand-mediated aptazyme switches. The system features a single-input subsystem that expresses a blue chromoprotein (amilCP) upon detecting gliadin, alongside a dual-input regulatory AND gate requiring both casein and galactose to suppress amber stop codons and trigger a red chromoprotein (eforRed) readout. The multi-plasmid system was physically mapped out using Gibson and BioBrick assembly across pBBR1MCS-2 and pSB1C3 vector backbones. To validate the system, an ordinary differential equation (ODE) kinetic model was built completely in silico using MATLAB SimBiology, which verified rapid diagnostic expression timelines and successfully identified a critical metabolic degradation bottleneck in the AND gate system, providing a quantitative foundation to guide future genetic circuit optimization.',
    details:
    '• Designed a theoretical multi-plasmid genetic circuit within a BL21(DE3) E. coli chassis to track casein, galactose, and gliadin.\n'+
    '• Constructed and simulated mathematical ODE models using MATLAB SimBiology to validate biosensor expression kinetics in silico, mapping system dynamics under varying ligand concentrations to verify visual detection limits.\n'+
    '• Formulated genetic assembly and verification protocols detailing Gibson Assembly, BioBrick cloning sequences, and gel electrophoresis control criteria.\n'+
    '• Mapped a dual-input T7 promoter AND gate logic loop to link multiple target ligands to distinct, color-coded chromoprotein readouts (amilCP and eforRed).\n'+
    '• Modeled the in silico construction of the allergen-detection circuits using Benchling to generate primer sequences and visualize plasmid maps for Gibson and BioBrick assembly.',
    images: [
      { src: AptamerGraphical, caption: 'Graphical Abstract' },
    ],
    pdf: AptamerPdf,
  },

    {
    id: 6,
    title: 'Heavy Metal Biosensor',
    section: 'Research',
    description: "Developed and characterized a genetically engineered, whole-cell bacterial biosensor in E. coli designed to detect environmental copper contamination through colorimetric reporting. Utilizing BioBrick Amplified Insert Assembly, the endogenous copper-sensitive promoter sequence (pCusC) was successfully amplified and cloned upstream of a natural chromoprotein reporter gene (asPink) inside a promoterless plasmid vector. Chemically competent E. coli DH5α cells were transformed with the constructed expression vector using heat shock methods. The biosensor's efficacy was evaluated by quantifying reporter gene expression via UV spectrophotometry and microplate assays across various copper (II) sulfate concentrations.",
    details:
    '• Executed BioBrick Amplified Insert Assembly to clone a copper-sensitive pCusC promoter sequence upstream of an asPink chromoprotein reporter gene to engineer a whole-cell bacterial biosensor.\n'+
    '• Performed restriction enzyme double digests, silica-membrane spin column purifications, and heat-shock transformations into chemically competent E. coli DH5α.\n'+
    '• Isolated plasmid DNA via alkaline lysis minipreps and verified successful genetic recombination through structural diagnostic digests and agarose gel electrophoresis.\n'+
    '• Utilized Benchling to model plasmid architecture, map restriction sites, and design custom PCR primers optimized for target promoter amplification.',
    images: [
      { src: metal1, caption: 'Recombinant E. coli DH5α transformants on selective agar media in the absence of copper. Colonies display a standard white phenotype. Because copper ions are absent, the cloned pCusC promoter remains inactive, preventing the downstream expression of the asPink chromoprotein reporter gene and validating the tight transcriptional regulation of the biosensor circuit.' },
      { src: metal2, caption: 'Phenotypic colorimetric response of recombinant E. coli DH5α transformants exposed to copper. Induced colonies display a distinct pinkish-black coloration, confirming successful whole-cell biosensor activation. The presence of copper (II) sulfate triggers the heavy metal-sensitive pCusC promoter, driving expression of the intracellular asPink chromoprotein reporter.' },
      { src: metal3, caption: 'Structural verification of recombinant plasmids via agarose gel electrophoresis. Fragment separation of diagnostic restriction digests alongside a 1 kb DNA ladder. Well 8 displays a digested promoterless plasmid control, while Well 9 displays a double-digested pCusAsPink plasmid, where the presence of a brighter and clearer released insert band indicates higher concentration, suggesting successful molecular cloning of the copper-sensitive pCusC promoter.' }
    ],
  }
]

const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [cardImageIndex, setCardImageIndex] = useState<{ [key: number]: number }>({})
  const [activeSection, setActiveSection] = useState<ProjectSection>('engineering')
  const [previewTextByProject, setPreviewTextByProject] = useState<Record<number, { text: string; hasOverflow: boolean }>>({})
  const [captionPreviewByProject, setCaptionPreviewByProject] = useState<Record<number, { text: string; hasOverflow: boolean }>>({})
  const descriptionRefs = useRef<Record<number, HTMLParagraphElement | null>>({})
  const captionRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const engineeringProjects = projects.filter((project) => project.section === 'engineering')
  const syntheticBiologyProjects = projects.filter((project) => project.section === 'Research')
  const visibleProjects = activeSection === 'engineering' ? engineeringProjects : syntheticBiologyProjects
  const readMoreText = 'read more'

  useEffect(() => {
    if (selectedProject && !visibleProjects.some((project) => project.id === selectedProject.id)) {
      setSelectedProject(null)
      setCurrentImageIndex(0)
    }
  }, [selectedProject, visibleProjects])

  useEffect(() => {
    const nextPreviewTextByProject = { ...previewTextByProject }
    let hasChanged = false

    visibleProjects.forEach((project) => {
      const element = descriptionRefs.current[project.id]

      if (!element) {
        return
      }

      const lineHeight = parseFloat(getComputedStyle(element).lineHeight) || 22.4
      const width = element.clientWidth
      const measure = document.createElement('div')
      measure.style.position = 'fixed'
      measure.style.left = '-9999px'
      measure.style.top = '-9999px'
      measure.style.width = `${width}px`
      measure.style.font = getComputedStyle(element).font
      measure.style.whiteSpace = 'normal'
      measure.style.wordWrap = 'break-word'
      measure.style.padding = '0'
      measure.style.margin = '0'
      document.body.appendChild(measure)

      const words = project.description.split(/\s+/).filter(Boolean)
      const maxHeight = lineHeight * 5
      const suffixForMeasure = ' … read more'

      const fits = (value: string) => {
        measure.textContent = value
        return measure.scrollWidth <= width && measure.scrollHeight <= maxHeight
      }

      const fitsEntireDescription = fits(project.description)

      let best = project.description

      if (!fitsEntireDescription) {
        let low = 0
        let high = words.length

        while (low <= high) {
          const mid = Math.floor((low + high) / 2)
          const candidate = words.slice(0, mid).join(' ')

          if (candidate.length === 0) {
            best = ''
            high = mid - 1
            continue
          }

          if (fits(`${candidate}${suffixForMeasure}`)) {
            best = candidate
            low = mid + 1
          } else {
            high = mid - 1
          }
        }
      }

      document.body.removeChild(measure)

      const hasOverflow = !fitsEntireDescription
      const nextPreview = {
        text: hasOverflow ? best : project.description,
        hasOverflow,
      }

      if (
        nextPreviewTextByProject[project.id]?.text !== nextPreview.text ||
        nextPreviewTextByProject[project.id]?.hasOverflow !== nextPreview.hasOverflow
      ) {
        nextPreviewTextByProject[project.id] = nextPreview
        hasChanged = true
      }
    })

    if (hasChanged) {
      setPreviewTextByProject(nextPreviewTextByProject)
    }
  }, [previewTextByProject, visibleProjects])

  useEffect(() => {
    const nextCaptionPreviewByProject = { ...captionPreviewByProject }
    let hasChanged = false

    visibleProjects.forEach((project) => {
      const currentCardImageIndex = cardImageIndex[project.id] || 0
      const currentCaption = project.images[currentCardImageIndex]?.caption
      const element = captionRefs.current[project.id]

      if (!element || !currentCaption) {
        return
      }

      const computedStyle = getComputedStyle(element)
      const lineHeight = parseFloat(computedStyle.lineHeight) || 20
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0
      const width = Math.max(0, element.clientWidth - paddingLeft - paddingRight)
      const measure = document.createElement('div')
      measure.style.position = 'fixed'
      measure.style.left = '-9999px'
      measure.style.top = '-9999px'
      measure.style.width = `${width}px`
      measure.style.font = computedStyle.font
      measure.style.whiteSpace = 'normal'
      measure.style.wordWrap = 'break-word'
      measure.style.padding = '0'
      measure.style.margin = '0'
      document.body.appendChild(measure)

      const words = currentCaption.split(/\s+/).filter(Boolean)
      const maxHeight = lineHeight
      const suffixForMeasure = ' … read more'

      const fits = (value: string) => {
        measure.textContent = value
        return measure.scrollWidth <= width && measure.scrollHeight <= maxHeight
      }

      const fitsEntireCaption = fits(currentCaption)
      let best = currentCaption

      if (!fitsEntireCaption) {
        let low = 0
        let high = words.length

        while (low <= high) {
          const mid = Math.floor((low + high) / 2)
          const candidate = words.slice(0, mid).join(' ')

          if (candidate.length === 0) {
            best = ''
            high = mid - 1
            continue
          }

          if (fits(`${candidate}${suffixForMeasure}`)) {
            best = candidate
            low = mid + 1
          } else {
            high = mid - 1
          }
        }

        if (best === currentCaption) {
          const trimmedWords = words.slice(0, Math.max(0, words.length - 1))

          while (trimmedWords.length > 0) {
            const candidate = trimmedWords.join(' ')

            if (fits(`${candidate}${suffixForMeasure}`)) {
              best = candidate
              break
            }

            trimmedWords.pop()
          }

          if (trimmedWords.length === 0 || !fits(`${best}${suffixForMeasure}`)) {
            best = ''
          }
        }
      }

      document.body.removeChild(measure)

      const hasOverflow = !fitsEntireCaption
      const nextPreview = {
        text: hasOverflow ? best : currentCaption,
        hasOverflow,
      }

      if (
        nextCaptionPreviewByProject[project.id]?.text !== nextPreview.text ||
        nextCaptionPreviewByProject[project.id]?.hasOverflow !== nextPreview.hasOverflow
      ) {
        nextCaptionPreviewByProject[project.id] = nextPreview
        hasChanged = true
      }
    })

    if (hasChanged) {
      setCaptionPreviewByProject(nextCaptionPreviewByProject)
    }
  }, [captionPreviewByProject, cardImageIndex, visibleProjects])

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(cardImageIndex[project.id] || 0)
  }

  const syncCardImageIndex = (projectId: number, nextIndex: number) => {
    setCardImageIndex((prev) => ({
      ...prev,
      [projectId]: nextIndex,
    }))
  }

  const closeSelectedProject = () => {
    if (selectedProject) {
      syncCardImageIndex(selectedProject.id, currentImageIndex)
    }

    setSelectedProject(null)
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => {
      const nextIndex = prev === 0 ? selectedProject!.images.length - 1 : prev - 1
      syncCardImageIndex(selectedProject!.id, nextIndex)
      return nextIndex
    })
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => {
      const nextIndex = prev === selectedProject!.images.length - 1 ? 0 : prev + 1
      syncCardImageIndex(selectedProject!.id, nextIndex)
      return nextIndex
    })
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
      <div className="projects-section-switcher">
        <button
          type="button"
          className={`projects-section-button ${activeSection === 'engineering' ? 'active' : ''}`}
          onClick={() => setActiveSection('engineering')}
          aria-pressed={activeSection === 'engineering'}
        >
          Engineering
        </button>
        <button
          type="button"
          className={`projects-section-button ${activeSection === 'Research' ? 'active' : ''}`}
          onClick={() => setActiveSection('Research')}
          aria-pressed={activeSection === 'Research'}
        >
          Research
        </button>
      </div>
      <div className="projects-grid">
        {visibleProjects.map((project) => {
          const currentCardImageIndex = cardImageIndex[project.id] || 0
          const currentCardImage = project.images[currentCardImageIndex]

          return (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => handleSelectProject(project)}
          >
            <div className="project-image">
              {project.images.length > 0 ? (
                <>
                  <img src={currentCardImage.src} alt={project.title} />
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
                        {currentCardImageIndex + 1} / {project.images.length}
                      </div>
                    </>
                  )}
                  {currentCardImage.caption && (
                    <div
                      className="card-image-caption"
                      ref={(element) => {
                        captionRefs.current[project.id] = element
                      }}
                    >
                      {captionPreviewByProject[project.id]?.text || currentCardImage.caption}
                      {captionPreviewByProject[project.id]?.hasOverflow && (
                        <>
                          {' '}
                          <span aria-hidden="true">…</span>{' '}
                          <span
                            role="button"
                            tabIndex={0}
                            className="project-read-more"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSelectProject(project)
                            }}
                          >
                            {readMoreText}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="no-image">No image available</div>
              )}
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <div className="project-description-row">
                <p
                  ref={(element) => {
                    descriptionRefs.current[project.id] = element
                  }}
                  className="project-description"
                >
                  {previewTextByProject[project.id]?.text || project.description}
                  {previewTextByProject[project.id]?.hasOverflow && (
                    <>
                      {' '}
                      <span aria-hidden="true">…</span>{' '}
                      <span
                        role="button"
                        tabIndex={0}
                        className="project-read-more"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectProject(project)
                        }}
                      >
                        {readMoreText}
                      </span>
                    </>
                  )}
                </p>
              </div>
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
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link website-icon"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Open project website"
                  >
                    <Globe size={16} strokeWidth={2} />
                  </a>
                )}
                {project.pdf && (
                  <a
                    href={project.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link pdf-icon"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Open project PDF"
                  >
                    <FileText size={16} strokeWidth={2} />
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
          )
        })}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeSelectedProject}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={closeSelectedProject}
            >
              ×
            </button>
            <div className="modal-image">
              {selectedProject.images.length > 0 ? (
                <>
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
                </>
              ) : (
                <div className="no-image">No image available</div>
              )}
            </div>
            {selectedProject.images.length > 0 && selectedProject.images[currentImageIndex].caption && (
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
                {selectedProject.website && (
                  <a
                    href={selectedProject.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link website-icon"
                    aria-label="Open project website"
                  >
                    <Globe size={16} strokeWidth={2} />
                  </a>
                )}
                {selectedProject.pdf && (
                  <a
                    href={selectedProject.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link pdf-icon"
                    aria-label="Open project PDF"
                  >
                    <FileText size={16} strokeWidth={2} />
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
