import { motion } from 'framer-motion'
import GlassCard from '../shared/GlassCard'
import styles from './Services.module.css'

const services = [
  {
    icon: '🤖',
    title: 'AI 工具入門教學',
    desc: '適合 AI 小白、內容創作者、營運與中小團隊。把複雜的 AI 工具拆成你能馬上用的步驟，讓你第一週就跑出成果。',
  },
  {
    icon: '💻',
    title: 'Claude Code / 程式實戰',
    desc: '用 AI 輔助寫程式、做工具、打造自動化原型。不需要傳統程式底子，從零到跑出第一個 AI 工具。',
  },
  {
    icon: '⚡',
    title: '企業內訓與自動化諮詢',
    desc: '協助團隊建立 AI 工作流與內部使用 SOP，把重複性工作交給 AI，讓人專注在真正有價值的事。',
  },
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
        <span className="section-label">§ 03 — 服務</span>
        <h2 className="section-title">我可以幫你做什麼</h2>
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
