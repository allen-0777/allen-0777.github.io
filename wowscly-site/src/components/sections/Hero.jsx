import { motion } from 'framer-motion'
import ParticleCanvas from '../shared/ParticleCanvas'
import { useParallax } from '../../hooks/useParallax'
import styles from './Hero.module.css'

const cardVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2,0.8,0.2,1] } },
}

export default function Hero() {
  const parallaxY = useParallax(0.3)

  return (
    <section id="hero" className={styles.hero}>
      <ParticleCanvas style={{ transform: `translateY(${parallaxY}px)` }} />
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />

      <motion.div
        className={styles.card}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={styles.eyebrow} variants={itemVariants}>
          Privately Owned AI Brand
        </motion.span>
        <motion.span className={styles.brand} variants={itemVariants}>
          WOWSCLY
        </motion.span>
        <motion.div className={styles.divider} variants={itemVariants} />
        <motion.span className={styles.tagline} variants={itemVariants}>
          Redefine What AI Can Create
        </motion.span>
        <motion.a
          href="#about"
          className={styles.cta}
          variants={itemVariants}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          探索品牌 →
        </motion.a>
      </motion.div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span>Scroll</span>
        <div className={styles.scrollDot} />
      </motion.div>
    </section>
  )
}
