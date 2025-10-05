import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const PlanetComponent = ({ onPlanetSelect }) => {
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  // Get planet name from query parameter
  const queryParams = new URLSearchParams(location.search);
  const planetName = queryParams.get("planet"); // "Neptune" in your example

  const getPlanets = async () => {
    try {
      const res = await fetch("http://localhost:7170/api/getplanets");
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch planets");
      }
      const data = await res.json();
      return data.allPlanets || [];
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchPlanet = async () => {
      setLoading(true);
      const allPlanets = await getPlanets();
      const foundPlanet = allPlanets.find(
        (p) => (p.name || "").toLowerCase() === planetName?.toLowerCase()
      );
      if (!foundPlanet) setError(`${planetName} not found`);
      setPlanet(foundPlanet || null);
      setLoading(false);
    };
    if (planetName) fetchPlanet();
    else setError("No planet specified in URL");
  }, [planetName]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  const cardClass = "backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs";

  const handleClick = () => {
    if (onPlanetSelect) onPlanetSelect(planet.name);
    alert(`Selected planet: ${planet.name}`);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      {planet.media?.video_url && (
        <img
          src={planet.media.video_url}
          alt={planet.name}
          className="w-72 h-72 object-cover rounded-full border-4 border-indigo-400 shadow-2xl"
        />
      )}

      <motion.div
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`absolute top-5 left-5 ${cardClass}`}
      >
        <h2 className="font-bold text-lg">{planet.name}</h2>
        <p>Type: {planet.type}</p>
        <p>Location: {planet.location}</p>
        <p>Etymology: {planet.etymology}</p>
        <button
          onClick={handleClick}
          className="mt-2 px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Details
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`absolute top-5 right-5 ${cardClass}`}
      >
        <h3 className="font-semibold">Discovery</h3>
        <p>Year: {planet.discovery?.year || "Unknown"}</p>
        <p>Discoverer: {planet.discovery?.discoverer || "Unknown"}</p>
        <h3 className="font-semibold mt-2">Status</h3>
        <p>Current: {planet.status?.current || "Unknown"}</p>
        <p>Previous: {planet.status?.previous || "Unknown"}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className={`absolute bottom-5 left-5 ${cardClass}`}
      >
        <h3 className="font-semibold">Physical</h3>
        <p>Diameter: {planet.physical?.diameter_km} km</p>
        <p>Mass: {planet.physical?.mass_kg?.toExponential(2)} kg</p>
        <p>Moons: {planet.quick_facts?.number_of_moons}</p>
        <p>Largest Moon: {planet.quick_facts?.largest_moon || "None"}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className={`absolute bottom-5 right-5 ${cardClass}`}
      >
        <h3 className="font-semibold">Orbit & Surface</h3>
        <p>Distance from Sun: {planet.orbit?.distance_from_sun_km} km</p>
        <p>Year Length: {planet.orbit?.year_length_earth_years} Earth years</p>
        <p>Orbit Shape: {planet.orbit?.orbit_shape}</p>
        <p>Surface: {planet.surface?.composition.join(", ")}</p>
        {planet.surface?.notable_features?.length > 0 && (
          <p>Features: {planet.surface.notable_features.join(", ")}</p>
        )}
      </motion.div>
    </div>
  );
};

export default PlanetComponent;
