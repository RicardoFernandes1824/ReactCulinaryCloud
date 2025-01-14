import NavBar from "../navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Favourites() {

  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [favourite, setFavourite] = useState([]);
  const [loading, setLoading] = useState(true); // State to show loading spinner
  const [error, setError] = useState(null); // State to handle API errors
  const userId = localStorage.getItem('Id'); // Assuming userId is stored in localStorage
  const token = localStorage.getItem('Token'); // Assuming userId is stored in localStorage
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  useEffect(() => {
    console.log("User ID:", userId); // Log the value for debugging
    if (!userId) {
      setError("User not found.");
      setLoading(false);
      return;
    }

    async function fetchRecipes() {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}/favourites`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        if (!response.ok) {
          const errorMessage = `Failed to fetch recipes for user ID: ${userId}. Status: ${response.status}`;
          throw new Error(errorMessage);
        }
        const data = await response.json();
        data.forEach(recipe => console.log("Cover Image:", recipe.coverImage));
        setRecipes(data); // Update state with fetched recipes
      } catch (err) {
        setError(err.message); // Set error message in case of failure
      } finally {
        setLoading(false); // Stop loading spinner
      }
    }

    fetchRecipes();
  }, [userId]); // Re-run the effect if userId changes

  return (
    <>
      <NavBar />
      <main className="w-full min-h-screen bg-gray-100">
        <div className="flex items-center justify-between w-full px-8 py-4 bg-white shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">My Recipe Favorites</h2>
          <div className="flex items-center space-x-11">

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search recipes..."
              className="flex-grow min-w-[50%] px-4 py-2 border border-green-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-600"
            />
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          {loading ? (
            <p className="text-lg text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-lg text-red-500">Error: {error}</p>
          ) : recipes.length === 0 ? (
            <div className="flex justify-center items-center min-h-screen">
              <div className="text-center text-xl text-gray-700">
                <p>No favourite recipes available. Add your first favourite recipe!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              {recipes.map((recipe) => (
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
                      <span
                        className={`text-sm font-medium text-green-700 ${recipe.authorId
                          }`}
                      >
                        {recipe.author.name}
                      </span>
                      <button
                        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                        onClick={() => navigate(`/recipe/${recipe.id}`)} // Dynamically navigate to recipe detail page
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Favourites;