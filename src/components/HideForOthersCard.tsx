// Figma node 78:1111 — "hides for others" privacy card, pixel-exact
import { motion, useTime, useTransform, easeInOut } from 'framer-motion'
import { LayoutGrid, Monitor, EyeOff, AudioLines } from 'lucide-react'
import type { CSSProperties } from 'react'

// ── Assets (saved locally — Figma asset URLs expire after 7 days) ──
const IMG_WALLPAPER = '/card/hide-wallpaper.png' // Figma 78:1112
const KEY_TEXTURE   = '/card/key-texture.png'
const IMG_CMD_ICON  = '/card/cmd-icon.svg'

// ── Key visual tokens — mirrors sibling cards' keys ────────────────
const KEY_OUTER = '0px 0px 0.281px 0.563px black, 0px 0.844px 0.281px 1.407px rgba(0,0,0,0.4)'
const KEY_INNER = 'inset 0px 0.563px 0.563px 0.563px rgba(255,255,255,0.2), inset 0px 1.126px 0.563px 0.563px rgba(0,0,0,0.25)'
const KEY_TEX_SZ = '576.286px 576.286px'

// ── "Selected / hidden" pulse — one shared opacity value drives both
//    the dashed outline and the Monitor icon so they fade in and out
//    at the exact same time ───────────────────────────────────────────
const PULSE_MS = 2600

const LBL: CSSProperties = {
  position: 'absolute',
  fontFamily: "'Inter', -apple-system, sans-serif",
  fontWeight: 500,
  fontSize: 13.366,
  letterSpacing: 0.1337,
  color: '#d8d8d8',
  textShadow: '0px 0.281px 0.281px rgba(0,0,0,0.1)',
  lineHeight: '10.693px',
  whiteSpace: 'nowrap',
  margin: 0,
}

// Shared key fill layers (gradient + texture overlay + inner highlight)
function KeyFills({ radius, innerShadow }: { radius: number | string; innerShadow: string }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, backgroundImage: `url("${KEY_TEXTURE}")`, backgroundSize: KEY_TEX_SZ, backgroundPosition: 'top left', mixBlendMode: 'overlay' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, boxShadow: innerShadow }} />
    </>
  )
}

// ── Command key (node 78:1118) — ⌘ icon top-right + label ──────────
function CommandKey() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 77.945, height: 61.624, borderRadius: 6.191, overflow: 'hidden', boxShadow: KEY_OUTER }}>
      <KeyFills radius={6.191} innerShadow={KEY_INNER} />
      <div style={{ position: 'absolute', left: 51.9, top: 9.08, width: 13.394, height: 13.62, transform: 'rotate(180deg)' }}>
        <img src={IMG_CMD_ICON} alt="" style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>
      <p style={{ ...LBL, left: 6.7, top: 42.28, textAlign: 'left' }}>command</p>
    </div>
  )
}

// ── Letter key (node 78:1122) — single centered glyph ──────────────
function LetterKey({ label }: { label: string }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 61.279, height: 61, borderRadius: 6.128, overflow: 'hidden', boxShadow: KEY_OUTER }}>
      <KeyFills radius={6.128} innerShadow={KEY_INNER} />
      <p style={{ ...LBL, left: 0, right: 0, top: 25, textAlign: 'center', fontSize: 17.826 }}>{label}</p>
    </div>
  )
}

