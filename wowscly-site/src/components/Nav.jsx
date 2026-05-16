import { motion } from 'framer-motion'
import styles from './Nav.module.css'

const links = ['About', 'Services', 'Work', 'Contact']

export default function Nav() {
  return (
    <motion.nav
      className={styles.nav}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <a href="#hero" className={styles.logo}>WOWSCLY</a>
      <div className={styles.links}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
        ))}
      </div>
    </motion.nav>
  )
}
