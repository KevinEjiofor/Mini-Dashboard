import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchInputStyle.css';

interface SearchInputProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="search-input-container">
            <FiSearch className="search-icon" />
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
