import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import * as XLSX from 'xlsx'
import blog from '../data/blog.json'
import { getAssetUrl } from '../utils/assets'
import ImagePreview from '../components/ImagePreview'
import styles from './BlogDetail.module.css'

// 用于缓存已加载的md文件内容
const markdownCache = {}
const xlsxCache = {}

// XLSX表格渲染组件（按分组显示）
function XLSXTable({ src, onCategoriesLoaded }) {
  const [groupedData, setGroupedData] = useState({})
  const [headers, setHeaders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadXLSX = async () => {
      if (xlsxCache[src]) {
        setHeaders(xlsxCache[src].headers)
        setGroupedData(xlsxCache[src].groupedData)
        onCategoriesLoaded && onCategoriesLoaded(Object.keys(xlsxCache[src].groupedData))
        setLoading(false)
        return
      }

      try {
        const response = await fetch(src)
        const arrayBuffer = await response.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })

        if (jsonData.length > 0) {
          const h = jsonData[0]
          const rows = jsonData.slice(1)

          // 按"大类"分组（第3列，索引为2）
          const grouped = {}
          rows.forEach((row) => {
            const category = row[2] || '未分类'
            if (!grouped[category]) {
              grouped[category] = []
            }
            grouped[category].push(row)
          })

          setHeaders(h)
          setGroupedData(grouped)
          xlsxCache[src] = { headers: h, groupedData: grouped }
          onCategoriesLoaded && onCategoriesLoaded(Object.keys(grouped))
        }
        setLoading(false)
      } catch (error) {
        console.error('Failed to load xlsx:', error)
        setLoading(false)
      }
    }

    loadXLSX()
  }, [src, onCategoriesLoaded])

  if (loading) return <p className={styles.loading}>加载中...</p>

  const categories = Object.keys(groupedData)

  return (
    <div className={styles.tableContainer}>
      {categories.map((category, catIdx) => (
        <div key={catIdx} id={`xlsx-category-${catIdx}`} className={styles.tableGroup}>
          <h3 className={styles.groupTitle}>{category}</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th className={styles.colNum}>#</th>
                  <th>题目</th>
                  <th className={styles.colImportance}>重要性</th>
                  <th className={styles.colTags}>分类</th>
                  <th>主旨和贡献</th>
                  <th>启发</th>
                  <th className={styles.colLink}>链接</th>
                </tr>
              </thead>
              <tbody>
                {groupedData[category].map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    <td className={styles.colNum}>{rowIdx + 1}</td>
                    <td className={styles.colTitle}>
                      <div className={styles.titleEn}>{row[0]}</div>
                      {row[1] && <div className={styles.titleCn}>{row[1]}</div>}
                    </td>
                    <td className={styles.colImportance}>{row[4] || ''}</td>
                    <td className={styles.colTags}>
                      {row[3] ? row[3].split(',').map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag.trim()}</span>
                      )) : ''}
                    </td>
                    <td className={styles.colContent}>{row[5] || ''}</td>
                    <td className={styles.colContent}>{row[6] || ''}</td>
                    <td className={styles.colLink}>
                      {row[7] ? (
                        <a href={row[7]} target="_blank" rel="noopener noreferrer">论文链接</a>
                      ) : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

// 从markdown内容中提取h2标题（二级标题作为目录）
const extractH2Headings = (markdown) => {
  if (!markdown) return []
  const lines = markdown.split('\n')
  const headings = []
  let inCodeBlock = false

  lines.forEach((line) => {
    // 跳过代码块内的内容
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      return
    }
    if (inCodeBlock) return

    const match = line.match(/^##\s+(.+)$/)
    if (match) {
      headings.push(match[1].trim())
    }
  })
  return headings
}

function BlogDetail() {
  const { id } = useParams()
  const post = blog.posts.find((p) => p.id === id)

  // 存储外部markdown文件内容
  const [externalMarkdowns, setExternalMarkdowns] = useState({})

  // 存储xlsx分类目录
  const [xlsxCategories, setXlsxCategories] = useState([])

  // 用于给h2元素分配id
  const markdownRef = useRef(null)

  // 提取目录项 - 从外部markdown的h2标题
  const allHeadings = []
  Object.keys(externalMarkdowns).forEach((sectionIndex) => {
    const h2s = extractH2Headings(externalMarkdowns[sectionIndex])
    h2s.forEach((h) => {
      allHeadings.push(h)
    })
  })

  // 渲染后给h2元素分配id
  useEffect(() => {
    if (markdownRef.current && allHeadings.length > 0) {
      const h2Elements = markdownRef.current.querySelectorAll('h2')
      h2Elements.forEach((el, idx) => {
        el.id = `md-h2-${idx}`
      })
    }
  }, [externalMarkdowns, allHeadings.length])

  const scrollToHeading = (index) => {
    const element = document.getElementById(`md-h2-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToXlsxCategory = (index) => {
    const element = document.getElementById(`xlsx-category-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
  }

  // 加载外部markdown文件
  useEffect(() => {
    if (!post?.sections) return

    const loadExternalMarkdowns = async () => {
      const newMarkdowns = {}

      for (let i = 0; i < post.sections.length; i++) {
        const section = post.sections[i]
        if (section.type === 'externalMarkdown' && section.src) {
          const cacheKey = section.src

          if (markdownCache[cacheKey]) {
            newMarkdowns[i] = markdownCache[cacheKey]
          } else {
            try {
              const response = await fetch(getAssetUrl(section.src))
              if (response.ok) {
                const text = await response.text()
                markdownCache[cacheKey] = text
                newMarkdowns[i] = text
              }
            } catch (error) {
              console.error(`Failed to load markdown: ${section.src}`, error)
              newMarkdowns[i] = '加载内容失败'
            }
          }
        }
      }

      setExternalMarkdowns(newMarkdowns)
    }

    loadExternalMarkdowns()
  }, [post])

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
                      <div className={styles.codeHeader}>
                        {section.language && (
                          <span className={styles.codeLanguage}>{section.language}</span>
                        )}
                        <button
                          className={styles.copyButton}
                          onClick={() => copyCode(section.content)}
                        >
                          复制
                        </button>
                      </div>
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
                  {section.type === 'externalMarkdown' && (
                    <div ref={markdownRef} className={styles.markdownContent}>
                      {externalMarkdowns[index] ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            img: ({ src, alt }) => (
                              <img src={getAssetUrl(src)} alt={alt || ''} />
                            )
                          }}
                        >
                          {externalMarkdowns[index]}
                        </ReactMarkdown>
                      ) : (
                        <p className={styles.loading}>加载中...</p>
                      )}
                    </div>
                  )}
                  {section.type === 'xlsx' && (
                    <XLSXTable
                      src={getAssetUrl(section.src)}
                      onCategoriesLoaded={setXlsxCategories}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 右侧目录导航 */}
      {(allHeadings.length > 0 || xlsxCategories.length > 0) && (
        <nav className={styles.toc}>
          <div className={styles.tocTitle}>目录</div>
          <ul className={styles.tocList}>
            {allHeadings.map((item, idx) => (
              <li key={`md-${idx}`}>
                <button
                  onClick={() => scrollToHeading(idx)}
                  className={styles.tocLink}
                >
                  {item}
                </button>
              </li>
            ))}
            {xlsxCategories.map((item, idx) => (
              <li key={`xlsx-${idx}`}>
                <button
                  onClick={() => scrollToXlsxCategory(idx)}
                  className={styles.tocLink}
                >
                  {item}
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