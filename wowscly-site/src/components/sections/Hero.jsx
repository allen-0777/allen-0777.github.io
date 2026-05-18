import { motion } from 'framer-motion'
import ParticleCanvas from '../shared/ParticleCanvas'
import { useParallax } from '../../hooks/useParallax'
import styles from './Hero.module.css'

const cardVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const itemVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2,0.8,0.2,1] } },
}

const chips = ['AI 工具', 'Claude Code', '自動化工作流', 'Obsidian 知識管理']

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
        {/* Avatar */}
        <motion.div className={styles.avatarWrap} variants={itemVariants}>
          <img
            src={`${import.meta.env.BASE_URL}avatar.jpg`}
            alt="WOWSCLY"
            className={styles.avatar}
          />
          <div className={styles.followerBadge}>
            <span className={styles.followerDot} />
            Threads <strong>9.8K</strong>
          </div>
        </motion.div>

        {/* Name + brand */}
        <motion.span className={styles.eyebrow} variants={itemVariants}>
          WOWSCLY
        </motion.span>
        <motion.span className={styles.brand} variants={itemVariants}>
          WOWSCLY
        </motion.span>

        <motion.div className={styles.divider} variants={itemVariants} />

        {/* Tagline */}
        <motion.p className={styles.tagline} variants={itemVariants}>
          我把 AI 工具、Claude Code 與自動化流程<br />
          整理成一般人也能上手的實戰教學
        </motion.p>

        {/* Topic chips */}
        <motion.div className={styles.chips} variants={itemVariants}>
          {chips.map((c) => (
            <span key={c} className={styles.chip}>{c}</span>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div className={styles.socials} variants={itemVariants}>
          <a
            href="mailto:wowscly@gmail.com"
            className={styles.socialLink}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Email
          </a>
          <a
            href="https://www.threads.com/@wowscly"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            <svg width="16" height="16" viewBox="0 0 192 192" fill="currentColor">
              <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.347-10.548h.23c8.248.054 14.474 2.452 18.515 7.129 2.953 3.386 4.927 8.096 5.909 14.075-7.391-1.258-15.395-1.645-23.969-1.154-24.133 1.39-39.642 15.51-38.59 35.138.527 9.935 5.491 18.48 13.993 24.04 7.135 4.733 16.313 7.042 25.891 6.535 12.635-.693 22.543-5.523 29.463-14.354 5.258-6.786 8.583-15.573 10.057-26.69 6.026 3.638 10.491 8.418 13.046 14.178 4.764 10.794 5.043 28.516-9.832 43.38-13.067 13.06-28.776 18.73-52.588 18.907-26.368-.2-46.279-8.665-59.176-25.165C6.214 136.143.843 117.965.843 96c0-21.965 5.371-40.143 15.975-54.013C29.716 25.665 49.627 17.2 76 17c26.775.2 47.306 8.713 61.01 25.3 6.681 8.204 11.678 18.489 14.893 30.6l16.285-4.399c-3.898-14.56-10.131-27.173-18.658-37.691C131.018 10.671 105.892.439 76.38.218 47.08.439 22.717 10.718 8.03 29.734-5.678 47.617-12 70.928-12 96c0 25.073 6.322 48.384 20.03 66.267 14.687 19.016 39.05 29.295 68.35 29.516 26.882-.197 46.677-7.186 62.339-22.843 20.498-20.492 19.879-46.437 13.03-62.227-4.762-10.794-13.876-19.558-26.212-25.725zM96.46 135.025c-10.585.612-21.619-3.38-26.897-12.112-3.29-5.485-3.675-12.086-.997-17.785 3.614-7.762 13.093-12.418 24.393-13.07 3.637-.21 7.09-.135 10.262.245.46 11.367-1.27 21.267-4.965 28.48-2.4 4.682-4.744 8.54-7.24 11.284l5.444 3.958zm-4.484-39.947c-6.43.38-14.248 2.8-18.34 10.93-2.374 4.712-2.167 9.89.592 14.623 3.682 6.14 10.866 9.375 18.82 8.924 1.924-.111 3.709-.354 5.4-.7 2.354-6.007 3.668-14.088 3.303-24.082a64.747 64.747 0 0 0-9.775.305z"/>
            </svg>
            @wowscly
          </a>
        </motion.div>

        {/* CTA */}
        <motion.a
          href="mailto:wowscly@gmail.com"
          className={styles.cta}
          variants={itemVariants}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          領取 20 個 AI 實戰 Prompt 清單 →
        </motion.a>
      </motion.div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        <span>向下</span>
        <div className={styles.scrollDot} />
      </motion.div>
    </section>
  )
}
