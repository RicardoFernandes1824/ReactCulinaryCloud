import NavBar from "../components/navbar";
import React, { useState, useEffect } from "react";
import {RecipeCardComponent} from "../components/card.jsx";
import SearchBarComponent from "../components/searchBar.jsx";

function Favourites() {

  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [loading, setLoading] = useState(true); // State to show loading spinner
  const [error, setError] = useState(null); // State to handle API errors
  const userId = localStorage.getItem('Id'); // Assuming userId is stored in localStorage
  const token = localStorage.getItem('Token'); // Assuming userId is stored in localStorage
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const refreshRecipes = () => {
    setRefreshTrigger((prev) => !prev);
  };

  useEffect(() => {
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
        setRecipes(data); // Update state with fetched recipes
      } catch (err) {
        setError(err.message); // Set error message in case of failure
      } finally {
        setLoading(false); // Stop loading spinner
      }
    }

    fetchRecipes();
  }, [userId, refreshTrigger]); // Re-run the effect if userId changes

  const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(recipes)

  return (
    <>
      <NavBar />
      <main className="w-full min-h-screen bg-gray-100">
        <div className="flex items-center justify-between w-full px-8 py-4 bg-white shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">My Recipe Favourites</h2>
          <div className="flex items-center space-x-11">
            <SearchBarComponent setSearchTerm={setSearchTerm} />
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
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              {filteredRecipes.map((recipe) => (
                  <RecipeCardComponent key={recipe.id} recipe={recipe} isFavouriteProp={true} refreshRecipes={refreshRecipes} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Favourites;
