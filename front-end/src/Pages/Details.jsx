import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Details() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const planet = params.get('planet')
    if (planet) {
      navigate(`/description?planet=${encodeURIComponent(planet)}`)
    } else {
      navigate('/description')
    }
  }, [location, navigate])
  return null
}

