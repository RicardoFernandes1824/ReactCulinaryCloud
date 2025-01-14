import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function HomePage() {
  const name = localStorage.getItem('Name'); // Retrieve the name from localStorage
  const userId = localStorage.getItem('Id'); // Assuming userId is stored in localStorage
  const token = localStorage.getItem('Token'); // Assuming userId is stored in localStorage
  const navigate = useNavigate(); // Hook to programmatically navigate

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

  const myRecipes = () => {
    navigate("/myRecipes"); // Navigate to the desired page
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
