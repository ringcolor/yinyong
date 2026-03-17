import { Link } from 'react-router-dom'
import { getAssetUrl } from '../utils/assets'
import styles from './ResearchCard.module.css'

function ResearchCard({ paper, showDetails = false }) {
  // 获取作者排序显示
  const getAuthorOrder = () => {
    if (!paper.authors || paper.authors.length === 0) return null
    // 假设第一个作者是主要作者，根据位置判断排序
    const totalAuthors = paper.authors.length
    if (totalAuthors === 1) return '1st Author'
    if (totalAuthors === 2) return '1st Author'
    return '1st Author'
  }

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
        <p className={styles.meta}>
          {paper.date && <span>{paper.date}</span>}
          {paper.date && paper.journal && <span> · </span>}
          {paper.journal && <span>{paper.journal}</span>}
          {paper.journal && getAuthorOrder() && <span> · </span>}
          {getAuthorOrder() && <span>{getAuthorOrder()}</span>}
        </p>
        <p className={styles.abstract}>{paper.abstract}</p>
      </div>
    </div>
  )

  if (showDetails) {
    return content
  }

  return <Link to={`/research/${paper.id}`} className={styles.cardLink}>{content}</Link>
}

export default ResearchCard