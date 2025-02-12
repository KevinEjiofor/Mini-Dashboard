import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CustomSearchTextField from './MaterialSearchInputStyles';

interface MaterialSearchInputProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const MaterialSearchInput: React.FC<MaterialSearchInputProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <CustomSearchTextField
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or email"
            variant="outlined"
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#6E6893', ml: 1 }} />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default MaterialSearchInput;
