import { motion } from 'framer-motion'
import GlassCard from '../shared/GlassCard'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="section-inner">
        <span className="section-label">§ 02 — About</span>
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <h2 className={styles.heading}>
              AI 創作的<br /><span>邊界在哪裡？</span>
            </h2>
            <div className={styles.body}>
              <p>WOWSCLY 是一個專注 AI 創作的個人品牌，探索人工智慧在內容創作、品牌設計與自動化應用的無限可能。</p>
              <p>我們相信 AI 不只是工具，而是一種全新的創作語言。</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <GlassCard className={styles.statCard}>
              <div className={styles.badge}>✦ AI Brand Since 2024</div>
              <div className={styles.statNum}>9.8<span className={styles.statUnit}>K</span></div>
              <div className={styles.statLabel}>Threads 粉絲</div>
              <div className={styles.list}>
                🤖 AI 應用實驗<br />
                🎨 品牌視覺設計<br />
                ✍️ AI 內容創作<br />
                🤝 企業 AI 導入顧問
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
