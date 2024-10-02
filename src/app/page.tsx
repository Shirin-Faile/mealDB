'use client';
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const { user } = useUserContext() as UserContextType;
    const [recipes, setRecipes] = useState<RecipeType[] | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                if (user) {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user.category}`);
                    const data = await response.json();
                    console.log(data);

                    const topFiveRecipes = data.meals.slice(0, 5);
                    setRecipes(topFiveRecipes);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchRecipes();
    }, [user]);

    return (
        <>
            {user && (
                <div className="min-h-screen bg-green-50 p-6">
                    <p className="text-xl text-green-900 font-semibold mb-6">
                    Here are the top dishes in your favorite category: <span className="font-bold">{user.category}</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes &&
                            recipes.map((meal: RecipeType) => (
                                <div key={meal.idMeal} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                                    <Link href={`/Recipe/${meal.idMeal}`}>
                                        <p className="text-lg text-green-800 font-bold mb-4 hover:text-green-500 transition-colors">
                                            {meal.strMeal}
                                        </p>
                                        <img
                                            src={meal.strMealThumb}
                                            alt={meal.strMeal}
                                            className="w-full max-w-[300px] lg:max-w-[400px] h-auto object-cover rounded-md shadow-lg"
                                        />
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
}



