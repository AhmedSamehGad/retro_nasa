import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Route , Routes , BrowserRouter as Router  } from 'react-router-dom'
import Game from './Pages/Game'
import DescriptionCarousel from './Pages/Description'

function App() {
  const [count, setCount] = useState(0)

return (
  <Router>
    <Routes>
      <Route path="/game" element={<Game />} />
      <Route path="/description" element={<DescriptionCarousel />} />
    </Routes>
  </Router>
)
}

export default App
