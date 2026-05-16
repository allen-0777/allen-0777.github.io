import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useParallax(factor = 0.3) {
  const reduced = useReducedMotion()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (reduced) return
    const handler = () => setOffset(window.scrollY * factor)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [factor, reduced])

  return offset
}
