import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Fresh Cart</h3>
            <p className="text-sm">
              Your one-stop destination for fresh groceries and daily essentials. 
              Quality products delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-green-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-green-500 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm hover:text-green-500 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm hover:text-green-500 transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm flex items-center">
                <i className="fas fa-phone mr-2"></i>
                +1 234 567 890
              </li>
              <li className="text-sm flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                support@freshcart.com
              </li>
              <li className="text-sm flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                123 Shopping Street, NY, USA
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-500 transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Fresh Cart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 