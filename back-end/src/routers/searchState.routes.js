import {Router} from 'express'
import {searchPlanet, getTrendingPlanets} from '../controllers/searchState.controller.js'

const searchStateRoutes = Router()

searchStateRoutes.post("/search", searchPlanet)
searchStateRoutes.get("/trending", getTrendingPlanets)


export default searchStateRoutes