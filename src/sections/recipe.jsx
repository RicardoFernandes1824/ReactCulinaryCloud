import React, { useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import NavBar from "../components/navbar";

const Recipe = () => {
    const { id } = useParams();
    const location = useLocation();
    const { publicRecipe } = location.state;
    const [recipe, setRecipe] = useState(null);
    const userId = localStorage.getItem('Id');
    const token = localStorage.getItem('Token');

    const url = publicRecipe ? `http://localhost:8080/recipe/${id}` : `http://localhost:8080/users/${userId}/recipe/${id}`

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();

            setRecipe(data);
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <NavBar />
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
            <img
                src={recipe?.coverImage !== "" ? `http://localhost:8080/static/${recipe?.coverImage}` : "https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.jpg"}
                alt={recipe.name}
                className="w-full h-48 object-cover"
            />
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Ingredients</h2>
                <ul className="list-disc list-inside">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.quantity} {ingredient.ingredient.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Category</h2>
                <p>{recipe.category}</p>
            </div>
            {recipe.notes && (
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold">Notes</h2>
                    <p>{recipe.notes}</p>
                </div>
            )}
            {recipe.attachements.length > 0 && (
                <div className="mb-4">
                <h2 className="text-2xl font-semibold">Images</h2>
                <div className="flex flex-wrap gap-4">
                    {recipe.attachements.map((attachment, index) =>
                        attachment.path ? (
                            <img
                                key={`image-${index}`}
                                src={`http://localhost:8080/static/${attachment.path}`}
                                alt={attachment.name || "Attachment"}
                                className="w-32 h-32 object-cover"
                            />
                        ) : null
                    )}
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold">Tips</h2>
                    <ol className="list-decimal list-inside">
                        {recipe.attachements.map((attachment, index) =>
                            attachment.tips ? (
                                <li key={`tip-${index}`}>{attachment.tips}</li>
                            ) : null
                        )}
                    </ol>
                </div>
            </div>
            )}
        </div>
        </>
    );
};

export default Recipe;
