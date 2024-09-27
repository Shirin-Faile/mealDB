"use client"
import { createContext, useState, ReactNode, useContext } from 'react';

interface Category {
    name: string;
    thumbnail: string;
}

interface CategoryContextType {
    categories: Category[];
    favoriteCategory: Category | null;
    setCategories: (categories: Category[]) => void;
    setFavoriteCategory: (category: Category) => void;
}

const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    favoriteCategory: null,
    setCategories: () => {},
    setFavoriteCategory: () => {},
});

export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryContextProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [favoriteCategory, setFavoriteCategory] = useState<Category | null>(null);

    return (
        <CategoryContext.Provider
        value={{ categories, favoriteCategory, setCategories, setFavoriteCategory }}
        >
            {children}
        </CategoryContext.Provider>
    );
};