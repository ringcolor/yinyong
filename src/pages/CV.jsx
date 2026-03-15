import EducationCard from '../components/EducationCard'
import ProjectCard from '../components/ProjectCard'
import ResearchCard from '../components/ResearchCard'
import education from '../data/education.json'
import projects from '../data/projects.json'
import research from '../data/research.json'
import blog from '../data/blog.json'
import styles from './CV.module.css'

function CV() {
  return (
    <div className={styles.cv}>
      {/* 教育背景 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>教育背景</h2>
        {education.schools.map((school) => (
          <EducationCard key={school.id} school={school} />
        ))}
      </section>

      {/* 项目经历简介 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>项目经历</h2>
        <div className={styles.grid}>
          {projects.projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {projects.projects.length > 3 && (
          <a href="/projects" className={styles.viewAll}>
            查看全部项目 →
          </a>
        )}
      </section>

      {/* 科研经历简介 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>科研经历</h2>
        {research.papers.slice(0, 2).map((paper) => (
          <ResearchCard key={paper.id} paper={paper} />
        ))}
        {research.papers.length > 2 && (
          <a href="/research" className={styles.viewAll}>
            查看全部论文 →
          </a>
        )}
      </section>

      {/* Blog 笔记 */}
      {blog.posts && blog.posts.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Blog 笔记</h2>
          <div className={styles.blogList}>
            {blog.posts.slice(0, 3).map((post) => (
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
                    {post.tags.map((tag, index) => (
                      <span key={index} className={styles.blogTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default CV