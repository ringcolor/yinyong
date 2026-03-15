import { NavLink } from 'react-router-dom'
import profile from '../data/profile.json'
import styles from './Sidebar.module.css'

function Sidebar() {
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/research', label: 'Research', icon: '📚' },
    { path: '/projects', label: 'Projects', icon: '💻' },
    { path: '/gallery', label: 'Gallery', icon: '🎨' },
    { path: '/blog', label: 'Blog', icon: '✍️' },
    { path: '/cv', label: 'CV', icon: '📄' },
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} />
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
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
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