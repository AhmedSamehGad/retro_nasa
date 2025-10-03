import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
<<<<<<< HEAD
import Layout from "./components/Layouts/Layout"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Game from "./Pages/Game"
import Description from "./Pages/Descripton"
import Compare from "./Pages/Compare"
import Details from "./Pages/Details"
=======
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Game from "./pages/Game"
import Description from "./pages/Descripton"
import NotFound from "./components/NotFoundPage"
>>>>>>> 89b0e63da04f221d592842d7da08429192eda42e


function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="details" element={<Details />} />
        </Route>

        <Route path="/game" element={<Game />} />
        <Route path="/description" element={<Description />} />
        <Route path="compare" element={<Compare />} />
        
=======
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<Game />} />
        <Route path="/description" element={<Description />} />

        {/* not found page */}
        <Route path="*" element={<NotFound />} />
>>>>>>> 89b0e63da04f221d592842d7da08429192eda42e
      </Routes>
    </Router>
  )
}

export default App
