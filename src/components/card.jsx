import {FaStar} from "react-icons/fa";
import {CiStar} from "react-icons/ci";
import React, {useState} from "react";
import {Link} from "react-router";

export const RecipeCardComponent = ({recipe, isFavouriteProp = undefined, refreshRecipes=undefined}) => {
    const token = localStorage.getItem('Token');
    const userId = localStorage.getItem('Id');
    const [isFavourite, setIsFavourite] = useState(isFavouriteProp ?? recipe.isFavorite);

    const addRecipeToFavourites = async (recipeId) => {
        try {
            const response = await fetch('http://localhost:8080/favourites', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: userId,
                        recipeId: recipeId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
        } catch (error) {
            console.error(`Request failed wiht error: ${error}`);
        }
    }
    const removeRecipeFromFavourites = async (recipeId) => {
        try {
            const response = await fetch(`http://localhost:8080/favourites/${recipeId}`, {
                    method: 'DELETE',
                    body: JSON.stringify({
                        userID: userId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
        } catch (error) {
            console.error(`Request failed wiht error: ${error}`);
        }
    }

    const toggleFavorite = async (recipeId) => {
        const newIsFavourite = !isFavourite;

        if (newIsFavourite) {
            await addRecipeToFavourites(recipeId);
        } else {
            await removeRecipeFromFavourites(recipeId);
        }

        setIsFavourite(newIsFavourite);

        if (refreshRecipes) {
            refreshRecipes();
        }
    };


    return (
        <div
            key={recipe.id}
            className="border border-gray-300 rounded-lg shadow-md overflow-hidden bg-white"
        >
            <img
                src={recipe?.coverImage !== "" ? `http://localhost:8080/static/${recipe?.coverImage}` : "https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.jpg"}
                alt={recipe.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                    Category: <span className="font-medium">{recipe.category}</span>
                </p>
                <p className="text-gray-600 mb-4">
                    {recipe.notes || "No additional notes available."}
                </p>
                <div className="flex justify-between items-center">
                      <span
                          className={`text-sm font-medium ${recipe.public ? "text-green-700" : "text-red-700"
                          }`}
                      >
                        {recipe.public ? "Public" : "Private"}
                      </span>
                    <button onClick={() => toggleFavorite(recipe.id)}>
                        {isFavourite ? <FaStar color="yellow"/> : <CiStar/>}
                    </button>
                    <Link to={`/recipe/${recipe.id}`} state={{publicRecipe: recipe.public}}
                          className={"bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"}
                    >
                        View Recipe
                    </Link>
                </div>
            </div>
        </div>)
}
