export type UserType = {
    name: string;
    category: string;
    savedRecipes: RecipeType[];
}

export type UserContextType = {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    saveRecipe: (recipe: RecipeType) => void;
}


export type RecipeType = {
    strMeal: string;
    idMeal: string;
    strMealThumb: string;
    strArea?: string;
    strInstructions?: string;
    strCategory?: string;
    strTags?: string;
    strYoutube?: string;
    [key: string]: string | undefined;
}


export type CategoryType = {
    map(arg0: (category: CategoryType) => import("react").JSX.Element): import("react").ReactNode
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}