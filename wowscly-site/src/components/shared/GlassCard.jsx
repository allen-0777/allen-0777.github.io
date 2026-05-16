import { motion } from 'framer-motion'
import styles from './GlassCard.module.css'

export default function GlassCard({ children, className = '', style }) {
  return (
    <motion.div
      className={`${styles.card} ${className}`}
      style={style}
      whileHover={{ y: -4, scale: 1.01, boxShadow: 'var(--glow-hover)' }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
