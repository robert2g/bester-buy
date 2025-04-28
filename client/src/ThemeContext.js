import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const storedTheme = localStorage.getItem('theme');
    const [isLightMode, setIsLightMode] = useState(storedTheme ? storedTheme === 'light' : false);

    useEffect(() => {
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    }, [isLightMode]);

    const toggleDarkMode = () => {
        setIsLightMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isLightMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};