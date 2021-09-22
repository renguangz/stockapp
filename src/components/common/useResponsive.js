import React, { useState, useEffect } from 'react';

const useResponsive = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [screenType, setScreenType] = useState('INITAL');

    useEffect(() => {
        updatewWindowDimensions()
        window.addEventListener('resize', updatewWindowDimensions)

        return function cleanup () {
            window.removeEventListener('resize', updatewWindowDimensions)
        }
    }, [window.innerWidth])

    const updatewWindowDimensions = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)

        if (window.innerWidth > 1300) {
            setScreenType('DESKTOP')
        } else if (window.innerWidth <= 1300 && window.innerWidth > 800) {
            setScreenType('TABLET')
        } else {
            setScreenType('MOBILE')
        }
    }

    return {
        windowWidth,
        windowHeight,
        screenType,
    }
};

export default useResponsive;