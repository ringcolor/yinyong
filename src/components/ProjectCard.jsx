import { Link } from 'react-router-dom'
import { getAssetUrl } from '../utils/assets'
import styles from './ProjectCard.module.css'

function ProjectCard({ project, showDetails = false }) {
  const content = (
    <div className={styles.card}>
      {project.image && (
        <div className={styles.imageWrapper}>
          <img src={getAssetUrl(project.image)} alt={project.name} className={styles.image} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{project.name}</h3>
          {project.period && (
            <span className={styles.period}>{project.period}</span>
          )}
        </div>
        <p className={styles.summary}>{project.summary}</p>
        {project.tech && project.tech.length > 0 && (
          <div className={styles.tech}>
            {project.tech.slice(0, 4).map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className={styles.techMore}>+{project.tech.length - 4}</span>
            )}
          </div>
        )}
        {showDetails && project.details && (
          <p className={styles.details}>{project.details}</p>
        )}
      </div>
    </div>
  )

  if (showDetails) {
    return content
  }

  return <Link to={`/projects/${project.id}`} className={styles.link}>{content}</Link>
}

export default ProjectCard