import React, { useState } from "react";
import Swal from "sweetalert2";

export const UpdateRecipeModal = ({
    userId, token, recipeId, toggleModal
}) => {

    const [isPublic, setIsPublic] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [fileUpload, setFileUpload] = useState(null);

    const [recipeName, setRecipeName] = useState("");
    const [recipeCategory, setRecipeCategory] = useState("");
    const [recipeNotes, setRecipeNotes] = useState("");

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

    async function updateRecipe(field, value) {
        try {
            const formData = new FormData();
            formData.append(field, value);
            formData.append('name', recipeName);
            formData.append('category', recipeCategory);
            formData.append('notes', recipeNotes);
            formData.append('authorId', userId);
            formData.append('public', isPublic);

            formData.append('ingredients', JSON.stringify(rows));

            if (fileUpload) {
                formData.append('sampleFile', fileUpload);
            }

            const response = await fetch(`http://localhost:8080/users/${userId}/recipe/${recipeId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Error updating recipe");
            }

            // Show success alert using SweetAlert2
            Swal.fire({
                title: 'Recipe Updated!',
                text: 'Your recipe has been successfully updated.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.reload(); // Refresh the page after the alert
            });

            toggleModal(); // Close modal after update
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error updating your recipe.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    }

    // Add Rows
    const [rows, setRows] = useState([]);

    return (
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
                <h1 className="text-3xl font-bold text-green-800">Update Your Recipe</h1>
                <p className="text-gray-700 mb-6">
                    Let's update a recipe worth sharing!
                </p>

                {/* Recipe Name and Category Row */}
                <div className="mb-4 flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 font-bold mb-2">Recipe Name</label>
                        <input
                            type="text"
                            placeholder="Enter recipe name"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            value={recipeName} 
                            onChange={(e) => setRecipeName(e.target.value)} 
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

                {/* Make Public Toggle */}
                <div className="flex items-center space-x-4 mt-6">
                    <label className="text-gray-700 font-bold">Want to showcase your recipe to
                        everyone? Go public</label>
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={() => setIsPublic(!isPublic)}
                        className="w-6 h-6 pl-1"
                    />
                </div>

                {/* Save Button */}
                <button
                    onClick={() => updateRecipe()}
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
    )
}
