import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email format'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
        if (data.statusMsg === 'success') {
          setSuccess(true);
        }
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred while processing your request');
      } finally {
        setLoading(false);
      }
    }
  });

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 text-center">
        <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-lg">
          Reset password link has been sent to your email
        </div>
        <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Forgot Password</h2>
      <p className="text-center text-gray-600 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
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
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email address
          </label>
          {formik.touched.email && formik.errors.email ? 
            <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div> 
            : null
          }
        </div>
        <div className="flex items-center justify-between mb-6">
          <Link to="/login" className="text-sm text-green-600 hover:text-green-700">
            Back to Login
          </Link>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className={`text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
}