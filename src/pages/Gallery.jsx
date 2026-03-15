import WorkCard from '../components/WorkCard'
import works from '../data/works.json'
import styles from './Gallery.module.css'

function Gallery() {
  return (
    <div className={styles.gallery}>
      <h1 className={styles.pageTitle}>Gallery</h1>
      <p className={styles.pageDescription}>
        摄影、舞蹈、兴趣爱好等个人作品展示
      </p>
      <div className={styles.grid}>
        {works.works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </div>
  )
}

export default Gallery