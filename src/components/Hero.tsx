import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const IMG_BG = 'https://www.figma.com/api/mcp/asset/fd216004-e594-4135-9487-006bc9afe078'
const IMG_FG = 'https://www.figma.com/api/mcp/asset/c2c26aa8-6571-4589-a5c0-8340abd7afd3'

const NAV_ITEMS = ['How it Works', 'Features', 'Use cases']

const HALYARD = "'Halyard Display', 'DM Sans', sans-serif"
const NAV_SIZE = 'clamp(13px, 1.39vw, 20px)'
const PILL_SIZE = '16px'
const NAV_TRANSITION = 'opacity 220ms cubic-bezier(0.16, 1, 0.3, 1), transform 220ms cubic-bezier(0.16, 1, 0.3, 1)'
const customEase = [0.16, 1, 0.3, 1] as const

// ── SVG wordmark logo from design asset ────────────────────────
function NerdLogo({ height = 22 }: { height?: number }) {
  const width = Math.round(height * 76 / 30)
  return (
    <svg width={width} height={height} viewBox="0 0 76 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: 'block' }}>
      <path d="M7.41211 24.793C7.41211 26.0247 7.72005 26.9199 8.33594 27.4785C8.96615 28.0228 9.91862 28.3594 11.1934 28.4883C11.1934 28.7031 11.1862 28.918 11.1719 29.1328C11.1576 29.3477 11.1504 29.4909 11.1504 29.5625H0.0859375L0.0644531 28.875C0.0644531 28.6458 0.0716146 28.4883 0.0859375 28.4023C0.916667 28.2018 1.53971 28.0228 1.95508 27.8652C2.38477 27.7077 2.73568 27.4499 3.00781 27.0918C3.27995 26.7337 3.41602 26.2324 3.41602 25.5879V13.9434C3.24414 13.6139 2.90755 13.3203 2.40625 13.0625C1.90495 12.7904 1.375 12.5684 0.816406 12.3965C0.272135 12.2103 0 12.1243 0 12.1387L0.0644531 11.4082L5.92969 9.94727L7.24023 9.86133L7.47656 13.3418C8.26432 12.2819 9.26693 11.4082 10.4844 10.7207C11.7161 10.0189 13.041 9.66797 14.459 9.66797C16.5358 9.66797 18.1471 10.2552 19.293 11.4297C20.4388 12.6042 21.0618 14.3587 21.1621 16.6934C21.2051 17.61 21.2266 18.5482 21.2266 19.5078V24.2988C21.2266 25.3444 21.291 26.1035 21.4199 26.5762C21.5488 27.0488 21.7493 27.3783 22.0215 27.5645C22.3079 27.7363 22.7806 27.9225 23.4395 28.123L24.3418 28.4023C24.3561 28.4883 24.3633 28.6458 24.3633 28.875L24.3418 29.5625H13.75C13.75 29.4766 13.7428 29.3333 13.7285 29.1328C13.7142 28.918 13.707 28.7031 13.707 28.4883C13.8073 28.4453 14.0938 28.3594 14.5664 28.2305C15.3255 28.0156 15.9128 27.7865 16.3281 27.543C16.7578 27.2995 17.0156 26.9056 17.1016 26.3613C17.1732 25.946 17.209 25.3945 17.209 24.707V19.916C17.209 18.0111 17.1374 16.543 16.9941 15.5117C16.8652 14.4805 16.5072 13.6354 15.9199 12.9766C15.347 12.3177 14.416 11.9883 13.127 11.9883C12.11 11.9883 11.1289 12.2819 10.1836 12.8691C9.2526 13.4564 8.32878 14.237 7.41211 15.2109V24.793Z" fill="white"/>
      <path d="M26.5263 18.2617C26.512 18.4049 26.5048 18.6126 26.5048 18.8848C26.5048 20.6895 26.8271 22.2005 27.4716 23.418C28.1305 24.6211 29.0042 25.5163 30.0927 26.1035C31.1956 26.6764 32.4274 26.9629 33.788 26.9629C35.5927 26.9629 37.333 26.4473 39.0088 25.416L39.6318 26.0176C39.288 26.8483 38.708 27.5645 37.8916 28.166C37.0895 28.7676 36.1728 29.2259 35.1416 29.541C34.1246 29.8418 33.1364 29.9922 32.1767 29.9922C30.372 29.9922 28.7464 29.5697 27.2998 28.7246C25.8675 27.8796 24.7431 26.6979 23.9267 25.1797C23.1246 23.6615 22.7236 21.9212 22.7236 19.959C22.7236 17.9681 23.1604 16.1921 24.0341 14.6309C24.9078 13.0553 26.068 11.8379 27.5146 10.9785C28.9755 10.1048 30.5367 9.66797 32.1982 9.66797C33.5589 9.66797 34.7835 9.94727 35.872 10.5059C36.9749 11.0501 37.8701 11.8236 38.5576 12.8262C39.2451 13.8145 39.6819 14.9531 39.8681 16.2422C40.0257 16.901 40.1045 17.5098 40.1045 18.0684V18.2617H26.5263ZM34.2607 16.8867C34.8909 16.8581 35.4209 16.7435 35.8505 16.543C35.7503 14.8385 35.3492 13.5065 34.6474 12.5469C33.9599 11.5872 32.9788 11.1074 31.7041 11.1074C30.7731 11.1074 29.9423 11.3867 29.2119 11.9453C28.4957 12.5039 27.9157 13.2487 27.4716 14.1797C27.0276 15.0964 26.7412 16.1061 26.6123 17.209L34.2607 16.8867Z" fill="white"/>
      <path d="M45.9628 24.5996C45.9628 25.2728 46.0344 25.8743 46.1777 26.4043C46.3352 26.9199 46.7004 27.3783 47.2734 27.7793C47.8463 28.1803 48.7057 28.4167 49.8515 28.4883L49.83 29.5625H38.6366C38.6366 29.4479 38.6295 29.2617 38.6152 29.0039C38.6152 28.7461 38.6223 28.5456 38.6366 28.4023L39.3456 28.209C40.1047 28.0085 40.649 27.8223 40.9784 27.6504C41.3079 27.4785 41.5514 27.1777 41.7089 26.748C41.8808 26.304 41.9667 25.6309 41.9667 24.7285V13.9219C41.7805 13.6068 41.4368 13.3203 40.9355 13.0625C40.4342 12.7904 39.9114 12.5684 39.3671 12.3965C38.8372 12.2246 38.5722 12.1458 38.5722 12.1602L38.6152 11.4082L44.33 9.88281H45.5546L45.8984 13.8359C46.7004 12.3607 47.5312 11.3151 48.3905 10.6992C49.2642 10.0833 50.2597 9.77539 51.3769 9.77539C51.9498 9.77539 52.4654 9.89714 52.9238 10.1406C53.3964 10.3698 53.7616 10.6706 54.0195 11.043C54.2916 11.401 54.4277 11.7663 54.4277 12.1387C54.4277 12.3822 54.356 12.7116 54.2128 13.127C54.0839 13.5423 53.8762 13.9076 53.5898 14.2227C53.3176 14.5378 52.981 14.6953 52.58 14.6953C52.1217 14.6953 51.7636 14.5951 51.5058 14.3945C51.248 14.1797 50.983 13.8646 50.7109 13.4492C50.5103 13.1341 50.317 12.8978 50.1308 12.7402C49.9589 12.5827 49.7369 12.5039 49.4648 12.5039C49.0064 12.5039 48.5911 12.64 48.2187 12.9121C47.8606 13.1699 47.5455 13.4922 47.2734 13.8789C47.0012 14.2656 46.6718 14.7812 46.2851 15.4258L45.9628 15.9629V24.5996Z" fill="white"/>
      <path d="M68.0848 4.31836C67.8986 4.0319 67.5334 3.74544 66.9891 3.45898C66.4592 3.17253 65.9364 2.92904 65.4208 2.72852C64.9195 2.52799 64.59 2.40625 64.4325 2.36328L64.4755 1.61133L70.5341 0.150391L72.0809 0V25.2871C72.0809 26.1465 72.4462 26.7624 73.1766 27.1348C73.9214 27.5072 74.7163 27.6934 75.5614 27.6934V28.875L69.8251 29.8203H68.3856L68.1923 26.4902C67.1753 27.6647 66.1083 28.5456 64.9911 29.1328C63.8739 29.7057 62.6779 29.9922 61.4032 29.9922C59.7847 29.9922 58.3023 29.6055 56.9559 28.832C55.6239 28.0443 54.5712 26.9486 53.7977 25.5449C53.0243 24.127 52.6376 22.5013 52.6376 20.668C52.6376 18.5625 53.0673 16.679 53.9266 15.0176C54.8003 13.3561 55.9963 12.0599 57.5145 11.1289C59.0328 10.1979 60.73 9.73242 62.6063 9.73242C63.48 9.73242 64.3322 9.86849 65.163 10.1406C65.9937 10.3984 66.9677 10.7923 68.0848 11.3223V4.31836ZM68.0848 18.6055C68.0848 17.2161 67.9631 16.099 67.7196 15.2539C67.4761 14.3945 66.982 13.6354 66.2372 12.9766C65.6643 12.4753 65.0484 12.0885 64.3895 11.8164C63.7307 11.5299 63.0647 11.3867 62.3915 11.3867C61.26 11.3867 60.2574 11.752 59.3837 12.4824C58.51 13.2129 57.8296 14.1868 57.3427 15.4043C56.87 16.6074 56.6337 17.9108 56.6337 19.3145C56.6337 20.6751 56.87 21.9785 57.3427 23.2246C57.8296 24.4564 58.5529 25.4661 59.5126 26.2539C60.4722 27.0417 61.6324 27.4355 62.993 27.4355C64.0816 27.4355 65.0484 27.1992 65.8934 26.7266C66.7528 26.2396 67.4833 25.5951 68.0848 24.793V18.6055Z" fill="white"/>
    </svg>
  )
}

function NavLinks({ gap = 'clamp(20px, 3.89vw, 56px)', fontSize = NAV_SIZE }: { gap?: string; fontSize?: string }) {
  return (
    <nav>
      <ul className="flex items-center" style={{ gap }}>
        {NAV_ITEMS.map(item => (
          <li key={item}>
            <a
              href="#"
              className="text-white hover:opacity-60 transition-opacity duration-200 whitespace-nowrap"
              style={{ fontFamily: HALYARD, fontSize, fontWeight: 400, lineHeight: 1 }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function DownloadCTA({ fontSize = NAV_SIZE }: { fontSize?: string }) {
  return (
    <button className="group flex items-center gap-2 hover:gap-3 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 bg-primary rounded-full pl-4 pr-1 py-1 flex-shrink-0">
      <span
        className="text-black font-normal whitespace-nowrap"
        style={{ fontFamily: HALYARD, fontSize, fontWeight: 400 }}
      >
        Download Now
      </span>
      <span className="bg-black rounded-full w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
        <ArrowRight className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
      </span>
    </button>
  )
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      {/* ── Layer 1: Background landscape ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={IMG_BG}
          alt=""
          style={{ position: 'absolute', width: '135.28%', height: '126.82%', maxWidth: 'none', left: '-17.64%', top: '-26.79%' }}
          draggable={false}
        />
      </div>

      {/* ── Layer 2: Top blue gradient ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 10, height: '51.37%', background: 'linear-gradient(to top, rgba(17,55,114,0), rgba(0,42,106,0.9))', opacity: 0.9 }}
      />

      {/* ── Layer 3: Bottom black gradient ── */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ zIndex: 10, top: '62.21%', height: '37.79%', background: 'linear-gradient(to bottom, rgba(6,14,13,0), #000000)' }}
      />

      {/* ── Layer 4: "your invisible friend" — Radley, gradient + blur ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ zIndex: 20, left: 'calc(50% - 39.72vw)', top: 'calc(50% - 28.42vh)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: customEase }}
      >
        <p
          style={{
            fontFamily: "'Radley', serif",
            fontSize: 'clamp(32px, 11.39vw, 164px)',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: 'clamp(-14.76px, -1.025vw, -2px)',
            filter: 'blur(2px)',
            background: 'linear-gradient(-83.26deg, rgba(255,255,255,0.2) 9.71%, rgb(255,255,255) 50.21%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            whiteSpace: 'nowrap',
          }}
        >
          your invisible friend
        </p>
      </motion.div>

      {/* ── Layer 5: Foreground image — chair sits in front of text ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 25 }}>
        <img
          src={IMG_FG}
          alt=""
          style={{ position: 'absolute', width: '135.49%', height: '126.96%', maxWidth: 'none', left: '-17.78%', top: '-26.76%' }}
          draggable={false}
        />
      </div>

      {/* ── Layer 6: Second bottom gradient — above FG ── */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ zIndex: 26, top: '62.21%', height: '37.79%', background: 'linear-gradient(to bottom, rgba(6,14,13,0), #000000)' }}
      />

      {/* ── Full-width navbar (not scrolled) ── */}
      <div
        className="fixed left-0 right-0 flex items-center justify-between"
        style={{
          zIndex: 40,
          top: '57px',
          paddingLeft: 'max(24px, calc(50% - 631px))',
          paddingRight: 'max(24px, calc(50% - 631px))',
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? 'translateY(-14px)' : 'translateY(0px)',
          pointerEvents: scrolled ? 'none' : 'auto',
          transition: NAV_TRANSITION,
        }}
      >
        <NerdLogo height={22} />
        <NavLinks />
        <DownloadCTA />
      </div>

      {/* ── Glass morphism pill (scrolled, 32px from top) ── */}
      <div
        className="fixed flex items-center"
        style={{
          zIndex: 40,
          top: '32px',
          left: '50%',
          gap: '24px',
          transform: `translateX(-50%) translateY(${scrolled ? '0px' : '-16px'})`,
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
          background: 'rgba(12,14,26,0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '50px',
          padding: '10px 10px 10px 24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          transition: NAV_TRANSITION,
        }}
      >
        <NerdLogo height={18} />
        <NavLinks gap="20px" fontSize={PILL_SIZE} />
        <DownloadCTA fontSize={PILL_SIZE} />
      </div>

    </section>
  )
}
