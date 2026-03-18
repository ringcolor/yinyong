import { Link } from 'react-router-dom'
import WorkCard from '../components/WorkCard'
import profile from '../data/profile.json'
import projects from '../data/projects.json'
import research from '../data/research.json'
import blog from '../data/blog.json'
import news from '../data/news.json'
import styles from './Home.module.css'

function Home() {
  // 合并项目和科研，按时间排序取最新的2个
  const allWorks = [
    ...projects.projects.map(p => ({ ...p, type: 'project', sortDate: p.period || '0' })),
    ...research.papers.map(r => ({ ...r, type: 'research', name: r.title, sortDate: r.date || '0' }))
  ].sort((a, b) => b.sortDate.localeCompare(a.sortDate)).slice(0, 2)

  const latestPosts = blog.posts.slice(0, 2)
  const latestNews = news.news.slice(0, 2)

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <p className={styles.greeting}>Hey there 👋</p>
        <h1 className={styles.name}>I'm Zhuyu Teng.</h1>
        {profile.slogan && <p className={styles.slogan}>{profile.slogan}</p>}
        <p className={styles.bio}>{profile.bio || profile.summary}</p>
      </section>

      {/* News */}
      {latestNews.length > 0 && (
        <section className={styles.newsSection}>
          <h2 className={styles.sectionTitle}>News</h2>
          <div className={styles.newsList}>
            {latestNews.map((item) => (
              <div key={item.id} className={styles.newsItem}>
                <span className={styles.newsDate}>{item.date}</span>
                <span className={styles.newsContent}>
                  {item.icon && <span className={styles.newsIcon}>{item.icon}</span>}
                  {item.content}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Work */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Work</h2>
          <Link to="/projects" className={styles.viewAll}>View All →</Link>
        </div>
        <div className={styles.worksGrid}>
          {allWorks.map((item) => (
            <WorkCard key={item.id} item={item} type={item.type} />
          ))}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest Blog</h2>
          <Link to="/blog" className={styles.viewAll}>View All →</Link>
        </div>
        <div className={styles.blogList}>
          {latestPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.blogItem}
            >
              <h3 className={styles.blogTitle}>{post.title}</h3>
              <p className={styles.blogSummary}>{post.summary}</p>
              <div className={styles.blogMeta}>
                <span className={styles.blogDate}>{post.date}</span>
                <div className={styles.blogTags}>
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className={styles.blogTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home