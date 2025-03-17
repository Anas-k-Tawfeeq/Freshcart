import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserTokenContext } from '../context/UserTokenContext'

export default function ProtectedRoute({ children }) {
    const { userToken } = useContext(UserTokenContext);

    if (!userToken) {
        return <Navigate to="/login" replace={true} />
    }

    return children;
} 