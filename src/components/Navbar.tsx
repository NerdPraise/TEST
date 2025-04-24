import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ScanSearch, Menu, X } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <ScanSearch className="h-8 w-8 text-accent-blue" />
            <span className="text-xl font-bold font-exo bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
              ScrubDetect
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors duration-300 ${
                location.pathname === '/'
                  ? 'text-accent-blue'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/upload"
              className={`font-medium transition-colors duration-300 ${
                location.pathname === '/upload'
                  ? 'text-accent-blue'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Detect
            </Link>
            <a
              href="#"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = '/upload'
              }}
            >
              Try Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-200 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-60 bg-slate-800/90 backdrop-blur-md' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-2 space-y-3">
          <Link
            to="/"
            className={`block py-2 font-medium ${
              location.pathname === '/' ? 'text-accent-blue' : 'text-slate-300'
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/upload"
            className={`block py-2 font-medium ${
              location.pathname === '/upload'
                ? 'text-accent-blue'
                : 'text-slate-300'
            }`}
            onClick={closeMenu}
          >
            Detect
          </Link>
          <div className="pt-2 pb-4">
            <Link
              to="/upload"
              className="btn-primary block text-center"
              onClick={closeMenu}
            >
              Try Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
