
import React from 'react';
import { LoadingContainer, LoadingImage } from './LoadingScreen.style';
import logo from '../../assets/ibcs.png';

const LoadingScreen: React.FC = () => {
    return (
        <LoadingContainer>
            <LoadingImage src={logo} alt="Loading" />
        </LoadingContainer>
    );
};

export default LoadingScreen;
