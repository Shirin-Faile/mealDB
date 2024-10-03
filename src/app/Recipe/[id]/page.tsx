'use client';

import { RecipeType } from "@/utils/types";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";

const RecipePage = ({params}: {params: {id:string}}) => {
    const { id } = params;
    const [recipe, setRecipe] = useState<RecipeType | null>(null);
    const userContext = useUserContext();
    const user = userContext?.user;
    const saveRecipe = userContext?.saveRecipe;

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                if (id) {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const data = await response.json();
                    setRecipe(data.meals[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleSaveRecipe = () => {
        if (recipe && saveRecipe) {
            saveRecipe(recipe);
            alert('Recipe saved!');
        }
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center">
            {recipe ? (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg text-center">
                    <h1 className="text-2xl text-green-800 font-bold mb-4">{recipe.strMeal}</h1>
                    <img src={recipe.strMealThumb} className="w-full h-auto rounded-md shadow-lg mb-4" />
                    
                    <p className="text-green-600 font-medium">Category: {recipe.strCategory}</p>
                    <p className="text-green-600 font-medium mb-4">Area: {recipe.strArea}</p>
    
                    <h2 className="text-xl font-semibold mb-2">Instructions</h2>
                    <ul className="list-decimal list-inside text-left mb-4">
                        {recipe.strInstructions?.split('.').filter(Boolean).map((step, index) => (
                            <li key={index} className="mb-2">Step {index + 1}: {step.trim()}.</li>
                        ))}
                    </ul>
    
                    <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                    <ul className="list-disc list-inside mb-4">
                        {Object.keys(recipe).filter(key => key.startsWith('strIngredient') && recipe[key]).map((key, index) => (
                            <li key={index}>{recipe[key]} - {recipe[`strMeasure${key.slice(13)}`]}</li>
                        ))}
                    </ul>
    
                    {user && (
                        <>
                            <button
                                onClick={handleSaveRecipe}
                                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105 md:py-3 md:px-6"
                            >
                                Save Recipe
                            </button>
    
                            {recipe.strYoutube && (
                                <div className="mt-4">
                                    <a 
                                        href={recipe.strYoutube} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-500 hover:underline"
                                    >
                                        Watch on YouTube
                                    </a>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
    
}
export default RecipePage;



