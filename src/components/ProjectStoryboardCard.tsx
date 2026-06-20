// Figma node 118:1069 — pixel-exact implementation
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

// ── Asset URLs ──────────────────────────────────────────────────
const IMG_001      = 'https://www.figma.com/api/mcp/asset/a4d32da3-2df9-4462-8e3f-9ec24333a0cc'
const KEY_TEXTURE  = 'https://www.figma.com/api/mcp/asset/41a893f3-aacd-42cc-9a82-190602cf20d4'
const IMG_CMD_ICON = 'https://www.figma.com/api/mcp/asset/e50299d6-63c7-4217-93e2-dc14ca91b325'
const IMG_ICON_A   = 'https://www.figma.com/api/mcp/asset/2c776d64-4836-4711-9cba-12198df756b5'
const IMG_ICON_B   = 'https://www.figma.com/api/mcp/asset/57f160e6-e499-47b0-b590-86edbcdd3fd7'
const IMG_ICON_C   = 'https://www.figma.com/api/mcp/asset/bdcc896f-7a4c-4914-9b64-8a5004af31c5'
const IMG_ICON_D   = 'https://www.figma.com/api/mcp/asset/c457f0ec-6268-4433-a26a-3ca59b8bf127'
const IMG_ICON_E   = 'https://www.figma.com/api/mcp/asset/a29b3840-2aff-4d1a-ab84-d576d791682b'

// ── Shared key fill layers ──────────────────────────────────────
function KeyFills({
  radius,
  texture,
  textureSize,
  innerShadow,
  extraBg,
}: {
  radius: number | string
  texture: string
  textureSize: string
  innerShadow: string
  extraBg?: string
}) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' }} />
      {extraBg && <div style={{ position: 'absolute', inset: 0, borderRadius: radius, background: extraBg }} />}
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, backgroundImage: `url("${texture}")`, backgroundSize: textureSize, backgroundPosition: 'top left', mixBlendMode: 'overlay' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, boxShadow: innerShadow }} />
    </>
  )
}

const LBL: CSSProperties = {
  position: 'absolute',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  fontSize: 10.13,
  letterSpacing: 0.1337,
  color: '#d8d8d8',
  textShadow: '0px 0.281px 0.281px rgba(0,0,0,0.1)',
  lineHeight: '10.693px',
  whiteSpace: 'nowrap',
  textAlign: 'center',
}

const KEY_OUTER = '0px 0px 0.281px 0.563px black, 0px 0.844px 0.281px 1.407px rgba(0,0,0,0.4)'
const KEY_INNER = 'inset 0px 0.563px 0.563px 0.563px rgba(255,255,255,0.2), inset 0px 1.126px 0.563px 0.563px rgba(0,0,0,0.25)'
const KEY_TEX_SZ = '576.286px 576.286px'

// ── Loop timing constants (seconds, shared across widget + key glow) ──
// The widget rests on top, glides DOWN, rests, then glides back UP — one
// continuous cycle. Phase boundaries below are shared by the key glows.
const LOOP_DURATION = 3.4
// keyframe times: [start/top, down-start, bottom, up-start, end/top]
const LOOP_TIMES = [0, 0.15, 0.5, 0.62, 1.0] as const

// ── Command key (node 120:1394) ─────────────────────────────────
function CommandKey() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 77.945, height: 61.624, borderRadius: 6.191, overflow: 'hidden', boxShadow: KEY_OUTER }}>
      <KeyFills radius={6.191} texture={KEY_TEXTURE} textureSize={KEY_TEX_SZ} innerShadow={KEY_INNER} />
      <div style={{ position: 'absolute', left: 51.9, top: 9.08, width: 13.394, height: 13.62, transform: 'rotate(180deg)' }}>
        <img src={IMG_CMD_ICON} alt="" style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>
      <p style={{ ...LBL, left: 6.7, top: 42.28, fontSize: 13.366, textAlign: 'left' }}>command</p>
    </div>
  )
}

// ── Flat arrow key (◀ / ▶) — 6.191px corners ───────────────────
function FlatArrow({ label }: { label: string }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 61.906, height: 28.702, borderRadius: 6.191, overflow: 'hidden', boxShadow: KEY_OUTER }}>
      <KeyFills radius={6.191} texture={KEY_TEXTURE} textureSize={KEY_TEX_SZ} innerShadow={KEY_INNER} />
      <p style={{ ...LBL, left: 0, right: 0, top: 9.65 }}>{label}</p>
    </div>
  )
}

