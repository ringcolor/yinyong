import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import blog from '../data/blog.json'
import { getAssetUrl } from '../utils/assets'
import ImagePreview from '../components/ImagePreview'
import styles from './BlogDetail.module.css'

function BlogDetail() {
  const { id } = useParams()
  const post = blog.posts.find((p) => p.id === id)

  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
            <ImagePreview src={getAssetUrl(post.image)} alt={post.title}>
              <img src={getAssetUrl(post.image)} alt={post.title} className={styles.image} />
            </ImagePreview>
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
                    <div className={`${styles.articleImage} ${section.halfWidth ? styles.halfWidth : ''}`}>
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
                  {section.type === 'imagesColumns' && section.columns && (
                    <div className={styles.imagesColumnsGrid}>
                      {section.columns.map((column, colIdx) => (
                        <div key={colIdx} className={styles.imagesColumn}>
                          {column.map((item, itemIdx) => (
                            <div key={itemIdx} className={styles.imagesColumnItem}>
                              <ImagePreview src={getAssetUrl(item.src)} alt={item.alt || ''}>
                                <img src={getAssetUrl(item.src)} alt={item.alt || ''} />
                              </ImagePreview>
                              {item.caption && (
                                <p className={styles.imageCaption}>{item.caption}</p>
                              )}
                            </div>
                          ))}
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
                  {section.type === 'bilibili' && (
                    <div className={styles.articleVideo}>
                      <div className={styles.bilibiliWrapper}>
                        <iframe
                          src={`//player.bilibili.com/player.html?bvid=${section.bvid}`}
                          scrolling="no"
                          border="0"
                          frameBorder="no"
                          framespacing="0"
                          allowFullScreen
                        ></iframe>
                      </div>
                      {section.caption && (
                        <p className={styles.imageCaption}>{section.caption}</p>
                      )}
                    </div>
                  )}
                  {section.type === 'code' && (
                    <div className={styles.codeBlock}>
                      {section.language && (
                        <span className={styles.codeLanguage}>{section.language}</span>
                      )}
                      <pre>
                        <code>{section.content}</code>
                      </pre>
                    </div>
                  )}
                  {section.type === 'heading' && (
                    <h4 id={`section-${index}`} className={styles.articleHeading}>
                      {section.content}
                    </h4>
                  )}
                  {section.type === 'subheading' && (
                    <h5 className={styles.articleSubheading}>
                      {section.content}
                    </h5>
                  )}
                  {section.type === 'markdown' && (
                    <div className={styles.markdownContent}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          img: ({ src, alt }) => (
                            <img src={getAssetUrl(src)} alt={alt || ''} />
                          )
                        }}
                      >
                        {section.content}
                      </ReactMarkdown>
                    </div>
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

export default BlogDetail