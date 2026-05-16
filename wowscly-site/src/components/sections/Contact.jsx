import { motion } from 'framer-motion'
import styles from './Contact.module.css'

const headingWords = ['準備好', '合作', '了嗎？']

const wordVariants = {
  hidden:  { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: '0%' },
}
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export default function Contact() {
  return (
    <>
      <section id="contact" className={styles.contact}>
        <div className="section-inner">
          <div className={styles.inner}>
            <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>§ 08 — Contact</span>

            <motion.h2
              className={styles.heading}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {headingWords.map((word, i) => (
                <span key={i} className={styles.word} style={{ marginRight: i < headingWords.length - 1 ? '0.25em' : 0 }}>
                  <motion.span
                    variants={wordVariants}
                    style={{ display: 'inline-block' }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    {word === '合作' ? <span style={{ color: 'var(--cyan)' }}>{word}</span> : word}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.p
              className={styles.body}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.35, ease: [0.2,0.8,0.2,1] }}
            >
              無論是品牌業配、AI 顧問服務或內容合作，歡迎直接聯繫。通常在 24 小時內回覆。
            </motion.p>

            <motion.div
              className={styles.btns}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.5, ease: [0.2,0.8,0.2,1] }}
            >
              <motion.a
                href="mailto:alleniverson7531@gmail.com"
                className={styles.btnPrimary}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                📩 寄信聯絡
              </motion.a>
              <motion.a
                href="https://www.threads.com/@wowscly"
                target="_blank"
                rel="noreferrer"
                className={styles.btnSecondary}
                whileHover={{ scale: 1.03 }}
              >
                Threads @wowscly
              </motion.a>
            </motion.div>

            <motion.div
              className={styles.socials}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <a href="https://www.threads.com/@wowscly" className={styles.pill} target="_blank" rel="noreferrer">🔵 Threads · 9.8K</a>
              <a href="#" className={styles.pill}>📷 Instagram</a>
            </motion.div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>© 2025 WOWSCLY. All rights reserved.</footer>
    </>
  )
}
