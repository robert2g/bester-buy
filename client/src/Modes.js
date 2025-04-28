import React, { useEffect } from 'react';
import LightMode from './images/Mode1.svg';
import DarkMode from './images/Mode2.svg';
import { useTheme } from './ThemeContext';

const Modes = () => {
    const { toggleDarkMode, isLightMode } = useTheme();
    const modeImage = isLightMode ? LightMode : DarkMode;

    return (
        <div>
            <button className="mode-container" onClick={() => toggleDarkMode(!isLightMode)}>
                <img className="mode-icon" src={modeImage} alt="Mode Icon" />
            </button>
        </div>
    );
};

export default Modes;