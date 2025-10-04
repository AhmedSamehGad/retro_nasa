import Planets from '../schema/planet.js'

export const searchPlanet = async (req, res) => {
  try {
    const { name } = req.body; 
    if(!name) return res.status(400).json({ message: "planet name is required"});

    let planet = await Planets.findOne({ name });

    if (planet) {
      planet.searchCount += 1;
      await planet.save();
    }
    else {
      planet = await Planets.create({ name, searchCount: 1 });
    }

    res.json({ message: "Search recorded", planet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// /////////// ////////// //////////// /////////// //////////// /////////// /////////

export const getTrendingPlanets = async (req, res) => {
  try {
    const trendingPlanets = await Planets.find().sort({searchPlanet: -1}).limit(4) 
    res.json({planets: trendingPlanets});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

