import GalleryCard from '../components/GalleryCard'
import works from '../data/works.json'
import styles from './Gallery.module.css'

function Gallery() {
  return (
    <div className={styles.gallery}>
      {/* TODO: 待维护后恢复
      <h1 className={styles.pageTitle}>Gallery</h1>
      <p className={styles.pageDescription}>
        摄影、舞蹈、兴趣爱好等个人作品展示
      </p>
      <div className={styles.grid}>
        {works.works.map((work) => (
          <GalleryCard key={work.id} work={work} />
        ))}
      </div>
      */}
      <h1 className={styles.pageTitle}>Gallery</h1>
      <p className={styles.pageDescription}>
        🚧 页面维护中，敬请期待...
      </p>
    </div>
  )
}

export default Gallery