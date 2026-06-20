// Figma node 115:298 — "instant activation" video-call card, pixel-exact
import type { CSSProperties } from 'react'
import VideoCallWindow from './VideoCallWindow'

// ── Assets (saved locally — Figma asset URLs expire after 7 days) ──
const KEY_TEXTURE  = '/card/key-texture.png'
const IMG_CMD_ICON = '/card/cmd-icon.svg'

// The Figma video window is 428×257. The grid cell is shorter, so the
// window is scaled to fit vertically while still bleeding off the right
// edge (second tile clipped) exactly like the design.
const WIN_SCALE = 0.9

// ── Key visual tokens — mirrors ProjectStoryboardCard keys ─────────
const KEY_OUTER = '0px 0px 0.281px 0.563px black, 0px 0.844px 0.281px 1.407px rgba(0,0,0,0.4)'
const KEY_INNER = 'inset 0px 0.563px 0.563px 0.563px rgba(255,255,255,0.2), inset 0px 1.126px 0.563px 0.563px rgba(0,0,0,0.25)'
const KEY_TEX_SZ = '576.286px 576.286px'

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
function KeyFills({
  radius,
  innerShadow,
}: {
  radius: number | string
  innerShadow: string
}) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, backgroundImage: `url("${KEY_TEXTURE}")`, backgroundSize: KEY_TEX_SZ, backgroundPosition: 'top left', mixBlendMode: 'overlay' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, boxShadow: innerShadow }} />
    </>
  )
}

// ── Command key (node 115:307) — ⌘ icon top-right + label ──────────
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

// ── Return key (node 115:458) — wide, right-aligned label ──────────
function ReturnKey() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 135, height: 61.624, borderRadius: 6.191, overflow: 'hidden', boxShadow: KEY_OUTER }}>
      <KeyFills radius={6.191} innerShadow={KEY_INNER} />
      <p style={{ ...LBL, right: 10, top: 42.28, textAlign: 'right' }}>return</p>
    </div>
  )
}

// ── Main card ──────────────────────────────────────────────────────
export default function InstantActivationCard() {
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
      {/* ── Video call window — 32px top & left margin, bleeds off right ── */}
      <div style={{ position: 'relative', marginTop: 32, marginLeft: 32, height: 257 * WIN_SCALE, flexShrink: 0, overflow: 'hidden' }}>
        <VideoCallWindow scale={WIN_SCALE} />
      </div>

      {/* ── Text + keyboard ─────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px 32px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontFamily: "'Halyard Display','DM Sans',sans-serif", fontSize: 28, fontWeight: 400, lineHeight: 1.1, color: '#fff', margin: 0 }}>
            Click ⌘+Enter for an instant activation
          </p>
          <p style={{ fontFamily: "'Halyard Display','DM Sans',sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.2, color: '#fff', margin: 0 }}>
            Nerd pulls the number, the clause, the context for you without switching tabs
          </p>
        </div>

        {/* Keys — command + return, scaled to match the dock card's keys */}
        <div style={{ marginTop: 'auto', paddingTop: 12, position: 'relative', height: 51 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', gap: 21.767, alignItems: 'center', transform: 'scale(0.82)', transformOrigin: 'top left' }}>
            <CommandKey />
            <ReturnKey />
          </div>
        </div>
      </div>
    </div>
  )
}
