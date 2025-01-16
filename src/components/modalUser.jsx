import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

export const UpdateUserModal = ({ userId, token, refreshProfile, toggleModal }) => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    // Update User function using PATCH
    async function updateUser() {
        try {
            const formData = new FormData();

            // Only append the name if it's not empty
            if (userName.trim() !== "") {
                formData.append("name", userName);
            }

            // Only append the email if it's not empty
            if (userEmail.trim() !== "") {
                formData.append("email", userEmail);
            }

            // Only append the password if it's not empty
            if (userPassword.trim() !== "") {
                formData.append("password", userPassword);
            }

            const response = await fetch(`http://localhost:8080/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.message === "Email already exists") {
                    alert("The email is already in use. Please choose another.");
                } else {
                    throw new Error("Error updating user data");
                }
            } else {
                // Success: Show success alert using SweetAlert2
                Swal.fire({
                    title: 'User Updated!',
                    text: 'Your profile has been successfully updated.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    refreshProfile();
                });
            }

            toggleModal(); // Close the modal after update
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update user.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        } finally {
            toggleModal(); // Ensure the modal is closed after the operation
        }
    }

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
                <h1 className="text-3xl font-bold text-green-800">Update Your Profile</h1>
                <p className="text-gray-700 mb-6">Update your user details</p>

                {/* Name Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                </div>

                {/* Save Button */}
                <button
                    onClick={updateUser}
                    className="mt-6 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 mr-2"
                >
                    Save Changes
                </button>

                {/* Close Button */}
                <button
                    onClick={toggleModal}
                    className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 ml-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
