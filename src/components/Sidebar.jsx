import { NavLink } from 'react-router-dom'
import profile from '../data/profile.json'
import { getAssetUrl } from '../utils/assets'
import styles from './Sidebar.module.css'

function Sidebar() {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/cv', label: 'CV' },
    { path: '/research', label: 'Research' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    // { path: '/gallery', label: 'Gallery' }, // TODO: 待维护后恢复
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          {profile.avatar ? (
            <img src={getAssetUrl(profile.avatar)} alt={profile.name} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {profile.name.charAt(0)}
            </div>
          )}
        </div>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.nameEn}>{profile.nameEn}</p>
        <p className={styles.title}>{profile.title}</p>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            end={item.path === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.contact}>
        {profile.email && (
          <a href={`mailto:${profile.email}`} className={styles.contactItem}>
            <span className={styles.contactIcon}>✉️</span>
            <span>{profile.email}</span>
          </a>
        )}
        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <span className={styles.contactIcon}>GitHub</span>
          </a>
        )}
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <span className={styles.contactIcon}>LinkedIn</span>
          </a>
        )}
        {profile.location && (
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📍</span>
            <span>{profile.location}</span>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar