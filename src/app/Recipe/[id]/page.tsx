'use client'

import { RecipeType } from "@/utils/types";
import { useEffect, useState } from "react";

const recipePage = ({params}: {params: {id:string}} ) => {
    const { id } = params;
    const [recipe, setRecipe] = useState<RecipeType | null>(null)

    useEffect(() => {
        const fetchRecipe = async () => {
         try {
             if (id) {
             const response = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
             const data = await response.json();
             console.log(data.meals[0])

             setRecipe(data.meals[0])
 
             }
         } catch (error) {
             console.log(error)
         }
     }
     fetchRecipe();  
 }, [])
 
    return (
        <div className="min-h-screen p-6 flex flex-col items-center">
            <p className="text-xl text-green-900 font-semibold mb-6">Id number is {id}</p>
            {recipe && (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg text-center">
                    <p className="text-2xl text-green-800 font-bold mb-4">{recipe.strMeal}</p>
                    <img src={recipe.strMealThumb} className="w-full h-auto rounded-md shadow-lg"/>
                </div>
            )}
        </div>
    )
}

export default recipePage;