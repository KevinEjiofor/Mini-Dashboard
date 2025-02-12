import { styled } from '@mui/material/styles';

export const StyledTableRow = styled('tr')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,


}));

export const StyledTableCell = styled('td')(({ theme }) => ({

    verticalAlign: 'middle',
}));

export const ActionsCell = styled('td')({
    whiteSpace: 'nowrap',

});
