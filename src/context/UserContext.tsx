"use client"
import { createContext, useState, ReactNode, useContext } from 'react';

interface User {
    name: string;
    savedItems: { id: string; name: string; thumbnail: string }[];
}

interface UserContextType {
    user: User | null;
    login: (name: string) => void;
    logout: () => void;
    saveItem: (item: { id: string; name: string; thumbnail: string}) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    login: () => {},
    logout: () => {},
    saveItem: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (name: string) => {
        setUser ({ name, savedItems: [] });
    };

    const logout = () => {
        setUser(null);
    };

    const saveItem = (item: { id: string; name: string; thumbnail: string }) => {
        if (user) {
            setUser({
                ...user,
                savedItems: [...user.savedItems, item],
            });
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, saveItem }}>
            {children}
        </UserContext.Provider>
    );
};