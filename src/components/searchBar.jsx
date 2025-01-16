import React from "react";

export const SearchBarComponent = ({ setSearchTerm }) => {
    return (
        <input
            type="text"
            placeholder="Search recipes..."
            className="flex-grow min-w-[20%] max-w-full md:min-w-[30%] lg:min-w-[40%] px-4 py-2 border border-green-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-600 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm in the parent component
        />
    );
};

export default SearchBarComponent;
