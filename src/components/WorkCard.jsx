import { Link } from 'react-router-dom'
import { getAssetUrl } from '../utils/assets'
import styles from './WorkCard.module.css'

function WorkCard({ item, type }) {
  // type: 'project' 或 'research'
  const linkPath = type === 'research' ? `/research/${item.id}` : `/projects/${item.id}`
  const title = item.name || item.title
  const period = item.period || item.date
  const summary = item.summary || item.abstract

  return (
    <Link to={linkPath} className={styles.cardLink}>
      <div className={styles.card}>
        {item.image && (
          <div className={styles.imageWrapper}>
            <img src={getAssetUrl(item.image)} alt={title} className={styles.image} />
          </div>
        )}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          {period && <p className={styles.period}>{period}</p>}
          {summary && <p className={styles.summary}>{summary}</p>}
        </div>
      </div>
    </Link>
  )
}

export default WorkCard