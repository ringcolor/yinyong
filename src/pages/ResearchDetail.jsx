import { useParams, Link } from 'react-router-dom'
import research from '../data/research.json'
import { getAssetUrl } from '../utils/assets'
import ImagePreview from '../components/ImagePreview'
import styles from './ResearchDetail.module.css'

function ResearchDetail() {
  const { id } = useParams()
  const paper = research.papers.find((p) => p.id === id)

  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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

  // 提取目录项
  const headings = paper.sections
    ? paper.sections
        .map((section, index) => ({
          index,
          content: section.content,
          type: section.type
        }))
        .filter((item) => item.type === 'heading')
    : []

  return (
    <div className={styles.detailWrapper}>
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

        <div className={styles.content}>
          <div className={styles.meta}>
            {paper.authors && paper.authors.length > 0 && (
              <p className={styles.metaAuthors}>
                {paper.authors.map((author, index) => {
                  const isMe = author.includes('Zhuyu Teng')
                  return (
                    <span key={index}>
                      {isMe ? <strong>{author}</strong> : author}
                      {index < paper.authors.length - 1 && ', '}
                    </span>
                  )
                })}
              </p>
            )}
            <p className={styles.metaInfo}>
              {paper.journal && <span>{paper.journal}</span>}
              {paper.journal && paper.date && <span> · </span>}
              {paper.date && <span>{paper.date}</span>}
            </p>
          </div>

          {paper.tags && paper.tags.length > 0 && (
            <div className={styles.tagsRow}>
              <span className={styles.tagsLabel}>关键词</span>
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
                      <ImagePreview src={getAssetUrl(section.src)} alt={section.alt || ''}>
                        <img src={getAssetUrl(section.src)} alt={section.alt || ''} />
                      </ImagePreview>
                      {section.caption && (
                        <p className={styles.imageCaption}>{section.caption}</p>
                      )}
                    </div>
                  )}
                  {section.type === 'images' && section.items && (
                    <div className={styles.imagesGrid}>
                      {section.items.map((item, idx) => (
                        <div key={idx} className={styles.imagesItem}>
                          <ImagePreview src={getAssetUrl(item.src)} alt={item.alt || ''}>
                            <img src={getAssetUrl(item.src)} alt={item.alt || ''} />
                          </ImagePreview>
                          {item.caption && (
                            <p className={styles.imageCaption}>{item.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {section.type === 'video' && (
                    <div className={styles.articleVideo}>
                      <video controls>
                        <source src={getAssetUrl(section.src)} type="video/mp4" />
                        您的浏览器不支持视频播放
                      </video>
                      {section.caption && (
                        <p className={styles.imageCaption}>{section.caption}</p>
                      )}
                    </div>
                  )}
                  {section.type === 'youtube' && (
                    <div className={styles.articleVideo}>
                      <div className={styles.youtubeWrapper}>
                        <iframe
                          src={`https://www.youtube.com/embed/${section.videoId}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      {section.caption && (
                        <p className={styles.imageCaption}>{section.caption}</p>
                      )}
                    </div>
                  )}
                  {section.type === 'heading' && (
                    <h4 id={`section-${index}`} className={styles.articleHeading}>
                      {section.content}
                    </h4>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 右侧目录导航 */}
      {headings.length > 0 && (
        <nav className={styles.toc}>
          <div className={styles.tocTitle}>目录</div>
          <ul className={styles.tocList}>
            {headings.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => scrollToSection(item.index)}
                  className={styles.tocLink}
                >
                  {item.content}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}

export default ResearchDetail