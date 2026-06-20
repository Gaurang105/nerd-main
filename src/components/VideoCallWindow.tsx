// Figma node 78:1193 — macOS video-call window, coded (not a screenshot).
// Reused by the IntroFeatureSection hero and InstantActivationCard.
import { motion } from 'framer-motion'
import { Mic, Video, LayoutGrid, Monitor, EyeOff, AudioLines, History } from 'lucide-react'

// ── Assets (saved locally — Figma asset URLs expire after 7 days) ──
const IMG_MAN   = '/card/call-man.png'   // left tile poster  (Figma 78:1200)
const IMG_WOMAN = '/card/call-woman.png' // right tile poster (Figma 78:1201)
const VID_LEFT  = '/desktop/left.mp4'    // left tile video
const VID_RIGHT = '/desktop/right.mp4'   // right tile video

// Native window dimensions (Figma Frame 2147230082)
const WIN_W = 428.248
const WIN_H = 256.54

// ── Window-control traffic light dot ───────────────────────────────
function TrafficDot({ color }: { color: string }) {
  return <span style={{ display: 'block', width: 4.6, height: 4.6, borderRadius: '50%', background: color }} />
}

// ── Bottom-bar control (icon stacked over label) ───────────────────
function CallControl({ icon: Icon, label }: { icon: typeof Mic; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.307 }}>
      <Icon style={{ width: 9, height: 9 }} strokeWidth={2} color="rgba(255,255,255,0.7)" />
      <span style={{ fontFamily: "'Halyard Display','DM Sans',sans-serif", fontSize: 6.46, lineHeight: 1, letterSpacing: -0.1292, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </div>
  )
}

// ── "Press cmd + \ to hide" bar (Figma 78:1226) — animates hide → show ──
// Overlays the top of the video window. Cycle: visible → fade+scale out
// (hidden) → fade+scale back in. Geometry is in native-window coords so the
// bar can sit left-aligned (card) or centered (hero desktop).
type BarGeom = { left: number; top: number; width: number }
const CARD_BAR: BarGeom = { left: 21, top: 35, width: 280.72 }

function HideBar({ left, top, width }: BarGeom) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute',
        left,
        top,
        width,
        borderRadius: 6.1,
        overflow: 'hidden',
        backdropFilter: 'blur(10.17px)',
        WebkitBackdropFilter: 'blur(10.17px)',
        boxShadow: '0 0 12.2px rgba(0,0,0,0.08)',
        transformOrigin: 'center top',
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: [1, 1, 0, 0, 1], scale: [1, 1, 0.9, 0.9, 1] }}
      transition={{ duration: 3.6, times: [0, 0.38, 0.5, 0.85, 1], ease: 'easeInOut', repeat: Infinity }}
    >
      {/* Title row */}
      <div style={{ background: 'rgba(0,0,0,0.8)', padding: 7.12 }}>
        <p style={{ fontFamily: "'Halyard Text','DM Sans',sans-serif", fontSize: 7.12, lineHeight: 1.5, color: 'rgba(221,221,221,0.6)', letterSpacing: -0.213, whiteSpace: 'nowrap', margin: 0 }}>
          Press cmd + \ to hide
        </p>
      </div>
      {/* Icon row */}
      <div style={{ background: 'rgba(0,0,0,0.5)', padding: '5.09px 7.12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8.14, alignItems: 'center' }}>
          <LayoutGrid style={{ width: 8.14, height: 8.14 }} strokeWidth={1.5} color="#dddddd" />
          <Monitor style={{ width: 8.14, height: 8.14 }} strokeWidth={1.5} color="#dddddd" />
          <EyeOff style={{ width: 8.14, height: 8.14 }} strokeWidth={1.5} color="#dddddd" />
          <AudioLines style={{ width: 8.14, height: 8.14 }} strokeWidth={1.5} color="#dddddd" />
        </div>
        <History style={{ width: 8.14, height: 8.14 }} strokeWidth={1.5} color="#dddddd" />
      </div>
    </motion.div>
  )
}

// ── Video-call window ──────────────────────────────────────────────
// Rendered at native size and scaled by `scale`; the outer box reserves
// the scaled layout size so it can be centered/clipped by the parent.
export default function VideoCallWindow({ scale = 1, hideBar = CARD_BAR }: { scale?: number; hideBar?: BarGeom }) {
  return (
    <div style={{ position: 'relative', width: WIN_W * scale, height: WIN_H * scale, flexShrink: 0 }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: WIN_W,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title bar */}
        <div style={{ background: '#000', height: 12.149, borderRadius: '3.037px 3.037px 0 0', display: 'flex', alignItems: 'center', paddingLeft: 4.6, gap: 2.4 }}>
          <TrafficDot color="#FF5F57" />
          <TrafficDot color="#FEBC2E" />
          <TrafficDot color="#28C840" />
        </div>

        {/* Video tiles */}
        <div
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6.454px)',
            WebkitBackdropFilter: 'blur(6.454px)',
            display: 'flex',
            gap: 13.667,
            alignItems: 'center',
            padding: 12.149,
          }}
        >
          <div style={{ width: 195.141, height: 195.141, borderRadius: 7.383, overflow: 'hidden', flexShrink: 0 }}>
            <video src={VID_LEFT} poster={IMG_MAN} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ width: 194.715, height: 195.176, borderRadius: 7.383, overflow: 'hidden', flexShrink: 0 }}>
            <video src={VID_RIGHT} poster={IMG_WOMAN} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
          </div>
        </div>

        {/* Bottom control bar */}
        <div style={{ background: '#000', borderRadius: '0 0 3.691px 3.691px', display: 'flex', gap: 9.228, padding: '4.614px 4.614px', paddingLeft: 6 }}>
          <CallControl icon={Mic} label="Unmute" />
          <CallControl icon={Video} label="Start video" />
        </div>

        {/* Hide/show bar overlay (Figma 78:1226) */}
        <HideBar {...hideBar} />
      </div>
    </div>
  )
}
