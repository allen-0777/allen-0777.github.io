import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassCard from '../shared/GlassCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Work.module.css'

gsap.registerPlugin(ScrollTrigger)

const works = [
  { label: 'AI ×', bg: 'linear-gradient(135deg,#05101a,#0a1f35)', title: 'AI 品牌視覺識別系統', desc: '運用 Midjourney + Runway 打造完整品牌視覺，從 logo 到社群模板一氣呵成。', tag: 'AI Design' },
  { label: 'AUTO', bg: 'linear-gradient(135deg,#070a1a,#0d1535)', title: '自動化內容生產流水線', desc: '建立從主題策劃到發佈排程的全自動化系統，每週產出 30+ 篇高品質內容。', tag: 'Automation' },
  { label: 'GPT', bg: 'linear-gradient(135deg,#050d1a,#081828)', title: 'Custom GPT 品牌顧問', desc: '為品牌打造專屬 AI 顧問助理，7×24 小時回答客戶諮詢，降低客服成本 60%。', tag: 'AI Agent' },
  { label: 'DATA', bg: 'linear-gradient(135deg,#060810,#0a1020)', title: 'AI 數據洞察報告', desc: '整合社群數據與 AI 分析，每月自動生成品牌健康度報告，協助快速決策。', tag: 'Analytics' },
]

export default function Work() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

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
        <span className="section-label">§ 04 — Work</span>
        <h2 className="section-title">精選案例</h2>
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
