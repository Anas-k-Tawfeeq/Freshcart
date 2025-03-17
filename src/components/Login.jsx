import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserTokenContext } from '../context/UserTokenContext'

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { saveUserToken } = useContext(UserTokenContext);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
        if (data.message === 'success') {
          saveUserToken(data.token);
          navigate('/');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred during login');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Login Now</h2>
      {error && <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded-lg">{error}</div>}
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
            <input 
              type="email" 
              name="email" 
              id="floating_email" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 hover:border-green-500 peer" 
              placeholder=" "
              {...formik.getFieldProps('email')}
            />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div> : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input 
              type="password" 
              name="password" 
              id="floating_password" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 hover:border-green-500 peer" 
              placeholder=" "
              {...formik.getFieldProps('password')}
            />
            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {formik.touched.password && formik.errors.password ? <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div> : null}
        </div>
        <div className="flex items-center justify-end mb-6">
          <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
            Forgot Password?
          </Link>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className={`text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
