'use client'

import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 18
const IDLE_TIMEOUT = 120 // ms before trail disappears

export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number }[]>([])
  const lastMove = useRef<number>(0)
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      lastMove.current = Date.now()
      points.current.push({ x: e.clientX, y: e.clientY })
      if (points.current.length > TRAIL_LENGTH) points.current.shift()
    }
    window.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        rafId.current = requestAnimationFrame(draw)
        return
      }

      const dpr = window.devicePixelRatio || 1

      // If cursor has been idle, wipe canvas and reset points
      if (Date.now() - lastMove.current > IDLE_TIMEOUT) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        points.current = []
        rafId.current = requestAnimationFrame(draw)
        return
      }

      const pts = points.current
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (pts.length < 2) {
        rafId.current = requestAnimationFrame(draw)
        return
      }

      // Draw trail segments with smooth fading opacity
      for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i]
        const p2 = pts[i + 1]
        const progress = (i + 1) / (pts.length - 1)
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${(progress * 0.75).toFixed(3)})`
        ctx.lineWidth = 1.5 + progress * 1.0
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }

      // Glowing light centered directly on the pointer
      const head = pts[pts.length - 1]
      ctx.beginPath()
      ctx.arc(head.x, head.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.fill()

      rafId.current = requestAnimationFrame(draw)
    }
    rafId.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return <canvas id="cursor-canvas" ref={canvasRef} />
}
