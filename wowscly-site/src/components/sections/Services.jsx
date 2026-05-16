import { motion } from 'framer-motion'
import GlassCard from '../shared/GlassCard'
import styles from './Services.module.css'

const services = [
  { icon: '🤖', title: 'AI 內容製作', desc: '結合生成式 AI 工具，製作高品質的圖文影音內容，提升品牌在社群上的觸及與互動率。' },
  { icon: '🎯', title: '品牌業配合作', desc: '與 AI 工具、科技品牌、新創企業進行深度合作，以真實體驗為基礎的內容行銷。' },
  { icon: '⚡', title: 'AI 工作流顧問', desc: '協助個人與企業建立 AI 自動化工作流，提升營運效率，降低重複性工作成本。' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2,0.8,0.2,1] } },
}

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className="section-inner">
        <span className="section-label">§ 03 — Services</span>
        <h2 className="section-title">提供哪些服務</h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={cardVariants}>
              <GlassCard className={styles.card}>
                <div className={styles.icon}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