// ── Up/Down stacked key — ▼ glows on the way down, ▲ on the way up ─────
function UpDownKey() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 61.389, height: 62.139 }}>
      {/* ▲ top — glows while the widget glides back up */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 61.389, height: 30.078, borderRadius: '6.191px 6.191px 0.563px 0.563px', overflow: 'hidden', boxShadow: KEY_OUTER }}>
        <KeyFills radius="6.191px 6.191px 0.563px 0.563px" texture={KEY_TEXTURE} textureSize={KEY_TEX_SZ} innerShadow={KEY_INNER} extraBg="linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 100%)" />
        <motion.div
          animate={{ opacity: [0, 0, 0.22, 0.22, 0] }}
          transition={{
            duration: LOOP_DURATION,
            times: [0, 0.62, 0.7, 0.95, 1.0],
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{ position: 'absolute', inset: 0, background: 'white', pointerEvents: 'none' }}
        />
      </div>
      {/* ▼ bottom — glows while the widget glides down */}
      <div style={{ position: 'absolute', top: 31.21, left: 0, width: 61.389, height: 30.929, borderRadius: '0.563px 0.563px 6.191px 6.191px', overflow: 'hidden', boxShadow: KEY_OUTER }}>
        <KeyFills radius="0.563px 0.563px 6.191px 6.191px" texture={KEY_TEXTURE} textureSize={KEY_TEX_SZ} innerShadow="inset 0px 1.126px 1.126px 0.281px rgba(255,255,255,0.2)" extraBg="linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.09) 93%, rgba(255,255,255,0) 100%)" />
        {/* press glow: fades in at down-start, out by the bottom rest */}
        <motion.div
          animate={{ opacity: [0, 0, 0.22, 0.22, 0, 0] }}
          transition={{
            duration: LOOP_DURATION,
            times: [0, 0.15, 0.22, 0.45, 0.55, 1.0],
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{ position: 'absolute', inset: 0, background: 'white', pointerEvents: 'none' }}
        />
      </div>
      <p style={{ ...LBL, left: 0, right: 0, top: 9.08 }}>▲</p>
      <p style={{ ...LBL, left: 0, right: 0, top: 42.85 }}>▼︎</p>
    </div>
  )
}

// ── Main card ────────────────────────────────────────────────────
export default function ProjectStoryboardCard() {
  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      border: '1px solid rgba(255,255,255,0.04)',
      borderRadius: 20,
      boxShadow: '0px 12px 24px 0px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
    }}>

      {/* Image — 32px top and left margin, bleeds to right edge */}
      <div style={{ position: 'relative', height: 220, flexShrink: 0, marginTop: 32, marginLeft: 32, borderRadius: '8px 0 0 8px', overflow: 'hidden' }}>
        <img
          src={IMG_001}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          draggable={false}
        />

        {/* Centering shell — left/width positioning only, never animates */}
        <div style={{ position: 'absolute', left: '50%', top: 35, transform: 'translateX(-50%)', width: 'calc(100% - 32px)', maxWidth: 274 }}>
          {/*
            Widget rests on top, glides DOWN, rests at the bottom, glides back UP,
            and repeats — staying visible the whole cycle.
            y:     [-26, -26,  26,  26, -26]
            times: [  0, .15,  .5, .62, 1.0]
          */}
          <motion.div
            animate={{ y: [-26, -26, 26, 26, -26] }}
            transition={{
              duration: LOOP_DURATION,
              times: [...LOOP_TIMES],
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{
              borderRadius: 9.466,
              backdropFilter: 'blur(7.889px)',
              WebkitBackdropFilter: 'blur(7.889px)',
              overflow: 'hidden',
              filter: 'drop-shadow(0px 0px 9.466px rgba(0,0,0,0.08))',
            }}
          >
            <div style={{ background: 'rgba(0,0,0,0.8)', padding: '11.044px' }}>
              <p style={{ fontFamily: "'Halyard Display','DM Sans',sans-serif", fontSize: 11.044, lineHeight: 1.5, color: 'rgba(221,221,221,0.6)', letterSpacing: -0.3313, whiteSpace: 'nowrap', margin: 0 }}>
                Press cmd + \ to hide
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.5)', height: 29.976, padding: '7.889px 11.044px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 12.622, alignItems: 'center' }}>
                {([IMG_ICON_A, IMG_ICON_B, IMG_ICON_C, IMG_ICON_D] as const).map((src, i) => (
                  <img key={i} src={src} alt="" style={{ display: 'block', width: i === 1 ? 11.044 : 12.622, height: i === 1 ? 11.044 : 12.622 }} />
                ))}
              </div>
              <img src={IMG_ICON_E} alt="" style={{ display: 'block', width: 12.622, height: 12.622 }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px 32px 32px', gap: 12 }}>
        <p style={{ fontFamily: "'Halyard Display','DM Sans',sans-serif", fontSize: 22, fontWeight: 400, lineHeight: 1.1, color: 'white', wordBreak: 'break-word', margin: 0 }}>
          Drag, resize and move your dock anywhere
        </p>
        <p style={{ fontFamily: "'Halyard Display','DM Sans',sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.2, color: 'white', margin: 0 }}>
          Nerd bends to your setup, and moving the widget around is just a shortcut away.
        </p>

        {/* Keyboard — scale(0.82) fits ~298px keys into ~245px content */}
        <div style={{ marginTop: 'auto', paddingTop: 12, position: 'relative', height: 51 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', gap: 21.767, alignItems: 'center', transform: 'scale(0.82)', transformOrigin: 'top left' }}>
            <CommandKey />
            <div style={{ display: 'flex', gap: 6.53, alignItems: 'flex-end' }}>
              <FlatArrow label="◀︎" />
              <UpDownKey />
              <FlatArrow label="▶︎" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
