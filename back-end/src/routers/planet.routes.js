import { Router } from "express";
import { addPlanet, getPlanets } from "../controllers/planets.controllers.js";
const planetRoutes = Router()

planetRoutes.post('/addplanet', addPlanet)
planetRoutes.get('/getplanets', getPlanets)


export default planetRoutes