import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../finalProject assets/finalProject assets/images/freshcart-logo.svg'
import { CounterContext } from '../context/CounterContext'
import { UserTokenContext } from '../context/UserTokenContext'

export default function Navbar() {
  const { counter } = useContext(CounterContext);
  const { userToken, removeUserToken } = useContext(UserTokenContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    removeUserToken();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </Link>
          {/* Navigation Links */}
          <ul className="font-medium hidden lg:flex lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:ml-8">
            <li>
              <Link to="/" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="/products" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0">Products</Link>
            </li>
            <li>
              <Link to="/Categories" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0">Categories</Link>
            </li>
            <li>
              <Link to="/Brand" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0">Brands</Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0">Contact</Link>
            </li>
          </ul>
        </div>

        <button type="button" 
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
          aria-controls="navbar-default" 
          aria-expanded={isMenuOpen}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>

        {/* User and Social Links - Desktop */}
        <ul className="font-medium hidden lg:flex lg:flex-row lg:space-x-6 rtl:space-x-reverse items-center">
          {!userToken ? (
            <>
              <li>
                <Link to="/login" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0">Login</Link>
              </li>
              <li>
                <Link to="/register" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={handleLogout} className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0">Logout</button>
              </li>
              <li>
                <Link to="/wishlist" className="relative block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0">
                  <i className="fas fa-heart"></i>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="relative block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0">
                  <i className="fas fa-shopping-cart"></i>
                  {counter > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {counter}
                    </span>
                  )}
                </Link>
              </li>
            </>
          )}
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0"><i className="fa-brands fa-facebook"></i></a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0"><i className="fa-brands fa-instagram"></i></a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm lg:p-0"><i className="fa-brands fa-youtube"></i></a>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:hidden`} id="navbar-default">
          {/* Navigation Links - Mobile */}
          <ul className="font-medium flex flex-col p-4 mt-4 border-t border-gray-200">
            <li>
              <Link to="/" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="/products" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm">Products</Link>
            </li>
            <li>
              <Link to="/Categories" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm">Categories</Link>
            </li>
            <li>
              <Link to="/Brand" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm">Brands</Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm">Contact</Link>
            </li>
          </ul>

          {/* User and Social Links - Mobile */}
          <ul className="font-medium flex flex-col p-4 border-t border-gray-200">
            {!userToken ? (
              <>
                <li>
                  <Link to="/login" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm">Login</Link>
        </li>
        <li>
                  <Link to="/register" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={handleLogout} className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm">Logout</button>
        </li>
        <li>
                  <Link to="/wishlist" className="relative inline-block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm">
                    <i className="fas fa-heart"></i>
                  </Link>
                </li>
        <li>
                  <Link to="/cart" className="relative inline-block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm">
                    <i className="fas fa-shopping-cart"></i>
                    {counter > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {counter}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm"><i className="fa-brands fa-facebook"></i></a>
        </li>
        <li>
              <a href="#" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm"><i className="fa-brands fa-instagram"></i></a>
        </li>
        <li>
              <a href="#" className="block py-2 px-3 text-gray-900 hover:text-green-500 bg-transparent rounded-sm"><i className="fa-brands fa-youtube"></i></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

