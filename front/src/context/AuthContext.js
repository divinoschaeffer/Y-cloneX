import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
    }

    const value = {user, login, logout};

    return <AuthContext.Provider     value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
    return useContext(AuthContext);
}