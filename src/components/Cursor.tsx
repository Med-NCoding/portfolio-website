'use client'

import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 20
const TRAIL_COLOR   = 'rgba(255, 255, 255, 0.75)'
const IDLE_TIMEOUT  = 150 // ms before trail disappears

export default function Cursor() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const points      = useRef<{ x: number; y: number }[]>([])
  const lastMove    = useRef<number>(0)
  const rafId       = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
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
      if (!ctx) { rafId.current = requestAnimationFrame(draw); return }

      // If cursor has been idle, wipe everything and wait
      if (Date.now() - lastMove.current > IDLE_TIMEOUT) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        points.current = []
        rafId.current = requestAnimationFrame(draw)
        return
      }

      const pts = points.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (pts.length < 2) { rafId.current = requestAnimationFrame(draw); return }

      const tail = pts[0]
      const head = pts[pts.length - 1]
      const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(1, TRAIL_COLOR)

      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)

      ctx.strokeStyle = grad
      ctx.lineWidth   = 2
      ctx.lineCap     = 'round'
      ctx.lineJoin    = 'round'
      ctx.stroke()

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
