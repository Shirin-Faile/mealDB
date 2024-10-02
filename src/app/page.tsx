'use client'
import { useUserContext } from "@/utils/contexts"
import { RecipeType, UserContextType } from "@/utils/types"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
    const { user } = useUserContext() as UserContextType
    const [recipes, setRecipes] = useState< RecipeType[] | null >(null)

    useEffect( () => {
       const fetchRecipes = async () => {
        try {
            if ( user ) {
            const response = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user.category}`);
            const data = await response.json();
            console.log(data)

            const topFiveRecipes = data.meals.slice(0, 5);

            setRecipes(topFiveRecipes)
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchRecipes(); 
    

}, [])

    return (
        <>
            {user && (
        <div className="">
            Your favorite category of food is {user.category}

            {recipes && recipes.map((meal:RecipeType) => 
            <div key={meal.idMeal}> 
                <Link href={`/Recipe/${meal.idMeal}`}>{meal.strMeal}
                    <img src={meal.strMealThumb} height="auto" width="200px"></img>
                </Link>  
            </div>)}
        </div>
        )}
        </>
    )
}

