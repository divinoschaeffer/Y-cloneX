import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(localStorage.getItem("user"));

    const login = (userData) => {
        console.log(userData);
        localStorage.setItem("user",JSON.stringify(userData));
        setUser(userData);
    }

    const logout = () => {
        localStorage.setItem("user", JSON.stringify({user: null}));
        setUser(null);
    }

    const value = {user, login, logout};

    return <AuthContext.Provider     value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
    return useContext(AuthContext);
}