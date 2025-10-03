import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "./components/Layouts/Layout"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Game from "./Pages/Game"
import Description from "./Pages/Descripton"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/game" element={<Game />} />
        <Route path="/description" element={<Description />} />

        {/* not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
