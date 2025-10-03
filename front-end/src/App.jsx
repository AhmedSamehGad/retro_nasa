import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route , Routes , BrowserRouter as Router  } from 'react-router-dom'
import Game from './Pages/Game'

function App() {
  const [count, setCount] = useState(0)

return (
  <Router>
    <Routes>
      <Route path="/game" element={<Game />} />
    </Routes>
  </Router>
)
}

export default App
