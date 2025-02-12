import { styled, keyframes } from '@mui/material/styles';

const zoomInOut = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

export const LoadingContainer = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
}));

export const LoadingImage = styled('img')({
    animation: `${zoomInOut} 2s infinite`,
});
