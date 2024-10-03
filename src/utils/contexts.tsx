'use client';

import { createContext, useContext, useState } from 'react';
import { UserContextType, UserType, RecipeType } from './types';

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null);

    const saveRecipe = (recipe: RecipeType) => {
        if (user) {
            const updatedUser = {
                ...user,
                savedRecipes: [...user.savedRecipes, recipe]
            };
            setUser(updatedUser);
        }
    };

    return (
        <UserContext.Provider value={{user, setUser, saveRecipe}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
