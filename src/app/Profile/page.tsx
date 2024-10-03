'use client';

import { useUserContext } from "@/utils/contexts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link to navigate to recipe details

const Profile = () => {
    const userContext = useUserContext();
    const router = useRouter();
    const [newCategory, setNewCategory] = useState(userContext?.user?.category || "");

    useEffect(() => {
        if (!userContext?.user) {
            router.push("/LogIn");
        }
    }, [userContext, router]);

    const handleCategoryChange = () => {
        if (userContext?.user && userContext.setUser) {
            userContext.setUser({
                ...userContext.user,
                category: newCategory,
            });
        }
    };

    const handleLogOut = () => {
        if (userContext?.setUser) {
            userContext.setUser(null);
            router.push("/LogIn");
        }
    };

    return (
        <>
            {userContext?.user && (
                <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-green-900 mb-6">
                        {userContext.user.name}'s Profile
                    </h1>

                    {/* Favorite Category Section */}
                    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center mb-6">
                        <p className="text-xl text-green-800 font-semibold mb-4">
                            Favorite Category: <span className="font-bold">{userContext.user.category}</span>
                        </p>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Update your favorite category"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <button
                            onClick={handleCategoryChange}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Update Favorite Category
                        </button>
                    </div>

                    {/* Saved Recipes Section */}
                    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
                        <h2 className="text-2xl text-green-900 font-semibold mb-4">Saved Recipes</h2>
                        {userContext.user.savedRecipes.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {userContext.user.savedRecipes.map((recipe) => (
                                    <li key={recipe.idMeal} className="flex items-center mb-4">
                                        <Link href={`/Recipe/${recipe.idMeal}`} className="flex items-center">
                                            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-16 h-16 object-cover rounded-md mr-2" />
                                            <span className="text-green-700">{recipe.strMeal}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No saved recipes yet.</p>
                        )}
                    </div>

                    {/* Log Out Button */}
                    <button
                        onClick={handleLogOut}
                        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Log Out
                    </button>
                </div>
            )}
        </>
    );
};

export default Profile;


