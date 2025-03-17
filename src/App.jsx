import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Products from './components/Products.jsx'
import Categories from './components/Categories.jsx'
import Cart from './components/Cart.jsx'
import Brand from './components/Brand.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import NotFound from './components/NotFound.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import Wishlist from './components/Wishlist.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'products', element: <Products /> },
        { path: 'categories', element: <Categories /> },
        { path: 'cart', element: <Cart /> },
        { path: 'brand', element: <Brand /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'product/:id', element: <ProductDetails /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'wishlist', element: <Wishlist /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
