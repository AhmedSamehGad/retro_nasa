import Planets from '../schema/planet.js'
import dotenv from 'dotenv'
dotenv.config()

export const addPlanet = async (req, res) => {
    try{
        const { name, type } = req.body
        if(!name || !type) 
            return res.status(400).json({message:"Name and type are required"})

        const planetExists = await Planets.findOne({name: name.trim().toLowerCase()})
        if(planetExists) return res.status(400).json({message:"Planet already exists"})

        const newPlanet = await Planets.create(req.body)
        res.status(201).json({message:"Added successfully", planet: newPlanet})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}

export const getPlanets = async (req, res) => {
    try{
        const allPlanets = await Planets.find().sort({name:1})
        res.status(200).json({allPlanets})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}
