import { Link } from "react-router";
import { useState } from "react";
import CulinaryCloudLogo from "./assets/img/CulinaryCloud1.png";

function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="bg-green-800 text-white">
            <div className="flex justify-between items-center h-16 px-4 lg:px-20">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={CulinaryCloudLogo} alt="CulinaryCloud Logo" className="h-8 w-8 mr-2" />
                    <div className="text-xl font-bold">
                        CulinaryCloud
                    </div>
                </div>

                {/* Dropdown Toggle Button */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="lg:hidden focus:outline-none flex items-center space-x-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={dropdownOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            ></path>
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 bg-green-700 rounded shadow-lg w-40">
                            <ul className="flex flex-col text-left">
                                <Link to="/homepage" className="block px-4 py-2 hover:bg-green-600">
                                    Home
                                </Link>
                                <Link to="/myRecipes" className="block px-4 py-2 hover:bg-green-600">
                                    My Recipes
                                </Link>
                                <Link to="/explore" className="block px-4 py-2 hover:bg-green-600">
                                    Explore
                                </Link>
                                <Link to="/favourites" className="block px-4 py-2 hover:bg-green-600">
                                    Favourites
                                </Link>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Regular Navbar for Large Screens */}
                <div className="hidden lg:flex">
                    <ul className="flex gap-8 text-lg">
                        <Link to="/homepage" className="hover:bg-green-700 px-4 py-2 rounded">
                            Home
                        </Link>
                        <Link to="/myRecipes" className="hover:bg-green-700 px-4 py-2 rounded">
                            My Recipes
                        </Link>
                        <Link to="/explore" className="hover:bg-green-700 px-4 py-2 rounded">
                            Explore
                        </Link>
                        <Link to="/favourites" className="hover:bg-green-700 px-4 py-2 rounded">
                            Favourites
                        </Link>
                    </ul>
                </div>
                </div>
        </nav>
    );
}

export default NavBar;
