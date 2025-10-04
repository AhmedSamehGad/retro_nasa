import { useEffect, useState } from "react";

const PlutoComponent = () => {
  const [pluto, setPluto] = useState(null);
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

  const normalizeName = (name) => {
    return (name || "").replace(/[^a-zA-Z]/g, "").toLowerCase();
  };

  useEffect(() => {
    const fetchPluto = async () => {
      setLoading(true);
      const allPlanets = await getPlanets();

      const foundPluto = allPlanets.find(p => normalizeName(p.name) === "pluto");

      if (!foundPluto) {
        setError("Pluto not found");
      }

      setPluto(foundPluto || null);
      setLoading(false);
    };

    fetchPluto();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{pluto.name}</h1>
      <p>Type: {pluto.type}</p>
      <p>Discovered by: {pluto.discovery?.discoverer}</p>
      <p>Discovery year: {pluto.discovery?.year}</p>
      <p>Status: {pluto.status?.current}</p>
      <p>Previously: {pluto.status?.previous}</p>
      <p>Diameter (km): {pluto.physical?.diameter_km}</p>
      <p>Mass (kg): {pluto.physical?.mass_kg}</p>
      <p>Moons: {pluto.moons?.map(m => m.name).join(", ")}</p>
      {pluto.media?.video_url && <img src={pluto.media.video_url} alt={pluto.name} />}
    </div>
  );
};

export default PlutoComponent;
