// components/Search.tsx
import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  onSearchChange: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  return (
    <div className="flex items-center rtl bg-white rounded-md p-2 shadow-gray-200 shadow-md px-5 h-10">
      <label className="text-blue-600 ml-2 text-sm">جستجو</label>
      <input
        type="text"
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-white focus:outline-none border-gray-300 rounded-md p-2 w-full text-sm"
      />
      <FaSearch className="text-gray-500 mr-2 text-sm" />
    </div>
  );
};

export default Search;
