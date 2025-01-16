import NavBar from "./components/navbar";
import React, { useState } from "react";
import { Link } from "react-router";
import { CreateRecipeModal } from "./components/modal.jsx";

function HomePage() {
  const name = localStorage.getItem('Name'); // Retrieve the name from localStorage
  const userId = localStorage.getItem('Id'); // Assuming userId is stored in localStorage
  const token = localStorage.getItem('Token'); // Assuming userId is stored in localStorage
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
            <p className="text-2xl text-black text-bordered font-semibold mb-6">
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
          {isModalOpen && (<CreateRecipeModal userId={userId} token={token} toggleModal={toggleModal}
            refreshRecipes={() => {
            }} />)}


          <Link to={'/myRecipes'}
            className={"border-2 bg-green-800 border-green-800 text-white rounded-full px-8 py-2 font-bold hover:bg-white hover:text-green-800 hover:border-green-800 ml-2"}>Get
            Started with My Recipe </Link>
        </div>
      </main>
    </>
  );
}


export default HomePage;
