import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const name = localStorage.getItem('Name');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const myRecipes = () => {
    navigate("/myRecipes"); // Navigate to the desired page
  };
  return (
    <>
      <NavBar />
      <main className="flex items-center justify-center w-full h-screen bg-image">
        <div className="text-center relative">
          <p className="text-6xl text-green-800 relative top-[-120px] font-bold">
            Anyone Can Be a <span className="imperial-script-regular text-8xl">Chef</span>
          </p>
          <div>{name}</div>
          <button onClick={myRecipes}
            className="border-2 bg-green-800 border-green-800 text-white rounded-full px-12 py-2 font-bold hover:bg-green-600"
          >
            My Recipes
          </button>
        </div>
      </main>
    </>
  );
}
export default HomePage;