import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        return JSON.parse(localStorage.getItem('currentUser')) || null
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null
    });
    const [role, setRole] = useState(() => {
        return JSON.parse(localStorage.getItem('role')) || null
    })

    const login = async (user, token) => {
        const res = await fetch(`api/users/${user}`)
        const data = await res.json();
        const userRole = data.user.role;

        setCurrentUser(user);
        setToken(token);
        setRole(userRole)

        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('role', JSON.stringify(userRole));
    }

    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('role');
    }

    return (
        <AuthContext.Provider value={{ currentUser, token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);