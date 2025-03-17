import { createContext, useState, useEffect } from "react";

export const UserTokenContext = createContext();

export function UserTokenProvider({ children }) {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setUserToken(token);
        }
    }, []);

    function saveUserToken(token) {
        setUserToken(token);
        localStorage.setItem('userToken', token);
    }

    function getUserToken() {
        return localStorage.getItem('userToken');
    }

    function removeUserToken() {
        setUserToken(null);
        localStorage.removeItem('userToken');
    }

    return (
        <UserTokenContext.Provider value={{ userToken, saveUserToken, getUserToken, removeUserToken }}>
            {children}
        </UserTokenContext.Provider>
    );
} 