import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import profile from '../data/profile.json'
import projects from '../data/projects.json'
import blog from '../data/blog.json'
import styles from './Home.module.css'

function Home() {
  const latestProjects = projects.projects.slice(0, 2)
  const latestPosts = blog.posts.slice(0, 3)

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <p className={styles.greeting}>Hey there 👋</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.bio}>{profile.bio || profile.summary}</p>
      </section>

      {/* Latest Projects */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest Projects</h2>
          <Link to="/projects" className={styles.viewAll}>View All →</Link>
        </div>
        <div className={styles.projectsGrid}>
          {latestProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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