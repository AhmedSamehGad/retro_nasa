import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ErisComponent = () => {
  const [eris, setEris] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchEris = async () => {
      setLoading(true);
      const allPlanets = await getPlanets();
      const foundEris = allPlanets.find(
        (p) => (p.name || "").toLowerCase() === "eris"
      );
      if (!foundEris) {
        setError("Eris not found");
      }
      setEris(foundEris || null);
      setLoading(false);
    };
    fetchEris();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  const cardClass =
    "backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs";

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      {eris.media?.video_url && (
        <img
          src={eris.media.video_url}
          alt={eris.name}
          className="w-72 h-72 object-cover rounded-full border-4 border-indigo-400 shadow-2xl"
        />
      )}

      {/* Top-left card */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`absolute top-5 left-5 ${cardClass}`}
      >
        <h2 className="font-bold text-lg">{eris.name}</h2>
        <p>Type: {eris.type}</p>
        <p>Location: {eris.location}</p>
        <p>Etymology: {eris.etymology}</p>
      </motion.div>

      {/* Top-right card */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`absolute top-5 right-5 ${cardClass}`}
      >
        <h3 className="font-semibold">Discovery</h3>
        <p>Year: {eris.discovery?.year || "Unknown"}</p>
        <p>Discoverer: {eris.discovery?.discoverer || "Unknown"}</p>

        <h3 className="font-semibold mt-2">Status</h3>
        <p>Current: {eris.status?.current || "Unknown"}</p>
        <p>Previous: {eris.status?.previous || "Unknown"}</p>
      </motion.div>

      {/* Bottom-left card */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className={`absolute bottom-5 left-5 ${cardClass}`}
      >
        <h3 className="font-semibold">Physical</h3>
        <p>Diameter: {eris.physical?.diameter_km} km</p>
        <p>Mass: {eris.physical?.mass_kg?.toExponential(2)} kg</p>
        <p>Moons: {eris.quick_facts?.number_of_moons}</p>
        <p>Largest Moon: {eris.quick_facts?.largest_moon || "None"}</p>
      </motion.div>

      {/* Bottom-right card */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className={`absolute bottom-5 right-5 ${cardClass}`}
      >
        <h3 className="font-semibold">Orbit & Surface</h3>
        <p>Distance from Sun: {eris.orbit?.distance_from_sun_km} km</p>
        <p>Year Length: {eris.orbit?.year_length_earth_years} Earth years</p>
        <p>Orbit Shape: {eris.orbit?.orbit_shape}</p>
        <p>Surface: {eris.surface?.composition.join(", ")}</p>
        {eris.surface?.notable_features?.length > 0 && (
            <p>Features: {eris.surface.notable_features.join(", ")}</p>
        )}
      </motion.div>
    </div>
  );
};

export default ErisComponent;
