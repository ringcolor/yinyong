import { Link } from 'react-router-dom'
import blog from '../data/blog.json'
import styles from './Blog.module.css'

function Blog() {
  return (
    <div className={styles.blog}>
      <h1 className={styles.pageTitle}>Blog</h1>
      <p className={styles.pageDescription}>
        记录学习笔记、技术分享和个人思考
      </p>
      <div className={styles.postList}>
        {blog.posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className={styles.postItem}
          >
            <div className={styles.postHeader}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <span className={styles.postDate}>{post.date}</span>
            </div>
            <p className={styles.postSummary}>{post.summary}</p>
            <div className={styles.postTags}>
              {post.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blog