import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './itemstyles/carousel.css'

import image1 from '../images/graphics/ScrapedThumbnail1.png';
import image2 from '../images/graphics/ScrapedThumbnail2.png';
import image3 from '../images/graphics/ScrapedThumbnail3.png';

import ArrowL from '../images/ArrowL.svg';
import LightArrowL from '../images/light-ArrowL.svg'

import ArrowR from '../images/ArrowR.svg';
import LightArrowR from '../images/light-ArrowR.svg'

import {useTheme} from "../ThemeContext";

const PrevArrow = ({ onClick }) => (
    <div className={useTheme().isLightMode ? "light-custom-arrow custom-prev" : "custom-arrow custom-prev"} onClick={onClick}>
        <img className="arrow-img" src={useTheme().isLightMode ? LightArrowL : ArrowL} alt={"Left"}/>
    </div>
);
const NextArrow = ({ onClick }) => (
    <div className={useTheme().isLightMode ? "light-custom-arrow custom-next" : "custom-arrow custom-next"} onClick={onClick}>
        <img className="arrow-img" src={useTheme().isLightMode ? LightArrowR : ArrowR} alt={"Left"}/>
    </div>
);
const Carousel = () => {
    const { isLightMode } = useTheme();
    const settings = {
        dots: false,
        infinite: true,
        speed: 750,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: <PrevArrow/>,
        nextArrow: <NextArrow/>,
    };
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleAfterChange = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentIndex < 2) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setCurrentIndex(0);
            }
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [currentIndex]);

    return (
        <div>
            <Slider {...settings} afterChange={handleAfterChange}>
                <div className="no-select-outline">
                    <img src={image1} alt="Image 1" />
                </div>
                <div className="no-select-outline">
                    <img src={image2} alt="Image 2" />
                </div>
                <div className="no-select-outline">
                    <img src={image3} alt="Image 3" />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;