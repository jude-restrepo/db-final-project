import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        return JSON.parse(sessionStorage.getItem('currentUser')) || null
    });
    const [token, setToken] = useState(() => {
        return sessionStorage.getItem('token') || null
    });
    const [role, setRole] = useState(() => {
        return JSON.parse(sessionStorage.getItem('role')) || null
    })

    const login = async (user, token) => {
        const res = await fetch(`api/users/${user}`)
        const data = await res.json();
        const userRole = data.user.role;

        setCurrentUser(user);
        setToken(token);
        setRole(userRole)

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('role', JSON.stringify(userRole));
    }

    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        setRole(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('role');
    }

    return (
        <AuthContext.Provider value={{ currentUser, token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);