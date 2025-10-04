// Navbar.jsx
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Your Profile", path: "/profile" },
    { name: "How It All Began", path: "/about" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 bg-transparent`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-bold text-white">
          Retro
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${
                location.pathname === link.path
                  ? "text-white opacity-100 border-b-2 border-white"
                  : "text-white opacity-80"
              } hover:opacity-100 transition`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/login"
            className="text-white border border-white px-4 py-1 rounded transition hover:bg-white hover:text-black"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="text-white border border-white px-4 py-1 rounded transition hover:bg-white hover:text-black"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block ${
                location.pathname === link.path
                  ? "text-white opacity-100 border-l-4 border-white pl-2"
                  : "text-white opacity-80"
              } hover:opacity-100 transition`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col space-y-3 pt-4">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-white border border-white px-4 py-1 rounded text-center transition hover:bg-white hover:text-black"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="text-white border border-white px-4 py-1 rounded text-center transition hover:bg-white hover:text-black"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
