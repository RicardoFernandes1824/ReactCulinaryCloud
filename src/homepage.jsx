import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const name = localStorage.getItem('Name'); // Retrieve the name from localStorage
  const navigate = useNavigate(); // Hook to programmatically navigate

  const myRecipes = () => {
    navigate("/myRecipes"); // Navigate to the desired page
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
            onClick={myRecipes}
            className="border-2 bg-green-800 border-green-800 text-white rounded-full px-12 py-2 font-bold hover:bg-green-600"
          >
            Get Started with My Recipes
          </button>
        </div>
      </main>
    </>
  );
}

export default HomePage;
