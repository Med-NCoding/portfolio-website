'use client'

import { useEffect, useRef, useState } from 'react'

interface LandingIntroProps {
  onEnter: () => void
}

const FULL_NAME = 'Medhansh Negi'
const TYPING_SPEED_MS = 90   // ms per character
const CURSOR_BLINK_MS = 530  // ms per blink half-cycle
const BUTTON_DELAY_MS = 340  // delay after typing finishes before button appears

export default function LandingIntro({ onEnter }: LandingIntroProps) {
  const [displayed, setDisplayed]   = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [typingDone, setTypingDone] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [exiting, setExiting]       = useState(false)

  // Typing effect
  useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      idx++
      setDisplayed(FULL_NAME.slice(0, idx))
      if (idx >= FULL_NAME.length) {
        clearInterval(interval)
        setTypingDone(true)
        setTimeout(() => setShowButton(true), BUTTON_DELAY_MS)
      }
    }, TYPING_SPEED_MS)
    return () => clearInterval(interval)
  }, [])

  // Cursor blink
  const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    blinkRef.current = setInterval(() => {
      setShowCursor(v => !v)
    }, CURSOR_BLINK_MS)
    return () => { if (blinkRef.current) clearInterval(blinkRef.current) }
  }, [])

  // Stop blinking once typing is done
  useEffect(() => {
    if (typingDone) {
      if (blinkRef.current) clearInterval(blinkRef.current)
      setShowCursor(false)
    }
  }, [typingDone])

  function handleEnter() {
    setExiting(true)
    setTimeout(() => onEnter(), 700)
  }

  return (
    <div
      aria-label="Landing intro"
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          1000,
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: 'var(--bg)',
        opacity:          exiting ? 0 : 1,
        transition:       exiting ? 'opacity 0.7s ease' : 'none',
        pointerEvents:    exiting ? 'none' : 'auto',
      }}
    >
      {/* Name with typing cursor */}
      <div
        style={{
          fontFamily:    'var(--font-playfair), serif',
          fontSize:      'clamp(2rem, 7vw, 4rem)',
          fontWeight:    700,
          color:         'var(--text-primary)',
          letterSpacing: '-0.01em',
          lineHeight:    1,
          display:       'flex',
          alignItems:    'center',
          gap:           '0.08em',
        }}
      >
        <span>{displayed}</span>
        {/* Blinking cursor bar */}
        <span
          aria-hidden="true"
          style={{
            display:         'inline-block',
            width:           '2px',
            height:          '1em',
            backgroundColor: 'var(--accent)',
            borderRadius:    '1px',
            opacity:          showCursor ? 1 : 0,
            transition:       'opacity 0.1s',
            marginLeft:       '2px',
            verticalAlign:    'middle',
            marginTop:        '-0.05em',
          }}
        />
      </div>

      {/* Enter button */}
      <div
        style={{
          marginTop:     '2.8rem',
          opacity:        showButton ? 1 : 0,
          transform:      showButton ? 'translateY(0)' : 'translateY(8px)',
          transition:    'opacity 0.5s ease, transform 0.5s ease',
          pointerEvents:  showButton ? 'auto' : 'none',
        }}
      >
        <button
          id="landing-enter-btn"
          onClick={handleEnter}
          style={{
            fontFamily:    'var(--font-mono), monospace',
            fontSize:      '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--text-muted)',
            background:    'transparent',
            border:        '1px solid var(--rule)',
            borderRadius:  '3px',
            padding:       '0.55rem 1.5rem',
            cursor:        'pointer',
            transition:    'color 0.2s ease, border-color 0.2s ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.color       = 'var(--accent)'
            el.style.borderColor = 'var(--accent-deep)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.color       = 'var(--text-muted)'
            el.style.borderColor = 'var(--rule)'
          }}
        >
          Enter Space
        </button>
      </div>
    </div>
  )
}
