// Figma node 78:989 "Desktop - 15" — "Synced to where your knowledge lives"
// Full-bleed hero: baked diagram image (Slack/BigQuery/Zendesk → nerd → Answer)
// with a clean nerd wordmark, subtitle, and heading overlaid on top.
import type { CSSProperties } from 'react'

const IMG_BG   = '/section/knowledge-bg.png'  // Figma 78:990 (1414×796)
const IMG_LOGO = '/section/nerd-logo.svg'     // Figma 78:992

// All overlay coordinates are % of the 1440×704 design frame, and font sizes
// use cqw so everything scales in lockstep with the container width.
const FRAME_W = 1440
const FRAME_H = 704

// Horizontal % (of width) and vertical % (of height) — CSS resolves `top`/
// `height` against the container height, so these must use different bases.
const pw = (n: number) => `${(n / FRAME_W) * 100}%`
const ph = (n: number) => `${(n / FRAME_H) * 100}%`
const cqw = (n: number) => `${((n / FRAME_W) * 100).toFixed(3)}cqw`

// Heading gradient (white → 30% white), matching the Figma text fill.
const headingGradient: CSSProperties = {
  background: 'linear-gradient(108deg, #ffffff 0%, #ffffff 45%, rgba(255,255,255,0.3) 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
}

export default function SyncedKnowledgeSection() {
  return (
    <section className="bg-black overflow-hidden">
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: FRAME_W,
          margin: '0 auto',
          aspectRatio: '1440 / 704',
          containerType: 'inline-size',
          backgroundColor: '#000',
          overflow: 'hidden',
        }}
      >
        {/* Background diagram — placed top-left at native aspect (Figma 78:990) */}
        <img
          src={IMG_BG}
          alt="Slack, BigQuery and Zendesk syncing into nerd"
          draggable={false}
          style={{ position: 'absolute', top: 0, left: 0, width: pw(1414), height: 'auto' }}
        />

        {/* Blurred pill mask over the baked-in logo (Figma 78:991) */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: pw(581),
            top: ph(326),
            width: pw(306.39),
            height: ph(107.54),
            background: '#0d0d0e',
            borderRadius: 9999,
            filter: 'blur(0.28cqw)',
          }}
        />

        {/* Clean nerd wordmark (Figma 78:992) */}
        <img
          src={IMG_LOGO}
          alt="nerd"
          draggable={false}
          style={{ position: 'absolute', left: pw(661.1), top: ph(347.29), width: pw(154.21), height: 'auto' }}
        />

        {/* Subtitle — gradient text with blue glow (Figma 78:998) */}
        <p
          style={{
            position: 'absolute',
            left: pw(616),
            top: ph(457),
            margin: 0,
            whiteSpace: 'nowrap',
            fontFamily: "'Halyard Display','DM Sans',sans-serif",
            fontWeight: 400,
            fontSize: cqw(18),
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            opacity: 0.9,
            background: 'linear-gradient(100deg, #ffffff 0%, #999999 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            filter: 'drop-shadow(0 0 0.28cqw #2f70f0)',
          }}
        >
          Data appears within microseconds
        </p>

        {/* Heading — right-aligned, gradient (Figma 78:997) */}
        <h2
          style={{
            position: 'absolute',
            left: pw(707),
            top: ph(71),
            width: pw(655),
            margin: 0,
            textAlign: 'right',
            fontFamily: "'Radley', serif",
            fontWeight: 400,
            fontSize: cqw(62),
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            ...headingGradient,
          }}
        >
          Synced to where your knowledge lives
        </h2>
      </div>
    </section>
  )
}
