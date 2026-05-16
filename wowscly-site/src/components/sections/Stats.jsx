import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import GlassCard from '../shared/GlassCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Stats.module.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { target: 9800,  unit: '+', label: 'Threads 粉絲',    display: (v) => v >= 1000 ? (v/1000).toFixed(1)+'K' : String(v) },
  { target: 50,    unit: '+', label: '完成案例',         display: (v) => String(v) },
  { target: 98,    unit: '%', label: '客戶滿意度',       display: (v) => String(v) },
  { target: 3,     unit: '×', label: '平均內容觸及提升', display: (v) => String(v) },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2,0.8,0.2,1] } },
}

export default function Stats() {
  const numsRef = useRef([])
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      numsRef.current.forEach((el, i) => {
        if (el) el.textContent = stats[i].display(stats[i].target)
      })
      return
    }

    const proxy = stats.map(() => ({ val: 0 }))
    const ctx = gsap.context(() => {
      stats.forEach((s, i) => {
        gsap.to(proxy[i], {
          val: s.target,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1.5,
          },
          onUpdate: () => {
            if (numsRef.current[i]) {
              numsRef.current[i].textContent = s.display(Math.floor(proxy[i].val))
            }
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="stats" ref={sectionRef} className={styles.stats}>
      <div className="section-inner">
        <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>§ 06 — Numbers</span>
        <h2 className="section-title" style={{ textAlign: 'center' }}>數字說話</h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={itemVariants}>
              <GlassCard className={styles.item}>
                <div className={styles.num}>
                  <span ref={(el) => (numsRef.current[i] = el)}>0</span>
                  <span className={styles.unit}>{s.unit}</span>
                </div>
                <div className={styles.label}>{s.label}</div>
                <div className={styles.bar} />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
