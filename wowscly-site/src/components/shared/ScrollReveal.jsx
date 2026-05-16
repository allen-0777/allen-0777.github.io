import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ScrollReveal({ children, delay = 0, y = 40, className = '' }) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.2, 0.8, 0.2, 1],
        type: 'tween',
      }}
    >
      {children}
    </motion.div>
  )
}
