import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassCard from '../shared/GlassCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Work.module.css'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    label: 'PROMPT',
    bg: 'linear-gradient(135deg,#05101a,#0a1f35)',
    title: 'AI 實戰 Prompt 清單',
    desc: '精選 20 個經過實測的 Prompt，涵蓋內容創作、工作流加速、客服自動化等場景，直接複製即可用。',
    tag: '免費資源',
  },
  {
    label: 'PKM',
    bg: 'linear-gradient(135deg,#070a1a,#0d1535)',
    title: 'Obsidian × AI 知識管理',
    desc: '把 Obsidian 筆記系統與 AI 工具深度結合，從收集資訊到產出內容，建立一套完整的個人知識工廠。',
    tag: '系統設計',
  },
  {
    label: 'CODE',
    bg: 'linear-gradient(135deg,#050d1a,#081828)',
    title: 'Claude Code 實戰教學',
    desc: '從安裝到第一個自動化工具，手把手帶你用 Claude Code 寫出真正能跑的程式，不需要傳統程式底子。',
    tag: '實戰教學',
  },
  {
    label: 'SOP',
    bg: 'linear-gradient(135deg,#060810,#0a1020)',
    title: '企業 AI 導入 SOP',
    desc: '協助中小企業與團隊建立可落地的 AI 使用規範與工作流，讓 AI 真正融入日常營運而不只是噱頭。',
    tag: '企業顧問',
  },
]

export default function Work() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (window.innerWidth < 768) return

    const section = sectionRef.current
    const track = trackRef.current
    const totalScroll = track.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="work" ref={sectionRef} className={styles.work}>
      <div className="section-inner" style={{ overflow: 'visible', maxWidth: 'none', paddingLeft: 40 }}>
        <span className="section-label">§ 04 — 作品</span>
        <h2 className="section-title">精選內容</h2>
        <div ref={trackRef} className={styles.track}>
          {works.map((w) => (
            <GlassCard key={w.title} className={styles.card}>
              <div className={styles.thumb} style={{ background: w.bg }}>
                <span style={{ color: 'rgba(0,210,255,0.45)', position: 'relative', zIndex: 1 }}>{w.label}</span>
              </div>
              <div className={styles.info}>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <span className={styles.tag}>{w.tag}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
