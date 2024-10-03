'use client';

import { useRouter } from "next/navigation";
import { CategoryType } from "@/utils/types";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";

const Category = () => {
    const [categories, setCategories] = useState<CategoryType[] | null>(null);
    const userContext = useUserContext();
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleFavorite = (category: string) => {
        if (userContext && userContext.setUser && userContext.user) {
            userContext.setUser({
                ...userContext.user,
                category: category,
            });
        }
    };

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <h1 className="text-2xl text-green-900 font-bold mb-6">Meal Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories && categories.map((category: CategoryType) => (
                    <div key={category.idCategory} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                        <p className="text-lg text-green-800 font-bold mb-4">{category.strCategory}</p>
                        <img
                            src={category.strCategoryThumb}
                            alt={category.strCategory}
                            className="w-full max-w-[300px] lg:max-w-[400px] h-auto object-cover rounded-md shadow-lg"
                        />
                        <button 
                            onClick={() => router.push(`/Category/${category.strCategory}`)}
                            className="text-sm text-blue-600 mt-4 hover:underline"
                        >
                            View Items in {category.strCategory}
                        </button>
                        {userContext?.user && (
                            <button
                                onClick={() => handleFavorite(category.strCategory)}
                                className={`text-sm mt-2 ${userContext.user.category === category.strCategory ? 'text-red-500' : 'text-gray-500'} hover:underline`}
                            >
                                {userContext.user.category === category.strCategory ? "Favorited" : "Mark as Favorite"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;


