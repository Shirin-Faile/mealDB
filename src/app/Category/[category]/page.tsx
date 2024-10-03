'use client';

import { RecipeType } from "@/utils/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CategoryItemsPage = ({ params }: { params: { category: string } }) => {
    const { category } = params;
    const [items, setItems] = useState<RecipeType[] | null>(null);

    useEffect(() => {
        const fetchCategoryItems = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                const data = await response.json();
                setItems(data.meals);
            } catch (error) {
                console.error("Error fetching category items:", error);
            }
        };

        fetchCategoryItems();
    }, [category]);

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <h1 className="text-2xl text-green-900 font-bold mb-6">Items in {category}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items && items.map((item: RecipeType) => (
                    <div key={item.idMeal} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                        <p className="text-lg text-green-800 font-bold mb-4">{item.strMeal}</p>
                        <img
                            src={item.strMealThumb}
                            alt={item.strMeal}
                            className="w-full max-w-[300px] lg:max-w-[400px] h-auto object-cover rounded-md shadow-lg"
                        />
                        <Link href={`/Recipe/${item.idMeal}`} className="text-sm text-blue-600 mt-4 hover:underline">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryItemsPage;
