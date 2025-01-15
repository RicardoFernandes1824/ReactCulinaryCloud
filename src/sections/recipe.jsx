import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NavBar from "../components/navbar";

const Recipe = () => {
    const { id } = useParams();
    const location = useLocation();
    const { publicRecipe } = location.state;
    const [recipe, setRecipe] = useState(null);
    const userId = localStorage.getItem('Id');
    const token = localStorage.getItem('Token');

    const url = publicRecipe ? `http://localhost:8080/recipe/${id}` : `http://localhost:8080/users/${userId}/recipe/${id}`;

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
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h1 className="text-4xl font-bold text-green-800 mb-4">{recipe.name}</h1>
                    <img
                        src={recipe?.coverImage !== "" ? `http://localhost:8080/static/${recipe?.coverImage}` : "https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.jpg"}
                        alt={recipe.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-green-700 mb-2">Ingredients</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.quantity} {ingredient.ingredient.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-green-700 mb-2">Category</h2>
                    <p className="text-gray-700">{recipe.category}</p>
                </div>

                {recipe.notes && (
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-green-700 mb-2">Notes</h2>
                        <p className="text-gray-700">{recipe.notes}</p>
                    </div>
                )}

                {recipe.attachements.length > 0 && (
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-green-700 mb-4">Images</h2>
                        <div className="flex flex-wrap gap-4">
                            {recipe.attachements.map((attachment, index) =>
                                attachment.path ? (
                                    <img
                                        key={`image-${index}`}
                                        src={`http://localhost:8080/static/${attachment.path}`}
                                        alt={attachment.name || "Attachment"}
                                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                                    />
                                ) : null
                            )}
                        </div>

                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold text-green-700 mb-2">Tips</h2>
                            <ol className="list-decimal pl-6 text-gray-700">
                                {recipe.attachements.map((attachment, index) =>
                                    attachment.tips ? (
                                        <li key={`tip-${index}`} className="mb-2">{attachment.tips}</li>
                                    ) : null
                                )}
                            </ol>
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    <button
                        //onClick={handleUpdate}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                    >
                        Update Recipe
                    </button>

                    <button
                        //onClick={handleDelete}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Delete Recipe
                    </button>
                </div>
            </div>
        </>
    );
};

export default Recipe;
