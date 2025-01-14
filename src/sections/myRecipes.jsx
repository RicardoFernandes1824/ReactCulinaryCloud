import React, { useState, useEffect } from "react";
import NavBar from "../navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

function MyRecipes() {
  const userId = localStorage.getItem('Id'); // Assuming userId is stored in localStorage
  const token = localStorage.getItem('Token'); // Assuming userId is stored in localStorage
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [loading, setLoading] = useState(true); // State to show loading spinner
  const [error, setError] = useState(null); // State to handle API errors

  const [isFavorite , setFavorite] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const [photoGallery, setPhotoGallery] = useState(null);
  const [photoGalleryFiles, setPhotoGalleryFiles] = useState(null);

  const [recipeName, setRecipeName] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("");
  const [recipeNotes, setRecipeNotes] = useState("");
  const [recipeTips, setRecipeTips] = useState("");

  useEffect(() => {
    console.log("User ID:", userId); // Log the value for debugging
    if (!userId) {
      setError("User not found.");
      setLoading(false);
      return;
    }

    async function fetchRecipes() {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}/recipe`, {
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
  }, [userId, recipes]); // Re-run effect for changes

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    }
  
    // Add Rows
    const [rows, setRows] = useState([
      { quantity: "", measurement: "", name: "" },
    ]);
  
    const handleInputChange = (index, field, value) => {
      const updatedRows = [...rows];
      updatedRows[index][field] = value;
      setRows(updatedRows);
    };
  
    const addRow = () => {
      setRows([...rows, { quantity: "", measurement: "", name: "" }]);
    };
  
    const handlePhotoUpload = (e) => {
      const file = e.target.files[0];
      setPhoto(URL.createObjectURL(file));
      setFileUpload(file);
    };
  
    const handleGalleryUpload = (e) => {
      const files = e.target.files;
      setPhotoGallery(Array.from(files).map((file) => URL.createObjectURL(file)));
      setPhotoGalleryFiles(files);
    };
  
    async function createRecipe() {
      try {
        // First Step: Create/Save the receipe
        const formData = new FormData();
        formData.append('name', recipeName);
        formData.append('category', recipeCategory);
        formData.append('notes', recipeNotes);
        formData.append('authorId', userId);
        formData.append('public', isPublic);
  
        // Add ingredients as a JSON string
        formData.append('ingredients', JSON.stringify(rows));
  
        // Add the cover image
        if (fileUpload) {
          formData.append('sampleFile', fileUpload);
        }
  
        const response = await fetch(`http://localhost:8080/recipe`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Error");
        }
        const data = await response.json();
  
        // Second Step: Save tips and photos
        const recipeId = data.id;
  
        if (recipeTips) {
          const tipsRequest = await fetch(`http://localhost:8080/upload/${recipeId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ tips: recipeTips })
          });
  
  
  
          if (!tipsRequest.ok) {
            throw new Error('Failed to save tips');
          }
        }
  
        if (photoGalleryFiles) {
          const galleryFormData = new FormData();
          Array.from(photoGalleryFiles).forEach((file) => {
            galleryFormData.append('sampleFile', file);
          });
          const galleryRequest = await fetch(`http://localhost:8080/upload/${recipeId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: galleryFormData,
          });
  
          if (!galleryRequest.ok) {
            throw new Error('Failed to save gallery');
          }
        }
        await fetchRecipes();
      } catch (err) {
        console.log(err);
        //setError(err.message); // Set error message in case of failure
      } finally {
        //setLoading(false); // Stop loading spinner
      }
    }

  return (
    <>
      <NavBar />
      <main className="w-full min-h-screen bg-gray-100">
        <div className="flex items-center justify-between w-full px-8 py-4 bg-white shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">My Recipes</h2>
          <div className="flex items-center space-x-11">
            {/* New Recipe Button */}
            <button
              onClick={toggleModal}
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              New Recipe
            </button>

            {/* Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={(e) => {
                // Close modal if clicked on the overlay
                if (e.target === e.currentTarget) {
                  toggleModal();
                }
              }}
            >
              <div
                className="bg-white w-[90%] h-[90%] rounded-lg shadow-lg p-6 overflow-auto"
                onClick={(e) => e.stopPropagation()} // Prevent click inside modal from propagating to overlay
              >
                <h1 className="text-3xl font-bold text-green-800">Create Your Recipe</h1>
                <p className="text-gray-700 mb-6">
                  Let's create a recipe worth sharing!
                </p>

                {/* Recipe Name and Category Row */}
                <div className="mb-4 flex space-x-4">
                  {/* Recipe Name */}
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">Recipe Name</label>
                    <input
                      type="text"
                      placeholder="Enter recipe name"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      value={recipeName} // Bind input to state
                      onChange={(e) => setRecipeName(e.target.value)} // Update state on input change
                    />
                  </div>

                  {/* Category */}
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">Category</label>
                    <input
                      type="text"
                      placeholder="Enter category"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      value={recipeCategory} // Bind input to state
                      onChange={(e) => setRecipeCategory(e.target.value)} // Update state on input change
                    />
                  </div>
                </div>

                {/* Ingredients Section */}
                <h2 className="text-xl font-bold text-green-800 mt-6 mb-4">Ingredients</h2>

                {/* Ingredients Table */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-800 text-white">
                      <th className="px-4 py-2">QT</th>
                      <th className="px-4 py-2">Measurement</th>
                      <th className="px-4 py-2">Ingredient</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td className="border border-gray-600 px-4 py-2">
                          <input
                            type="number"
                            className="w-full border-gray-300 rounded px-2 py-1"
                            value={row.quantity}
                            onChange={(e) =>
                              handleInputChange(index, "quantity", e.target.value)
                            }
                          />
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <select
                            className="w-full border-gray-300 rounded px-2 py-1"
                            value={row.measurement}
                            onChange={(e) =>
                              handleInputChange(index, "measurement", e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            <option value="grams">Grams</option>
                            <option value="cups">Cups</option>
                            <option value="tablespoons">Tablespoons</option>
                            <option value="teaspoons">Teaspoons</option>
                            {/* Add more options here */}
                          </select>
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <input
                            type="text"
                            placeholder="Enter ingredient"
                            className="w-full border-gray-300 rounded px-2 py-1"
                            value={row.name}
                            onChange={(e) =>
                              handleInputChange(index, "name", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Add Row Button */}
                <button
                  className="mt-4 text-green-800 font-bold underline"
                  onClick={addRow}
                >
                  + Add row
                </button>

                {/* Preparation Notes */}
                <h2 className="text-xl font-bold text-green-800 mt-6">Preparation notes</h2>
                <textarea
                  placeholder="Describe the process..."
                  className="w-full border border-gray-600 rounded px-4 py-2 mt-2 h-24"
                  value={recipeNotes} // Bind input to state
                  onChange={(e) => setRecipeNotes(e.target.value)} // Update state on input change
                ></textarea>

                {/* Cover Photo Upload */}
                <h2 className="text-xl font-bold text-green-800 mt-6">Upload Cover Photo</h2>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="block mt-2 mb-4 ml-1"
                />
                {photo && (
                  <div className="mb-4">
                    <img
                      src={photo}
                      alt="Uploaded"
                      className="w-32 h-32 object-cover rounded"
                    />
                  </div>
                )}

                {/* Recipe Photos Upload */}
                <h2 className="text-xl font-bold text-green-800 mt-6">Upload Recipe Photos</h2>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="block mt-2 mb-4 ml-1"
                />
                <div className="flex space-x-4">
                  {photoGallery && (photoGallery).map((photo, index) => (
                    <div key={index} className="mb-4">
                      <img
                        src={photo}
                        alt="Uploaded"
                        className="w-32 h-32 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Tips Section */}
                <h2 className="text-xl font-bold text-green-800 mt-6">Tips</h2>
                <textarea
                  placeholder="Share some tips..."
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-2 h-24"
                  value={recipeTips}
                  onChange={(e) => setRecipeTips(e.target.value)}
                ></textarea>

                {/* Make Public Toggle */}
                <div className="flex items-center space-x-4 mt-6">
                  <label className="text-gray-700 font-bold">Want to showcase your recipe to everyone? Go public</label>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                    className="w-6 h-6 pl-1"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={() => createRecipe()}
                  className="mt-6 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 mr-2"
                >
                  Save Recipe
                </button>

                {/* Close Button */}
                <button
                  onClick={toggleModal}
                  className="mt-6 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 ml-2"
                >
                  Close
                </button>
              </div>
            </div>
          )}

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
            <div className="text-center text-xl text-gray-700">
              <p>No recipes available. Add your first recipe!</p>
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
                      <button onClick={toggleFavorite}>
                      {recipe.isFavorite ? <FaStar color="yellow" /> : <CiStar  />}
                      </button>
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

export default MyRecipes;
