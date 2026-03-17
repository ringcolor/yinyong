import { getAssetUrl } from '../utils/assets'
import styles from './GalleryCard.module.css'

function GalleryCard({ work }) {
  return (
    <a
      href={work.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      <div className={styles.card}>
        {work.image && (
          <div className={styles.imageWrapper}>
            <img src={getAssetUrl(work.image)} alt={work.title} className={styles.image} />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{work.title}</h3>
            <span className={styles.type}>{work.type}</span>
          </div>
          <p className={styles.description}>{work.description}</p>
        </div>
      </div>
    </a>
  )
}

export default GalleryCard