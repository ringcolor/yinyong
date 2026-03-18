import { useParams, Link } from 'react-router-dom'
import blog from '../data/blog.json'
import { getAssetUrl } from '../utils/assets'
import styles from './BlogDetail.module.css'

function BlogDetail() {
  const { id } = useParams()
  const post = blog.posts.find((p) => p.id === id)

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>文章未找到</h2>
        <p>抱歉，找不到该文章的详细信息。</p>
        <Link to="/blog" className={styles.backLink}>
          返回文章列表
        </Link>
      </div>
    )
  }

  // 提取目录项
  const headings = post.sections
    ? post.sections
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
        <Link to="/blog" className={styles.backLink}>
          ← 返回文章列表
        </Link>

        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.titleRow}>
          <p className={styles.date}>{post.date}</p>
          {post.link && (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.blogLink}
            >
              阅读原文 →
            </a>
          )}
        </div>

        {post.image && (
          <div className={styles.imageWrapper}>
            <img src={getAssetUrl(post.image)} alt={post.title} className={styles.image} />
          </div>
        )}

        <div className={styles.content}>
          {post.summary && <p className={styles.summary}>{post.summary}</p>}

          {post.tags && post.tags.length > 0 && (
            <div className={styles.tagsRow}>
              <span className={styles.tagsLabel}>标签</span>
              <div className={styles.tags}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 正文内容块 - 支持图文交替 */}
          {post.sections && post.sections.length > 0 && (
            <div className={styles.article}>
              {post.sections.map((section, index) => (
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
                <a href={`#section-${item.index}`} className={styles.tocLink}>
                  {item.content}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}

export default BlogDetail