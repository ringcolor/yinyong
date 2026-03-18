import { Link } from 'react-router-dom'
import education from '../data/education.json'
import internships from '../data/internships.json'
import awards from '../data/awards.json'
import experiences from '../data/experiences.json'
import skills from '../data/skills.json'
import styles from './CV.module.css'

function CV() {
  return (
    <div className={styles.cv}>
      {/* 教育背景 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>教育背景</h2>
        <div className={styles.list}>
          {education.schools.map((school) => (
            <div key={school.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.itemTitle}>
                  <span className={styles.name}>{school.name}</span>
                  <span className={styles.nameEn}>{school.nameEn}</span>
                </div>
                <span className={styles.period}>{school.period}</span>
              </div>
              <div className={styles.itemContent}>
                <p className={styles.infoLine}>
                  <span>{school.degree}</span>
                  {school.major && <span> · {school.major}</span>}
                </p>
                {school.gpa && <p className={styles.infoLine}>{school.gpa}</p>}
                {school.honors && school.honors.length > 0 && (
                  <p className={styles.infoLine}>
                    荣誉：{school.honors.join('、')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 实习经历 */}
      {internships.internships && internships.internships.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>实习经历</h2>
          <div className={styles.list}>
            {internships.internships.map((internship) => (
              <div key={internship.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemTitle}>
                    <span className={styles.name}>{internship.company}</span>
                    {internship.companyEn && <span className={styles.nameEn}>{internship.companyEn}</span>}
                  </div>
                  <span className={styles.period}>{internship.period}</span>
                </div>
                <div className={styles.itemContent}>
                  <p className={styles.infoLine}>
                    <span>{internship.position}</span>
                    {internship.department && <span> · {internship.department}</span>}
                    {internship.location && <span> · {internship.location}</span>}
                  </p>
                  {internship.description && (
                    <p className={styles.description}>{internship.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AI项目经历 */}
      {experiences.experiences && experiences.experiences.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>AI项目经历</h2>
          <div className={styles.awardList}>
            {experiences.experiences.map((exp) => {
              // 有论文ID
              if (exp.paperId) {
                return (
                  <Link key={exp.id} to={`/research/${exp.paperId}`} className={styles.awardItem}>
                    <span className={styles.awardTitle}>{exp.title}</span>
                    <span className={styles.awardLevel}>{exp.role}</span>
                    <span className={styles.awardDate}>{exp.date}</span>
                  </Link>
                )
              }
              // 有项目ID
              if (exp.projectId) {
                return (
                  <Link key={exp.id} to={`/projects/${exp.projectId}`} className={styles.awardItem}>
                    <span className={styles.awardTitle}>{exp.title}</span>
                    <span className={styles.awardLevel}>{exp.role}</span>
                    <span className={styles.awardDate}>{exp.date}</span>
                  </Link>
                )
              }
              // 无链接
              return (
                <div key={exp.id} className={styles.awardItem}>
                  <span className={styles.awardTitle}>{exp.title}</span>
                  <span className={styles.awardLevel}>{exp.role}</span>
                  <span className={styles.awardDate}>{exp.date}</span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 获奖成果 */}
      {awards.awards && awards.awards.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>获奖成果</h2>
          <div className={styles.awardList}>
            {awards.awards.map((award) => {
              // 有外部链接
              if (award.link) {
                return (
                  <a
                    key={award.id}
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.awardItem}
                  >
                    <span className={styles.awardTitle}>{award.title}</span>
                    <span className={styles.awardLevel}>{award.level}</span>
                    <span className={styles.awardDate}>{award.date}</span>
                  </a>
                )
              }
              // 有项目ID
              if (award.projectId) {
                return (
                  <Link key={award.id} to={`/projects/${award.projectId}`} className={styles.awardItem}>
                    <span className={styles.awardTitle}>{award.title}</span>
                    <span className={styles.awardLevel}>{award.level}</span>
                    <span className={styles.awardDate}>{award.date}</span>
                  </Link>
                )
              }
              // 无链接
              return (
                <div key={award.id} className={styles.awardItem}>
                  <span className={styles.awardTitle}>{award.title}</span>
                  <span className={styles.awardLevel}>{award.level}</span>
                  <span className={styles.awardDate}>{award.date}</span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 技能 */}
      {skills.skills && skills.skills.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>技能</h2>
          <div className={styles.skillsList}>
            {skills.skills.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <span className={styles.skillCategory}>{skill.category}</span>
                <span className={styles.skillItems}>{skill.items.join('、')}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default CV