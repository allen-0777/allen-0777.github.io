import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import GlassCard from '../shared/GlassCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Process.module.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: '需求溝通', desc: '深入了解品牌目標、受眾、預算與時程安排。' },
  { num: '02', title: '策略提案', desc: '提供客製化內容策略與 AI 工具選型建議。' },
  { num: '03', title: '製作執行', desc: '高效產出，定期回報進度，確保品質符合預期。' },
  { num: '04', title: '交付優化', desc: '成果交付後持續追蹤數據，提供後續優化建議。' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2,0.8,0.2,1] } },
}

export default function Process() {
  const lineRef = useRef(null)
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="process" ref={sectionRef} className={styles.process}>
      <div className="section-inner">
        <span className="section-label">§ 05 — 流程</span>
        <h2 className="section-title">合作流程</h2>
        <div className={styles.wrapper}>
          <svg className={styles.connectorSvg} preserveAspectRatio="none">
            <line ref={lineRef} className={styles.connectorLine} x1="12.5%" y1="1" x2="87.5%" y2="1" />
          </svg>
          <motion.div
            className={styles.steps}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {steps.map((s) => (
              <motion.div key={s.num} variants={itemVariants}>
                <GlassCard className={styles.card}>
                  <div className={styles.num}>{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
