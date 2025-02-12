import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(6.25),
    padding: theme.spacing(2.5),
}));

export const HeaderDiv = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const DashboardTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '16.94px',
    letterSpacing: '0.1em',
    textAlign: 'left',
    color: '#6E6893',
}));
export const TableContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(6.25), // 50px
    '& table': {
        borderCollapse: 'collapse',
        width: '100%',
        maxWidth: '800px',
    },
    // Apply cell styles for both header and body
    '& th, & td': {
        padding: theme.spacing(4),
        borderBottom: `1px solid ${theme.palette.divider}`,
        textAlign: 'left',
    },
    '& th': {
        cursor: 'pointer',
        color: '#6E6893',
    },

    '& tbody': {
        borderLeft: `1px solid ${theme.palette.divider}`,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    gap: theme.spacing(10)
}));

export const PaginationButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(0, 1),
    boardRadius: theme.spacing( 10.5)
}));

export const PaginationInfo = styled('span')(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.text.primary,
    paddingRight: theme.spacing(2.5),
}));


export const SpaceBelowSearch = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2.5),
}));
