import styles from './InternshipCard.module.css'

function InternshipCard({ internship }) {
  return (
    <div className={styles.card}>
      {/* 第一行：公司名 + 时间 */}
      <div className={styles.header}>
        <div className={styles.nameWrapper}>
          <h3 className={styles.company}>{internship.company}</h3>
          {internship.companyEn && (
            <span className={styles.companyEn}>{internship.companyEn}</span>
          )}
        </div>
        <span className={styles.period}>{internship.period}</span>
      </div>

      {/* 第二行：职位 / 部门 / 地点 */}
      <div className={styles.info}>
        <span className={styles.position}>{internship.position}</span>
        {internship.department && (
          <>
            <span className={styles.separator}>·</span>
            <span className={styles.department}>{internship.department}</span>
          </>
        )}
        {internship.location && (
          <>
            <span className={styles.separator}>·</span>
            <span className={styles.location}>{internship.location}</span>
          </>
        )}
      </div>

      {/* 第三行：工作内容 */}
      {internship.description && internship.description.length > 0 && (
        <ul className={styles.description}>
          {internship.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {/* 第四行：技术栈 */}
      {internship.tech && internship.tech.length > 0 && (
        <div className={styles.techRow}>
          {internship.tech.map((tech, index) => (
            <span key={index} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default InternshipCard