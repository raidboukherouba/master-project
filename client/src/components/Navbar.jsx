import { useState } from "react";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import { NavLink, Link } from "react-router-dom"

export default function Navbar({ darkMode, toggleDarkMode }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    
    return (
      <nav className="bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            {/* Logo + Desktop Links */}
            <div className="flex items-center">
              <Link className="flex items-center" to="/">
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  {darkMode ? "☹" : "😊"} Dziri<span className="text-blue-500">Sentiment</span>
                </span>
              </Link>
              <nav className="hidden md:flex ml-10 space-x-8">
                <NavLink 
                  to="/"
                  className={({ isActive }) => 
                    `px-1 py-2 text-sm font-medium ${
                      isActive 
                        ? 'text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400' 
                        : 'text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/features"
                  className={({ isActive }) => 
                    `px-1 py-2 text-sm font-medium ${
                      isActive 
                        ? 'text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400' 
                        : 'text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                    }`
                  }
                >
                  Features
                </NavLink>
                <NavLink 
                  to="/about-us"
                  className={({ isActive }) => 
                    `px-1 py-2 text-sm font-medium ${
                      isActive 
                        ? 'text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400' 
                        : 'text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                    }`
                  }
                >
                  About us
                </NavLink>
              </nav>
            </div>

            {/* Right Side (Buttons + Mobile Menu) */}
            <div className="flex items-center">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 focus:outline-none cursor-pointer"
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center ml-2">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 focus:outline-none cursor-pointer"
                >
                  {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        <div className={`md:hidden bg-white dark:bg-gray-900 shadow-lg 
            transition-all duration-700 ease-in-out 
            ${isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink 
                to="/"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium text-center ${
                    isActive
                      ? 'bg-blue-50 text-blue-500 dark:bg-gray-800 dark:text-blue-400'
                      : 'text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/features"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium text-center ${
                    isActive
                      ? 'bg-blue-50 text-blue-500 dark:bg-gray-800 dark:text-blue-400'
                      : 'text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  }`
                }
              >
                Features
              </NavLink>
              <NavLink 
                to="/about-us"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium text-center ${
                    isActive
                      ? 'bg-blue-50 text-blue-500 dark:bg-gray-800 dark:text-blue-400'
                      : 'text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  }`
                }
              >
                About us
              </NavLink>
            </nav>
        </div>
      </nav>
    );
}