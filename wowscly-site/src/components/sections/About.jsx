import { motion } from 'framer-motion'
import GlassCard from '../shared/GlassCard'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="section-inner">
        <span className="section-label">§ 02 — 關於</span>
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <h2 className={styles.heading}>
              把 AI 變成你<br /><span>真的用得上的工作能力</span>
            </h2>
            <div className={styles.body}>
              <p>從 ChatGPT、Claude Code、Codex、Gemini 到自動化流程，我把每個工具真正試過、踩過坑之後，整理成一般人也能上手的實戰教學。</p>
              <p>不是在教你「AI 是什麼」，而是帶你用 AI 直接做出東西。</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <GlassCard className={styles.statCard}>
              <div className={styles.badge}>✦ AI 工具研究 Since 2023</div>
              <div className={styles.statNum}>9.8<span className={styles.statUnit}>K</span></div>
              <div className={styles.statLabel}>Threads 粉絲</div>
              <div className={styles.list}>
                🤖 AI 工具研究與實測<br />
                ⚡ Flow 自動化設計<br />
                📒 Note 知識管理系統<br />
                💻 Claude Code 程式實戰
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
