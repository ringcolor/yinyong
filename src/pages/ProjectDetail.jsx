import { useParams, Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects.json'
import { getAssetUrl } from '../utils/assets'
import styles from './ProjectDetail.module.css'

function ProjectDetail() {
  const { id } = useParams()
  const project = projects.projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h2>项目未找到</h2>
        <p>抱歉，找不到该项目的详细信息。</p>
        <Link to="/projects" className={styles.backLink}>
          返回项目列表
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.detail}>
      <Link to="/projects" className={styles.backLink}>
        ← 返回项目列表
      </Link>

      <h1 className={styles.title}>{project.name}</h1>
      <p className={styles.period}>{project.period}</p>

      {project.image && (
        <div className={styles.imageWrapper}>
          <img src={getAssetUrl(project.image)} alt={project.name} className={styles.image} />
        </div>
      )}

      <div className={styles.content}>
        <p className={styles.summary}>{project.summary}</p>
        <p className={styles.details}>{project.details}</p>

        {project.tech && project.tech.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>技术栈</h3>
            <div className={styles.techList}>
              {project.tech.map((tech, index) => (
                <span key={index} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.link && (
          <div className={styles.section}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              查看项目 →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail