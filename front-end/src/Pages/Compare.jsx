import { useMemo, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import Model from "../components/model"
import FreeControls from "../components/FreeControls"
import { FaGamepad, FaInfoCircle, FaArrowLeft } from "react-icons/fa"
import { motion, AnimatePresence } from 'framer-motion'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function useResponsiveScale(base, small, mobile) {
  // lightweight responsive scale (no listener here for brevity)
  if (typeof window === 'undefined') return base
  if (window.innerWidth <= 600) return mobile
  if (window.innerWidth <= 900) return small
  return base
}

function Scene({ path, scale, ambient = 2, directional = 1, freeControl }) {
  const groupRef = useRef(null)
  return (
    <Canvas camera={{ position: [6, 6, 7], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <ambientLight intensity={ambient} />
      <directionalLight position={[10, 10, 10]} intensity={directional} />

      <group ref={groupRef}>
        <Model path={path} scale={scale} />
      </group>

      {freeControl ? <FreeControls objects={groupRef.current ? groupRef.current.children : []} /> : <OrbitControls />}
    </Canvas>
  )
}

export default function ComparePage() {
  const q = useQuery()
  const base = q.get('base') || q.get('planet') || 'Vesta'
  const compare = q.get('compare') || 'Pluto'
  const navigate = useNavigate()
  const [freeLeft, setFreeLeft] = useState(false)
  const [freeRight, setFreeRight] = useState(false)

  const planets = useMemo(() => ({
    Vesta: { path: '/models/vesta.glb', scale: useResponsiveScale(0.001, 0.0007, 0.0005) },
    Pluto: { path: '/models/pluto.glb', scale: useResponsiveScale(0.005, 0.0035, 0.0025) },
    Earth: { path: '/models/earth.glb', scale: useResponsiveScale(2, 1.3, 0.9) },
  }), [])

  const left = planets[compare] || planets['Pluto']
  const right = planets[base] || planets['Vesta']

  // metadata for quick info boxes
  const planetDetails = useMemo(() => ({
    Vesta: {
      exploredDate: '1807-04-29',
      radius: '262 km',
      shape: 'irregular (protoplanetary)',
      heat: 'cold (surface varies)',
      type: 'Asteroid (protoplanet)',
      galaxy: 'Milky Way',
      solarSystem: 'Asteroid Belt (Solar System)'
    },
    Pluto: {
      exploredDate: '2015-07-14 (New Horizons)',
      radius: '1188 km',
      shape: 'nearly spherical (dwarf planet)',
      heat: 'extremely cold (~-229°C)',
      type: 'Dwarf Planet',
      galaxy: 'Milky Way',
      solarSystem: 'Kuiper Belt (Solar System)'
    },
    Earth: {
      exploredDate: 'N/A (home planet)',
      radius: '6,371 km',
      shape: 'oblate spheroid',
      heat: 'varies (avg ~14°C)',
      type: 'Planet',
      galaxy: 'Milky Way',
      solarSystem: 'Solar System'
    }
  }), [])

  const leftMeta = planetDetails[compare] || {}
  const rightMeta = planetDetails[base] || {}

  const [showInfoLeft, setShowInfoLeft] = useState(false)
  const [showInfoRight, setShowInfoRight] = useState(false)

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 12, height: '80vh' }}>
        <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', background: '#000', position: 'relative' }}>
          <div style={{ padding: 8, color: '#fff', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
            <button
              className="icon-btn"
              onClick={() => navigate(`/description?planet=${encodeURIComponent(compare)}`)}
              title={`Back to ${compare} description`}
              style={{ background: 'transparent', border: 'none', color: '#fff', padding: 4, cursor: 'pointer' }}
            >
              <FaArrowLeft />
            </button>
            <button onClick={() => setShowInfoLeft(s => !s)} style={{ fontWeight: 600, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }} aria-expanded={showInfoLeft}>
              {compare}
            </button>

            <AnimatePresence>
              {showInfoLeft && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  style={{ position: 'absolute', left: 12, top: 44, background: 'rgba(0,0,0,0.78)', color: '#fff', padding: '8px 12px', borderRadius: 8, zIndex: 80, maxWidth: 260 }}
                >
                  <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 6 }}>Explored: {leftMeta.exploredDate}</div>
                  <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 6 }}>Type: {leftMeta.type}</div>
                  <div style={{ fontSize: 12 }}>Radius: {leftMeta.radius}</div>
                  <div style={{ fontSize: 12 }}>Shape: {leftMeta.shape}</div>
                  <div style={{ fontSize: 12 }}>Heat: {leftMeta.heat}</div>
                  <div style={{ fontSize: 12 }}>Galaxy: {leftMeta.galaxy}</div>
                  <div style={{ fontSize: 12 }}>System: {leftMeta.solarSystem}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            className="icon-btn"
            onClick={() => setFreeLeft(s => !s)}
            title="Toggle Free Control"
            style={{ position: 'absolute', top: 8, right: 8, zIndex: 70 }}
            aria-pressed={freeLeft}
          >
            <FaGamepad color={freeLeft ? '#9AE66E' : undefined} />
          </button>
          <button
            className="icon-btn"
            onClick={() => navigate(`/details?planet=${encodeURIComponent(compare)}`)}
            title="Details"
            style={{ position: 'absolute', top: 8, right: 48, zIndex: 70 }}
          >
            <FaInfoCircle />
          </button>
          <div style={{ width: '100%', height: 'calc(100% - 32px)' }}>
            <Scene path={left.path} scale={left.scale} ambient={2} directional={0.8} freeControl={freeLeft} />
          </div>
        </div>

        <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', background: '#000', position: 'relative' }}>
          <div style={{ padding: 8, color: '#fff', background: 'rgba(0,0,0,0.6)', position: 'relative' }}>
            <button onClick={() => setShowInfoRight(s => !s)} style={{ fontWeight: 600, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }} aria-expanded={showInfoRight}>
              {base}
            </button>

            <AnimatePresence>
              {showInfoRight && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  style={{ position: 'absolute', left: 12, top: 44, background: 'rgba(0,0,0,0.78)', color: '#fff', padding: '8px 12px', borderRadius: 8, zIndex: 80, maxWidth: 260 }}
                >
                  <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 6 }}>Explored: {rightMeta.exploredDate}</div>
                  <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 6 }}>Type: {rightMeta.type}</div>
                  <div style={{ fontSize: 12 }}>Radius: {rightMeta.radius}</div>
                  <div style={{ fontSize: 12 }}>Shape: {rightMeta.shape}</div>
                  <div style={{ fontSize: 12 }}>Heat: {rightMeta.heat}</div>
                  <div style={{ fontSize: 12 }}>Galaxy: {rightMeta.galaxy}</div>
                  <div style={{ fontSize: 12 }}>System: {rightMeta.solarSystem}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            className="icon-btn"
            onClick={() => setFreeRight(s => !s)}
            title="Toggle Free Control"
            style={{ position: 'absolute', top: 8, right: 8, zIndex: 70 }}
            aria-pressed={freeRight}
          >
            <FaGamepad color={freeRight ? '#9AE66E' : undefined} />
          </button>
          <button
            className="icon-btn"
            onClick={() => navigate(`/details?planet=${encodeURIComponent(base)}`)}
            title="Details"
            style={{ position: 'absolute', top: 8, right: 48, zIndex: 70 }}
          >
            <FaInfoCircle />
          </button>
          <div style={{ width: '100%', height: 'calc(100% - 32px)' }}>
            <Scene path={right.path} scale={right.scale} ambient={2} directional={1.2} freeControl={freeRight} />
          </div>
        </div>
      </div>
    </div>
  )
}
