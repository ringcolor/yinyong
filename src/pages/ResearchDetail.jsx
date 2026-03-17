import { useParams, Link } from 'react-router-dom'
import research from '../data/research.json'
import { getAssetUrl } from '../utils/assets'
import styles from './ResearchDetail.module.css'

function ResearchDetail() {
  const { id } = useParams()
  const paper = research.papers.find((p) => p.id === id)

  if (!paper) {
    return (
      <div className={styles.notFound}>
        <h2>论文未找到</h2>
        <p>抱歉，找不到该论文的详细信息。</p>
        <Link to="/research" className={styles.backLink}>
          返回论文列表
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.detail}>
      <Link to="/research" className={styles.backLink}>
        ← 返回论文列表
      </Link>

      <h1 className={styles.title}>{paper.title}</h1>
      <div className={styles.titleRow}>
        <p className={styles.subtitle}>{paper.subtitle}</p>
        {paper.link && (
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.paperLink}
          >
            阅读论文 →
          </a>
        )}
      </div>

      {paper.image && (
        <div className={styles.imageWrapper}>
          <img src={getAssetUrl(paper.image)} alt={paper.title} className={styles.image} />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.meta}>
          {paper.authors && paper.authors.length > 0 && (
            <p className={styles.metaAuthors}>{paper.authors.join(', ')}</p>
          )}
          <p className={styles.metaInfo}>
            {paper.journal && <span>{paper.journal}</span>}
            {paper.journal && paper.date && <span> · </span>}
            {paper.date && <span>{paper.date}</span>}
          </p>
        </div>

        {paper.tags && paper.tags.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>关键词</h3>
            <div className={styles.tags}>
              {paper.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 正文内容块 - 支持图文交替 */}
        {paper.sections && paper.sections.length > 0 && (
          <div className={styles.article}>
            {paper.sections.map((section, index) => (
              <div key={index} className={styles.articleSection}>
                {section.type === 'text' && (
                  <p className={styles.paragraph}>{section.content}</p>
                )}
                {section.type === 'image' && (
                  <div className={styles.articleImage}>
                    <img src={getAssetUrl(section.src)} alt={section.alt || ''} />
                    {section.caption && (
                      <p className={styles.imageCaption}>{section.caption}</p>
                    )}
                  </div>
                )}
                {section.type === 'heading' && (
                  <h4 className={styles.articleHeading}>{section.content}</h4>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResearchDetail