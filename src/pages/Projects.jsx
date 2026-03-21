import { useEffect, useRef } from 'react'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects.json'
import styles from './Projects.module.css'

function Projects() {
  const gridRef = useRef(null)

  useEffect(() => {
    if (gridRef.current) {
      imagesLoaded(gridRef.current, () => {
        new Masonry(gridRef.current, {
          itemSelector: '.masonry-item',
          columnWidth: '.masonry-sizer',
          percentPosition: true,
          gutter: '.masonry-gutter',
          horizontalOrder: true
        })
      })
    }
  }, [])

  return (
    <div className={styles.projects}>
      <h1 className={styles.pageTitle}>项目经历</h1>
      <p className={styles.pageDescription}>
        以下是我参与的主要项目，聚焦于人AI协作、智能交互产品、人工智能应用等领域。（部分内容建设中）
      </p>
      <div ref={gridRef} className={styles.grid}>
        <div className="masonry-sizer"></div>
        <div className="masonry-gutter"></div>
        {projects.projects.map((project) => (
          <div key={project.id} className="masonry-item">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects