import { motion } from 'framer-motion'
import GlassCard from '../shared/GlassCard'
import styles from './Testimonials.module.css'

const testimonials = [
  { quote: 'WOWSCLY 幫助我們在兩週內建立完整的 AI 內容工作流，效率提升超出預期，強烈推薦給想擁抱 AI 的品牌。', name: 'Alex Chen', role: '某科技新創 CMO', initial: 'A' },
  { quote: '合作內容在 Threads 上的觸及率是我們過去的三倍，WOWSCLY 對 AI 工具的掌握程度令人印象深刻。', name: 'Morgan Liu', role: '品牌行銷主任', initial: 'M' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2,0.8,0.2,1] } },
}

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="section-inner">
        <span className="section-label">§ 07 — Testimonials</span>
        <h2 className="section-title">合作夥伴怎麼說</h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={itemVariants}>
              <GlassCard className={styles.card}>
                <div className={styles.quote}>"</div>
                <blockquote>{t.quote}</blockquote>
                <div className={styles.author}>
                  <div className={styles.avatar}>{t.initial}</div>
                  <div>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.role}>{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
