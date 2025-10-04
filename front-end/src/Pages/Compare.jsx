import { useMemo, useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Model from "../components/model";
import FreeControls from "../components/FreeControls";
import { FaGamepad, FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function useResponsiveScale(base, small, mobile) {
  if (typeof window === "undefined") return base;
  if (window.innerWidth <= 600) return mobile;
  if (window.innerWidth <= 900) return small;
  return base;
}

function Scene({ path, scale, ambient = 2, directional = 1, freeControl }) {
  const groupRef = useRef(null);
  return (
    <Canvas camera={{ position: [6, 6, 7], fov: 50 }} style={{ width: "100%", height: "100%" }}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <ambientLight intensity={ambient} />
      <directionalLight position={[10, 10, 10]} intensity={directional} />
      <group ref={groupRef}>
        <Model path={path} scale={scale} />
      </group>
      {freeControl ? <FreeControls objects={groupRef.current ? groupRef.current.children : []} /> : <OrbitControls />}
    </Canvas>
  );
}

export default function ComparePage() {
  const q = useQuery();
  const baseName = q.get("base") || q.get("planet") || "Vesta";
  const compareName = q.get("compare") || "Pluto";
  const navigate = useNavigate();
  const [freeLeft, setFreeLeft] = useState(false);
  const [freeRight, setFreeRight] = useState(false);
  const [planetsData, setPlanetsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPlanets = async () => {
    try {
      const res = await fetch("http://localhost:7170/api/getplanets");
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to fetch planets");
      }
      const data = await res.json();
      return data.allPlanets || [];
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  const normalizeName = (name) => (name || "").replace(/[^a-zA-Z]/g, "").toLowerCase();

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      const allPlanets = await getPlanets();
      setPlanetsData(allPlanets);
      setLoading(false);
    };
    fetchPlanets();
  }, []);

  const planets = useMemo(() => ({
    Vesta: { path: "/models/vesta.glb", scale: useResponsiveScale(0.001, 0.0007, 0.0005) },
    Pluto: { path: "/models/pluto.glb", scale: useResponsiveScale(0.005, 0.0035, 0.0025) },
    Mars: { path: "/models/mars.glb", scale: useResponsiveScale(0.004, 0.0025, 0.0018) },
    Ceres: { path: "/models/ceres.glb", scale: useResponsiveScale(0.005, 0.005, 0.003) },
    Jupiter: { path: "/models/jupiter.glb", scale: useResponsiveScale(0.007, 0.0044, 0.0029) },
    Haumea: { path: "/models/haumea.glb", scale: useResponsiveScale(0.0035, 0.0022, 0.0016) },
    Eris: { path: "/models/eris.glb", scale: useResponsiveScale(0.0045, 0.003, 0.0022) },
    Neptune: { path: "/models/neptune.glb", scale: useResponsiveScale(0.006, 0.0044, 0.003) },
    Earth: { path: "/models/earth.glb", scale: useResponsiveScale(2, 1.3, 0.9) },
  }), []);

  const leftPlanet = planets[baseName] || planets["Vesta"];
  const rightPlanet = planets[compareName] || planets["Pluto"];

  const leftData = planetsData.find(p => normalizeName(p.name) === normalizeName(baseName)) || {};
  const rightData = planetsData.find(p => normalizeName(p.name) === normalizeName(compareName)) || {};

  const [showInfoLeft, setShowInfoLeft] = useState(false);
  const [showInfoRight, setShowInfoRight] = useState(false);

  if (loading) return <div>Loading planets...</div>;
  if (error) return <div>{error}</div>;

  const renderPlanetInfo = (data) => (
    <>
      <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 6 }}>Type: {data.type || "N/A"}</div>
      <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 6 }}>Discovered by: {data.discovery?.discoverer || "Unknown"}</div>
      <div style={{ fontSize: 12 }}>Discovery year: {data.discovery?.year || "Unknown"}</div>
      <div style={{ fontSize: 12 }}>Status: {data.status?.current || "Unknown"}</div>
      <div style={{ fontSize: 12 }}>Previously: {data.status?.previous || "Unknown"}</div>
      <div style={{ fontSize: 12 }}>Diameter (km): {data.physical?.diameter_km || "Unknown"}</div>
      <div style={{ fontSize: 12 }}>Mass (kg): {data.physical?.mass_kg || "Unknown"}</div>
      <div style={{ fontSize: 12 }}>Moons: {data.moons?.map(m => m.name).join(", ") || "None"}</div>
      {data.media?.video_url && <img src={data.media.video_url} alt={data.name} style={{ width: "100%", marginTop: 4 }} />}
    </>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 12, height: "80vh" }}>
        {/* Left Planet */}
        <div style={{ flex: 1, borderRadius: 12, overflow: "hidden", background: "#000", position: "relative" }}>
          <div style={{ padding: 8, color: "#fff", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
            <button
              className="icon-btn"
              onClick={() => navigate(`/description?planet=${encodeURIComponent(baseName)}`)}
              title={`Back to ${baseName} description`}
              style={{ background: "transparent", border: "none", color: "#fff", padding: 4, cursor: "pointer" }}
            >
              <FaArrowLeft />
            </button>
            <button onClick={() => setShowInfoLeft(s => !s)} style={{ fontWeight: 600, background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>
              {baseName}
            </button>
            <AnimatePresence>
              {showInfoLeft && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  style={{ position: "absolute", left: 12, top: 44, background: "rgba(0,0,0,0.78)", color: "#fff", padding: "8px 12px", borderRadius: 8, zIndex: 80, maxWidth: 260 }}
                >
                  {renderPlanetInfo(leftData)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className="icon-btn" onClick={() => setFreeLeft(s => !s)} title="Toggle Free Control" style={{ position: "absolute", top: 8, right: 8, zIndex: 70 }} aria-pressed={freeLeft}>
            <FaGamepad color={freeLeft ? "#9AE66E" : undefined} />
          </button>
          <div style={{ width: "100%", height: "calc(100% - 32px)" }}>
            <Scene path={leftPlanet.path} scale={leftPlanet.scale} ambient={2} directional={0.8} freeControl={freeLeft} />
          </div>
        </div>

        {/* Right Planet */}
        <div style={{ flex: 1, borderRadius: 12, overflow: "hidden", background: "#000", position: "relative" }}>
          <div style={{ padding: 8, color: "#fff", background: "rgba(0,0,0,0.6)", position: "relative" }}>
            <button onClick={() => setShowInfoRight(s => !s)} style={{ fontWeight: 600, background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>
              {compareName}
            </button>
            <AnimatePresence>
              {showInfoRight && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  style={{ position: "absolute", left: 12, top: 44, background: "rgba(0,0,0,0.78)", color: "#fff", padding: "8px 12px", borderRadius: 8, zIndex: 80, maxWidth: 260 }}
                >
                  {renderPlanetInfo(rightData)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className="icon-btn" onClick={() => setFreeRight(s => !s)} title="Toggle Free Control" style={{ position: "absolute", top: 8, right: 8, zIndex: 70 }} aria-pressed={freeRight}>
            <FaGamepad color={freeRight ? "#9AE66E" : undefined} />
          </button>
          <div style={{ width: "100%", height: "calc(100% - 32px)" }}>
            <Scene path={rightPlanet.path} scale={rightPlanet.scale} ambient={2} directional={1.2} freeControl={freeRight} />
          </div>
        </div>
      </div>
    </div>
  );
}
