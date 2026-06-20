// Figma node 78:1305 "Try This Out" — macOS desktop scene, coded.
// Wallpaper + menu bar + dock (images) with the coded video-call window
// composited on top. The whole native-1244 scene scales to fit its parent.
import { useRef, useState, useLayoutEffect } from 'react'
import VideoCallWindow from './VideoCallWindow'

const IMG_WALLPAPER = '/desktop/wallpaper.png'
const IMG_MENUBAR   = '/desktop/menubar.png'
const IMG_DOCK      = '/desktop/dock.png'

// Native desktop dimensions (Figma 1244×808)
const DW = 1244
const DH = 808

// Video-call window in the desktop (Figma 78:1377): 928×557 at (158, 111).
const WIN_W = 428.248
const WIN_SCALE = 928 / WIN_W // ≈ 2.167
// Hide bar centered in the hero window (Figma 78:1399) — in native-window coords.
const HERO_BAR = { left: 237 / WIN_SCALE, top: 46 / WIN_SCALE, width: 454 / WIN_SCALE }

export default function MacDesktop() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  // Scale the fixed 1244-wide scene to whatever width the parent gives us.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / DW))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ width: '100%', height: DH * scale, position: 'relative', overflow: 'hidden', borderRadius: 14 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: DW, height: DH, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {/* Wallpaper */}
        <img src={IMG_WALLPAPER} alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: DW, height: DH, objectFit: 'cover', display: 'block' }} />

        {/* Menu bar */}
        <img src={IMG_MENUBAR} alt="" draggable={false} style={{ position: 'absolute', top: 0, left: 0, width: DW, height: 30.444, display: 'block' }} />

        {/* Video-call window (Figma 78:1377) */}
        <div style={{ position: 'absolute', left: 158, top: 111 }}>
          <VideoCallWindow scale={WIN_SCALE} hideBar={HERO_BAR} />
        </div>

        {/* Dock — the export includes the drop shadow (logical 1162×98 with
            the 1096×65 base centered), so render at the image's true aspect
            (centered, base flush to the bottom) to avoid stretching the icons. */}
        <img src={IMG_DOCK} alt="" draggable={false} style={{ position: 'absolute', left: 41, top: 726.5, width: 1162, height: 98, display: 'block' }} />
      </div>
    </div>
  )
}
