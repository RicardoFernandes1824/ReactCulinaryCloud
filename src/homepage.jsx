import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function HomePage() {
  const name = localStorage.getItem('Name'); // Retrieve the name from localStorage
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [photo, setPhoto] = useState(null);

  const myRecipes = () => {
    navigate("/myRecipes"); // Navigate to the desired page
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePhotoUpload = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSaveRecipe = () => {
    // Add logic to save the recipe
    alert("Recipe saved!");
    toggleModal();
  };

  return (
    <>
      <NavBar />
      <main className="flex items-center justify-center w-full h-screen bg-image">
        <div className="text-center relative">
          {/* Title */}
          <p className="text-6xl text-green-800 relative top-[-120px] font-bold">
            Anyone Can Be a <span className="imperial-script-regular text-8xl">Chef</span>
          </p>

          {/* Personalized Greeting */}
          {name ? (
            <p className="text-2xl text-black text-bordered font-semibold mb-6" >
              Welcome, {name}! Ready to whip up something amazing?
            </p>
          ) : (
            <p className="text-2xl text-green-700 font-semibold mb-6">
              Welcome! Let's explore some delicious recipes.
            </p>
          )}

          {/* Button */}
          <button
            onClick={toggleModal}
            className="border-2 bg-white border-green-800 text-green-800 rounded-full px-8 py-2 font-bold hover:bg-green-800 hover:text-white mr-2"
          >
            Ready? Let's Create a Recipe!
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white w-[90%] h-[90%] rounded-lg shadow-lg p-6 overflow-auto">
                <h1 className="text-3xl font-bold text-green-800">Create Your Recipe</h1>
                <p className="text-gray-700 mb-6">
                  Let's create a recipe worth sharing!
                </p>

                {/* Recipe Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Recipe Name</label>
                  <input
                    type="text"
                    placeholder="Enter recipe name"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>

                {/* Ingredients Section */}
                <h2 className="text-xl font-bold text-green-800 mt-6 mb-4">Ingredients</h2>

                {/* Ingredients Table */}
                <table className="w-full  border-collapse">
                  <thead>
                    <tr className="bg-green-800 text-white">
                      <th className="px-4 py-2">QT</th>
                      <th className="px-4 py-2">Measurement</th>
                      <th className="px-4 py-2">Ingredient</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(3)].map((_, index) => (
                      <tr key={index}>
                        <td className="border border-gray-600 px-4 py-2">
                          <input
                            type="number"
                            className="w-full border-gray-300 rounded px-2 py-1"
                          />
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <select className="w-full border-gray-300 rounded px-2 py-1">
                            <option value="">Select</option>
                            <option value="grams">Grams</option>
                            <option value="cups">Cups</option>
                            {/* Add more options here */}
                          </select>
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <input
                            type="text"
                            placeholder="Enter ingredient"
                            className="w-full border-gray-300 rounded px-2 py-1"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Add Row Button */}
                <button
                  className="mt-4 text-green-800 font-bold underline"
                  onClick={() => alert("Add row logic here")}
                >
                  + Add row
                </button>

                {/* Preparation Notes */}
                <h2 className="text-xl font-bold text-green-800 mt-6">Preparation notes</h2>
                <textarea
                  placeholder="Describe the process..."
                  className="w-full border border-gray-600 rounded px-4 py-2 mt-2 h-24"
                ></textarea>

                {/* Photo Upload */}
                <h2 className="text-xl font-bold text-green-800 mt-6">Upload Photo</h2>
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

                {/* Tips Section */}
                <h2 className="text-xl font-bold text-green-800 mt-6">Tips</h2>
                <textarea
                  placeholder="Share some tips..."
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-2 h-24"
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
                  onClick={handleSaveRecipe}
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



          <button
            onClick={myRecipes}
            className="border-2 bg-green-800 border-green-800 text-white rounded-full px-8 py-2 font-bold hover:bg-white hover:text-green-800 hover:border-green-800 ml-2"
          >
            Get Started with My Recipes
          </button>
        </div>
      </main>
    </>
  );
}

export default HomePage;
