import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"
import FreeControls from "../components/FreeControls"
import { FaGamepad, FaCamera, FaFacebook, FaTwitter, FaInstagram, FaInfoCircle, FaBalanceScale, FaArrowLeft } from "react-icons/fa"
import { FaSave } from "react-icons/fa"
import "../css/Description.css"
import Model from "../components/model"

// FreeControls is provided by shared component



// Scene component with toggle controls
function Scene({ children, ambient = 2, directional = 1, freeControl }) {
  const [objects, setObjects] = useState([])

  return (
    <Canvas camera={{ position: [6, 6, 7], fov: 50 }}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <ambientLight intensity={ambient} />
      <directionalLight position={[10, 10, 10]} intensity={directional} />

      <group ref={(ref) => ref && setObjects(ref.children)}>{children}</group>

      {freeControl ? <FreeControls objects={objects} /> : <OrbitControls />}
    </Canvas>
  )
}

function ImageBox({ src, caption }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      className={`image-box ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <img src={src} alt={caption} />
      {expanded && <p className="image-caption">{caption}</p>}
    </div>
  )
}

// Responsive model scale hook
function useResponsiveScale(base, small, mobile) {
  const [scale, setScale] = useState(base);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) setScale(mobile);
      else if (window.innerWidth <= 900) setScale(small);
      else setScale(base);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [base, small, mobile]);
  return scale;
}


function DescriptionCarousel() {
  const [freeControl, setFreeControl] = useState(false)
  const [planetShot, setPlanetShot] = useState(null)
  const [showPlanetBanner, setShowPlanetBanner] = useState(false)
  const [animating, setAnimating] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [compareOpen, setCompareOpen] = useState(false);
    const canvasRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  // track the currently visible slide index (keeps label in sync with carousel)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Map planet names to slide indices
  const planetToIndex = {
    Vesta: 0,
    Pluto: 1,
    Mars: 2,
    Ceres: 3,
      Jupiter: 4,
      Haumea: 5,
      Eris: 6,
      Neptune: 7,
    };

  const planets = ["Vesta", "Pluto", "Mars", "Ceres", "Jupiter", "Haumea", "Eris", "Neptune"];

  // --- API fetch for planets media ---
  const [apiPlanetsMap, setApiPlanetsMap] = useState({});
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setApiLoading(true);
    fetch("http://localhost:7170/api/getplanets")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        const list = data?.allPlanets || data?.allplanets || data || [];
        const map = {};
        if (Array.isArray(list)) {
          for (const p of list) {
            if (p && p.name) map[p.name] = p;
          }
        }
        setApiPlanetsMap(map);
        setApiError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        console.warn('Failed to fetch planets:', err);
        setApiError(err.message || String(err));
        setApiPlanetsMap({});
      })
      .finally(() => {
        if (!mounted) return;
        setApiLoading(false);
      });
    return () => { mounted = false };
  }, []);

  function getPlanetData(name) {
    if (!name) return null;
    const direct = apiPlanetsMap[name];
    if (direct) return direct;
    // case-insensitive fallback
    const lower = name.toLowerCase();
    return Object.values(apiPlanetsMap).find(p => p && p.name && p.name.toLowerCase() === lower) || null;
  }

  function getImageFor(planetName, localFallback) {
    const p = getPlanetData(planetName);
    if (p && p.media) return p.media.video_url || p.media.image_url || p.media.url || localFallback;
    return localFallback;
  }

  function MediaList({ planetName }) {
    const p = getPlanetData(planetName);
    if (apiLoading) return <div className="mt-2 text-sm text-gray-300">Loading media...</div>;
    if (apiError) return <div className="mt-2 text-sm text-red-400">Failed to load media: {apiError}</div>;
    if (!p || !p.media) return <div className="mt-2 text-sm text-gray-400">No media metadata available.</div>;
    const entries = Object.entries(p.media || {});
    if (entries.length === 0) return <div className="mt-2 text-sm text-gray-400">No media metadata available.</div>;
    return (
      <div className="mt-3 bg-gray-900 text-gray-100 p-3 rounded grid gap-2">
        {entries.map(([k, v]) => (
          <div key={k} className="flex flex-col sm:flex-row sm:items-start gap-2">
            <div className="font-semibold text-sm text-gray-300 w-32">{k}</div>
            <div className="text-sm break-words">
              {typeof v === 'string' && v.startsWith('http') ? (
                <a href={v} target="_blank" rel="noreferrer" className="text-blue-300 underline">{v}</a>
              ) : typeof v === 'string' ? (
                <span>{v}</span>
              ) : Array.isArray(v) ? (
                <div className="flex flex-col gap-1">{v.map((it, i) => <div key={i} className="text-sm">• {typeof it === 'string' ? it : JSON.stringify(it)}</div>)}</div>
              ) : typeof v === 'object' && v !== null ? (
                <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(v, null, 2)}</pre>
              ) : (
                <span>{String(v)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Responsive model scales
  const vestaScale = useResponsiveScale(0.001, 0.0007, 0.0005);
  const plutoScale = useResponsiveScale(0.005, 0.0035, 0.0025);
  const marsScale = useResponsiveScale(0.004, 0.0025, 0.0018);
  const ceresScale = useResponsiveScale(0.005, 0.005, 0.003);
    const jupiterScale = useResponsiveScale(0.007, 0.0044, 0.0029);
    const haumeaScale = useResponsiveScale(0.0035, 0.0022, 0.0016);
    const erisScale = useResponsiveScale(0.0045, 0.003, 0.0022);
    const neptuneScale = useResponsiveScale(0.006, 0.0044, 0.003);

  // Parse ?slide= or ?planet= from query string
  function getSlideFromQuery() {
    const params = new URLSearchParams(location.search);
    const planet = params.get("planet");
    if (planet && planetToIndex.hasOwnProperty(planet)) {
      return planetToIndex[planet];
    }
  const idx = parseInt(params.get("slide"), 10);
  return isNaN(idx) ? 0 : Math.max(0, Math.min(7, idx));
  }

  // keep currentIndex in sync with URL/initial load
  useEffect(() => {
    setCurrentIndex(getSlideFromQuery())
    // also listen for bootstrap slide events to update the label when user navigates the carousel
    const el = carouselRef.current
    if (!el) return
    const handler = () => {
      const items = el.querySelectorAll('.carousel-item')
      let idx = 0
      items.forEach((it, i) => {
        if (it.classList.contains('active')) idx = i
      })
      setCurrentIndex(idx)
    }
    // attach event if bootstrap present
    if (window && window.bootstrap && el.addEventListener) {
      el.addEventListener('slid.bs.carousel', handler)
    }
    // fallback: also observe DOM changes to detect class changes
    const mo = new MutationObserver(handler)
    mo.observe(el, { attributes: true, subtree: true, attributeFilter: ['class'] })
    return () => {
      if (window && window.bootstrap && el.removeEventListener) el.removeEventListener('slid.bs.carousel', handler)
      mo.disconnect()
    }
  }, [carouselRef, location])

  // Touch swipe for mobile (run only after ref is set and in browser)
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth > 600) return;
    const carousel = carouselRef.current;
    if (!carousel) return;
    let startX = null;
    function handleTouchStart(e) {
      if (e.touches.length === 1) startX = e.touches[0].clientX;
    }
    function handleTouchEnd(e) {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      if (Math.abs(dx) > 40) {
        // Swipe left: next, right: prev
        const currentIdx = getSlideFromQuery();
        let nextIdx = currentIdx;
        if (dx < 0) nextIdx = Math.min(7, currentIdx + 1);
        else if (dx > 0) nextIdx = Math.max(0, currentIdx - 1);
        if (nextIdx !== currentIdx) {
          window.location.search = `?slide=${nextIdx}`;
        }
      }
      startX = null;
    }
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchend', handleTouchEnd);
    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchend', handleTouchEnd);
    };
    // eslint-disable-next-line
  }, [carouselRef, location]);

  useEffect(() => {
    // On mount or location change, jump to the correct slide
    const idx = getSlideFromQuery();
    if (carouselRef.current) {
      // Bootstrap carousel API
      // eslint-disable-next-line no-undef
      if (window.bootstrap && window.bootstrap.Carousel) {
        const carousel = window.bootstrap.Carousel.getOrCreateInstance(carouselRef.current);
        carousel.to(idx);
      } else {
        // fallback: set active class manually
        const items = carouselRef.current.querySelectorAll('.carousel-item');
        items.forEach((el, i) => {
          el.classList.toggle('active', i === idx);
        });
      }
    }
  }, [location]);

  // Search bar state
  const [search, setSearch] = useState("");
  // Search handler: on Enter, go to planet if found
  function handleSearch(e) {
    e.preventDefault();
    const planet = search.trim().toLowerCase();
  if (planet === "vesta") window.location.search = '?slide=0';
  else if (planet === "pluto") window.location.search = '?slide=1';
  else if (planet === "mars") window.location.search = '?slide=2';
  else if (planet === "ceres") window.location.search = '?slide=3';
  else if (planet === "jupiter") window.location.search = '?slide=4';
  else if (planet === "haumea") window.location.search = '?slide=5';
  else if (planet === "eris") window.location.search = '?slide=6';
  else if (planet === "neptune") window.location.search = '?slide=7';
    // else do nothing or show not found (not implemented)
  }

  // Take a screenshot of the planet in the currently visible carousel slide
  async function handlePlanetShot() {
    let canvas = null;
    if (carouselRef.current) {
      // Always get the canvas from the active carousel-item
      const activeItem = carouselRef.current.querySelector('.carousel-item.active');
      if (activeItem) {
        canvas = activeItem.querySelector('canvas');
      }
    }
    // Last fallback: any canvas (should rarely happen)
    if (!canvas) canvas = document.querySelector('canvas');
    if (!canvas) {
      alert('No canvas found for screenshot.');
      return;
    }
    // Wait for next animation frame to ensure render is complete
    await new Promise((resolve) => requestAnimationFrame(resolve));
    try {
      const dataUrl = canvas.toDataURL('image/png');
      // Check for blank/empty image (dataUrl is a PNG header only)
      if (dataUrl.length < 200) {
        alert('Screenshot failed: blank image. Try again after the scene loads.');
        return;
      }
      setPlanetShot(dataUrl);
      setShowPlanetBanner(true);
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    } catch (e) {
      // CORS error: SecurityError: Failed to execute 'toDataURL' on 'HTMLCanvasElement'
      if (e instanceof DOMException && e.name === 'SecurityError') {
        alert('Screenshot failed due to CORS. Please ensure all models/textures are loaded from the same origin or with proper CORS headers.');
      } else {
        alert('Screenshot failed.');
      }
    }
  }

  // Save the planet shot image
  function savePlanetShot() {
    if (!planetShot) return;
    const params = new URLSearchParams(location.search);
    let planet = params.get("planet");
    let idx = getSlideFromQuery();
    if (!planet || !planetToIndex.hasOwnProperty(planet)) {
      // fallback to index name
      planet = Object.keys(planetToIndex).find(key => planetToIndex[key] === idx) || 'planet';
    }
    const link = document.createElement('a');
    link.href = planetShot;
    link.download = `${planet}-screenshot.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Social share handlers for planet shot
  function sharePlanetOn(platform) {
    if (!planetShot) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out my planet snapshot!');
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    } else if (platform === 'instagram') {
      alert('Instagram does not support direct web sharing. Save the image and upload manually.');
    }
  }
  return (
    <div>
      {/* Fixed search bar for desktop only */}
      <form className="planet-search-bar planet-search-bar-fixed" onSubmit={handleSearch} autoComplete="off">
        <input
          type="text"
          placeholder="Search planet..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search planet"
        />
      </form>

      {/* Carousel */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="false" ref={carouselRef}>
        <div style={{ position: 'absolute', left: 12, top: 12, zIndex: 80, display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            className="icon-btn"
            onClick={() => navigate('/game')}
            title="Back to game"
            style={{ background: 'transparent', border: 'none', color: '#fff', padding: 4, cursor: 'pointer' }}
          >
            <FaArrowLeft />
          </button>
          <div style={{ color: '#fff', fontWeight: 700, pointerEvents: 'none' }}>
            {planets[currentIndex] || planets[0]}
          </div>
        </div>
        {/* Top-right corner icons container */}
        <div className="icons">
          <button
            className={`icon-btn${animating ? '' : ''}`}
            onClick={() => setFreeControl(!freeControl)}
            title="Toggle Free Control"
          >
            <FaGamepad size={24} />
          </button>

          <button
            className={`icon-btn${animating ? ' animating' : ''}`}
            onClick={handlePlanetShot}
            title="Take Planet Photo"
          >
            <FaCamera size={22} />
          </button>

          {(() => {
            const currentPlanet = planets[currentIndex] || planets[0];
            return (
              <button
                className={`icon-btn`}
                onClick={() => navigate(`/details?planet=${encodeURIComponent(currentPlanet)}`)}
                title="Details"
              >
                <FaInfoCircle size={20} />
              </button>
            )
          })()}

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              className={`icon-btn`}
              onClick={() => setCompareOpen(open => !open)}
              title="Compare"
              aria-expanded={compareOpen}
            >
              <FaBalanceScale size={20} />
            </button>

            {compareOpen && (() => {
              const currentPlanet = planets[currentIndex] || planets[0];
              const options = planets.filter(p => p !== currentPlanet);
              return (
                <ul className="compare-dropdown" style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: 8,
                  background: 'rgba(0,0,0,0.85)',
                  color: '#fff',
                  borderRadius: 8,
                  padding: '6px 8px',
                  listStyle: 'none',
                  minWidth: 140,
                  zIndex: 60
                }}>
                  {options.map((p) => (
                    <li key={p} style={{ padding: '6px 8px', cursor: 'pointer' }} onClick={() => {
                      setCompareOpen(false);
                      const base = encodeURIComponent(currentPlanet);
                      const compare = encodeURIComponent(p);
                      navigate(`/compare?base=${base}&compare=${compare}`);
                    }}>{p}</li>
                  ))}
                </ul>
              )
            })()}
          </div>
        </div>

        {/* Planet photo banner */}
        {showPlanetBanner && planetShot && (
          <div className="planet-photo-banner">
            <div className="film-frame planet-film-frame">
              <img src={planetShot} alt="Planet Snapshot" className="screenshot-img" />
            </div>
            <div className="planet-socials">
              <button onClick={() => savePlanetShot()} title="Save Image"><FaSave size={22} /></button>
              <button onClick={() => sharePlanetOn('facebook')} title="Share on Facebook"><FaFacebook size={22} /></button>
              <button onClick={() => sharePlanetOn('twitter')} title="Share on Twitter"><FaTwitter size={22} /></button>
              <button onClick={() => sharePlanetOn('instagram')} title="Share on Instagram"><FaInstagram size={22} /></button>
              <button className="banner-close-btn-social" onClick={() => setShowPlanetBanner(false)} title="Close">×</button>
            </div>
          </div>
        )}

        <div className="carousel-inner">
          {/* Vesta */}
          <div className="carousel-item active" ref={canvasRefs[0]}>
            <div className="canvas-wrapper">
              {/* Inline search bar for mobile/tablet only */}
              <form className="planet-search-bar planet-search-bar-inline" onSubmit={handleSearch} autoComplete="off">
                <input
                  type="text"
                  placeholder="Search planet..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search planet"
                />
              </form>
              <Scene ambient={3} directional={0.8} freeControl={freeControl}>
                <Model path="/models/vesta.glb" scale={vestaScale} />
              </Scene>
              <div className="mt-3">
                <ImageBox src={getImageFor('Vesta', '/images/vesta.jpg')} caption="Vesta Overview" />
                <MediaList planetName="Vesta" />
              </div>
            </div>
          </div>

          {/* Pluto */}
          <div className="carousel-item" ref={canvasRefs[1]}>
            <div className="canvas-wrapper">
              {/* Inline search bar for mobile/tablet only */}
              <form className="planet-search-bar planet-search-bar-inline" onSubmit={handleSearch} autoComplete="off">
                <input
                  type="text"
                    placeholder="Search planet..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search planet"
                />
              </form>
              <Scene ambient={2.5} directional={0.5} freeControl={freeControl}>
                <Model path="/models/pluto.glb" scale={plutoScale} />
              </Scene>
              <div className="mt-3">
                <ImageBox src={getImageFor('Pluto', '/images/pluto.jpg')} caption="Pluto Overview" />
                <MediaList planetName="Pluto" />
              </div>
            </div>
          </div>

          {/* Mars */}
          <div className="carousel-item" ref={canvasRefs[2]}>
            <div className="canvas-wrapper">
              {/* Inline search bar for mobile/tablet only */}
              <form className="planet-search-bar planet-search-bar-inline" onSubmit={handleSearch} autoComplete="off">
                <input
                  type="text"
                  placeholder="Search planet..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search planet"
                />
              </form>
              <Scene ambient={2} directional={0.9} freeControl={freeControl}>
                <Model path="/models/mars.glb" scale={marsScale} />
              </Scene>
              <div className="mt-3">
                <ImageBox src={getImageFor('Mars', '/images/mars.jpg')} caption="Mars Overview" />
                <MediaList planetName="Mars" />
              </div>
            </div>
          </div>

          {/* Ceres */}
          <div className="carousel-item" ref={canvasRefs[3]}>
            <div className="canvas-wrapper">
              {/* Inline search bar for mobile/tablet only */}
              <form className="planet-search-bar planet-search-bar-inline" onSubmit={handleSearch} autoComplete="off">
                <input
                  type="text"
                  placeholder="Search planet..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search planet"
                />
              </form>
              <Scene ambient={1.8} directional={0.7} freeControl={freeControl}>
                <Model path="/models/ceres.glb" scale={ceresScale} />
              </Scene>
              <div className="mt-3">
                <ImageBox src={getImageFor('Ceres', '/images/ceres.jpg')} caption="Ceres Overview" />
                <MediaList planetName="Ceres" />
              </div>
            </div>
          </div>

          {/* Jupiter */}
          <div className="carousel-item" ref={canvasRefs[4]}>
            <div className="canvas-wrapper">
              <form className="planet-search-bar planet-search-bar-inline" onSubmit={handleSearch} autoComplete="off">
                <input
                  type="text"
                  placeholder="Search planet..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search planet"
                />
              </form>
              <Scene ambient={0.4} directional={1.1} freeControl={freeControl}>
                <Model path="/models/jupiter.glb" scale={jupiterScale} />
              </Scene>
              <div className="mt-3">
                <ImageBox src={getImageFor('Jupiter', '/images/jupiter.jpg')} caption="Jupiter Overview" />
                <MediaList planetName="Jupiter" />
              </div>
            </div>
          </div>

          {/* Haumea */}
          <div className="carousel-item" ref={canvasRefs[5]}>
            <div className="canvas-wrapper">
              <form className="planet-search-bar planet-search-bar-inline" onSubmit={handleSearch} autoComplete="off">
                <input
                  type="text"
                  placeholder="Search planet..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search planet"
                />
              </form>
              <Scene ambient={1.6} directional={0.7} freeControl={freeControl}>
                <Model path="/models/haumea.glb" scale={haumeaScale} />
              </Scene>
              <div className="mt-3">
                <ImageBox src={getImageFor('Haumea', '/images/haumea.jpg')} caption="Haumea Overview" />
                <MediaList planetName="Haumea" />
              </div>
            </div>
          </div>

          {/* Eris */}
          <div className="carousel-item" ref={canvasRefs[6]}>
            <div className="canvas-wrapper">
              <form className="planet-search-bar planet-search-bar-inline" onSubmit={handleSearch} autoComplete="off">
                <input
                  type="text"
                  placeholder="Search planet..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search planet"
                />
              </form>
              <Scene ambient={1.9} directional={0.8} freeControl={freeControl}>
                <Model path="/models/eris.glb" scale={erisScale} />
              </Scene>
              <div className="mt-3">
                <ImageBox src={getImageFor('Eris', '/images/eris.jpg')} caption="Eris Overview" />
                <MediaList planetName="Eris" />
              </div>
            </div>
          </div>

          {/* Neptune */}
          <div className="carousel-item" ref={canvasRefs[7]}>
            <div className="canvas-wrapper">
              <form className="planet-search-bar planet-search-bar-inline" onSubmit={handleSearch} autoComplete="off">
                <input
                  type="text"
                  placeholder="Search planet..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search planet"
                />
              </form>
              <Scene ambient={0.5} directional={0.9} freeControl={freeControl}>
                <Model path="/models/neptune.glb" scale={neptuneScale} />
              </Scene>
              <div className="mt-3">
                <ImageBox src={getImageFor('Neptune', '/images/neptune.jpg')} caption="Neptune Overview" />
                <MediaList planetName="Neptune" />
              </div>
            </div>
          </div>

          
        </div>

        {/* Carousel Controls: always show, even on mobile */}
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      </div>
    </div>
  )
}
export default DescriptionCarousel;