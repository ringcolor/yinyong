import { useState } from 'react'
import styles from './ImagePreview.module.css'

function ImagePreview({ src, alt, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles.trigger} onClick={() => setIsOpen(true)}>
        {children}
      </div>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal}>
            <img src={src} alt={alt || ''} />
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ImagePreview