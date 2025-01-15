import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import { UpdateUserModal } from "../components/modalUser";

const Profile = () => {
    const userId = localStorage.getItem("Id"); // userId is stored in localStorage
    const token = localStorage.getItem("Token"); // token is stored in localStorage

    const [loading, setLoading] = useState(true); // State to show loading spinner
    const [error, setError] = useState(null); // State to handle API errors
    const [userData, setUserData] = useState(null); // State to store user data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    useEffect(() => {
        if (!userId) {
            setError("User not found.");
            setLoading(false);
            return;
        }

        async function fetchUser() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:8080/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorMessage = `Failed to fetch user data for user ID: ${userId}. Status: ${response.status}`;
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [userId, token, refreshTrigger]);

    const refreshProfile = () => {
        setRefreshTrigger((prev) => !prev);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
                <p className="text-xl font-semibold text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
                <p className="text-xl font-semibold text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <>
            <NavBar />
            <main className="w-full min-h-screen bg-gray-100">
                <div className="flex flex-col items-center w-full px-8 py-4">
                    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-3xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Name:</p>
                                <p>{userData.name || "N/A"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Email:</p>
                                <p>{userData.email || "N/A"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Password:</p>
                                <p>**********</p>
                            </div>
                        </div>

                        <button
                            onClick={toggleModal}
                            className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Update Profile
                        </button>

                        {isModalOpen && (<UpdateUserModal
                            userId={userId}
                            token={token}
                            refreshProfile={refreshProfile}
                            toggleModal={toggleModal}
                        />

                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Profile;
