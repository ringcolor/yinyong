import { Link } from 'react-router-dom'
import { getAssetUrl } from '../utils/assets'
import styles from './ResearchCard.module.css'

function ResearchCard({ paper, showDetails = false }) {
  const content = (
    <div className={styles.card}>
      {/* 左边图片 */}
      {paper.image && (
        <div className={styles.imageWrapper}>
          <img src={getAssetUrl(paper.image)} alt={paper.title} className={styles.image} />
        </div>
      )}

      {/* 右边内容 */}
      <div className={styles.content}>
        <h3 className={styles.title}>{paper.title}</h3>
        {paper.listSubtitle && <p className={styles.subtitle}>{paper.listSubtitle}</p>}
        <p className={styles.abstract}>{paper.abstract}</p>
        {paper.tags && paper.tags.length > 0 && (
          <div className={styles.tags}>
            {paper.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  if (showDetails) {
    return content
  }

  return <Link to={`/research/${paper.id}`} className={styles.cardLink}>{content}</Link>
}

export default ResearchCard