// ── Main card ──────────────────────────────────────────────────────
export default function HideForOthersCard() {
  // Single source of truth for the selection pulse — both the dashed
  // outline and the solid Monitor read this same opacity, derived from
  // one clock so they fade in and out together with no drift.
  const time = useTime()
  const progress = useTransform(time, (t) => (t % PULSE_MS) / PULSE_MS)
  const selectOpacity = useTransform(progress, [0, 0.28, 0.72, 1], [0, 1, 1, 0], { ease: easeInOut })

  return (
    <div
      style={{
        backgroundColor: '#1e1e1e',
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: 20,
        boxShadow: '0px 12px 24px 0px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* ── Wallpaper — 32px top & left margin, bleeds off right edge ── */}
      <div style={{ position: 'relative', height: 220, flexShrink: 0, marginTop: 32, marginLeft: 32, borderRadius: '8px 0 0 8px', overflow: 'hidden' }}>
        <img
          src={IMG_WALLPAPER}
          alt=""
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Glass "hide" widget — near-native size, anchored left so the bar
            bleeds off the right edge and is shown only partially (Figma 78:1164/65) */}
        <div style={{ position: 'absolute', left: 24, top: 38, width: 520 }}>
          {/* Animated dashed selection outline (Figma 78:1164) — fades in/out.
              SVG rect gives a precise 7/7 dash with clean rounded corners. */}
          <motion.svg
            aria-hidden
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: -12, width: 'calc(100% + 24px)', height: 'calc(100% + 24px)', overflow: 'visible', pointerEvents: 'none', opacity: selectOpacity }}
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="18"
              ry="18"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="7 7"
            />
          </motion.svg>

          <div
            style={{
              position: 'relative',
              borderRadius: 16.348,
              backdropFilter: 'blur(27.25px)',
              WebkitBackdropFilter: 'blur(27.25px)',
              overflow: 'hidden',
              filter: 'drop-shadow(0px 0px 32.7px rgba(0,0,0,0.08))',
            }}
          >
            {/* Title row */}
            <div style={{ background: 'rgba(0,0,0,0.8)', padding: '19.072px' }}>
              <p style={{ fontFamily: "'Halyard Text','DM Sans',sans-serif", fontSize: 19.072, lineHeight: 1.5, color: 'rgba(221,221,221,0.6)', letterSpacing: -0.57, whiteSpace: 'nowrap', margin: 0 }}>
                Press cmd + \ to hide
              </p>
            </div>
            {/* Icon row — Monitor crossfades to solid white in sync with
                the dashed outline (Figma 78:1175) */}
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '13.62px 19.072px', display: 'flex', gap: 21.8, alignItems: 'center' }}>
              <LayoutGrid style={{ width: 19, height: 19 }} strokeWidth={1.5} color="#dddddd" />
              <span style={{ position: 'relative', width: 19, height: 19, display: 'inline-flex' }}>
                <Monitor style={{ width: 19, height: 19 }} strokeWidth={1.5} color="#dddddd" />
                <motion.span
                  aria-hidden
                  style={{ position: 'absolute', inset: 0, display: 'inline-flex', opacity: selectOpacity }}
                >
                  <Monitor style={{ width: 19, height: 19 }} strokeWidth={1.5} color="#ffffff" fill="#ffffff" />
                </motion.span>
              </span>
              <EyeOff style={{ width: 19, height: 19 }} strokeWidth={1.5} color="#dddddd" />
              <AudioLines style={{ width: 19, height: 19 }} strokeWidth={1.5} color="#dddddd" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Text + keyboard ─────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px 32px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontFamily: "'Halyard Display','DM Sans',sans-serif", fontSize: 28, fontWeight: 400, lineHeight: 1.1, letterSpacing: -0.5, color: '#fff', margin: 0 }}>
            Hides for others but it still will be visible for you
          </p>
          <p style={{ fontFamily: "'Halyard Display','DM Sans',sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.2, letterSpacing: -0.5, color: '#fff', margin: 0 }}>
            Nerd pulls the number, the clause, the context for you without switching tabs
          </p>
        </div>

        {/* Keys — command + H, scaled to match the sibling cards' keys */}
        <div style={{ marginTop: 'auto', paddingTop: 12, position: 'relative', height: 51 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', gap: 21.767, alignItems: 'center', transform: 'scale(0.82)', transformOrigin: 'top left' }}>
            <CommandKey />
            <LetterKey label="H" />
          </div>
        </div>
      </div>
    </div>
  )
}
