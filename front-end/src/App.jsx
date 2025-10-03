import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
<<<<<<< HEAD
import Layout from "./components/Layouts/Layout"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Game from "./Pages/Game"
import Description from "./Pages/Descripton"
=======
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Game from "./pages/Game"
import Description from "./pages/Descripton"
import NotFound from "./components/NotFoundPage"
>>>>>>> NotFound


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
