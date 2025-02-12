import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomSearchTextField = styled(TextField)(({ theme }) => ({
    width: '20%', // Adjust as needed
    backgroundColor: '#F4F2FF',
    borderRadius: '20px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '& fieldset': {
            borderColor: '#ccc',
        },
        '&:hover fieldset': {
            borderColor: '#ccc',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ccc',
        },
    },
    '& input::placeholder': {
        fontFamily: 'Inter, sans-serif',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '14.52px',
        color: '#6E6893',
    },
}));

export default CustomSearchTextField;
