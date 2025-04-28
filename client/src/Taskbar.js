import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import SearchIcon from './images/searchtool_icon.svg';
import SearchIconLight from './images/lightmode/light-searchtool_icon.svg';

import AccountIcon from './images/account-icon.svg';
import AccountIconLight from './images/lightmode/light-account-icon.svg';

import ShoppingIcon from './images/shopping-icon.svg';
import ShoppingIconLight from './images/lightmode/light-shopping-icon.svg';

import BBwm from './images/besterbuy_wordmark.svg';
import BBwmLight from './images/lightmode/light-besterbuy_wordmark.svg';

import MenuH from './images/menu-hamburger.svg'

import ExitIcon from './images/cross.svg';
import LightExitIcon from './images/light-cross.svg';

import SearchBar from "./pages/SearchBar";
import Cart from "./pages/Cart";
import {db} from "./db";
import SpecialItemCell from './items/SpecialItemCell'
import Modes from "./Modes";
import {useTheme} from './ThemeContext';

import {auth} from './config/Config';

const scrapedRef = db.collection('scraped');


function Overlay({isFlyoutVisible}) {
    if (isFlyoutVisible) {
        return <div className="overlay" style={{opacity: 0.5}}></div>;
    } else {
        return <div className="overlay" style={{opacity: 0}}></div>;
    }
}

function SlideOverlay({isDivVisible, isDiv2Visible}) {
    if (isDivVisible || isDiv2Visible) {
        return <div className="slide-overlay" style={{opacity: 0.5}}></div>;
    } else {
        return <div className="slide-overlay" style={{opacity: 0}}></div>;
    }
}

function Taskbar({
                     setDepartmentPageSelection,
                     setQueryPageSelection,
                     setBrandPageSelection,
                     setDepartment,
                     setCategory,
                     setName,
                     setQuantity,
                     setImages,
                     setPrice,
                     setSale,
                     setDescription,
                     searchInput,
                     setSearchInput
                 }) {
    const {isLightMode} = useTheme();
    const [isFlyoutVisible, setFlyoutVisible] = useState(false);
    const overlay = document.querySelector('.overlay');
    const [isDivVisible, setIsDivVisible] = useState(false);
    const [isDiv2Visible, setDiv2Visible] = useState(false);
    const [randomItems, setRandomItems] = useState([]);
    const [section, setSection] = useState("");

    const circleColor = isLightMode ? '#FFFFFF' : '#021125';
    const innerCircleColor = isLightMode ? '#B6CDF2' : '#093B83';
    const textColor = isLightMode ? '#021125' : '#B6CDF2'; // Adjust text color accordingly

    //User Authentication
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });


        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    const [items, setItems] = useState([]);
    useEffect(() => {
        const unsubscribe = db.collection("Cart").onSnapshot((snapshot) => {
            const itemsData = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setItems(itemsData);

        });

        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection("Cart").get();
            setItems(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);

    //Quantity of ites on data cart
    const itemsQuantity = items.length;

    const handleMouseEnter = (section) => {
        setFlyoutVisible(true);
        getRandomItemFromCategory(section);

    };

    const handleMouseLeave = () => {
        setFlyoutVisible(false);
        setSection("");
    };

    const toggleDiv = () => {
        setIsDivVisible(!isDivVisible);
        document.body.style.overflow = isDivVisible ? 'auto' : 'hidden';
    };

    const toggleDiv2 = () => {
        setDiv2Visible(!isDiv2Visible);
        document.body.style.overflow = isDiv2Visible ? 'auto' : 'hidden';
    };

    const handleQueryPageClick = (selection, category) => {
        setQueryPageSelection(selection);
        setCategory(category);
    }

    const handleDepartmentPageClick = (selection, department) => {
        setDepartmentPageSelection(selection);
        setDepartment(department);
    }

    const getRandomItemFromCategory = async (category) => {
        let tmpItems = [];

        await scrapedRef.where('category', '==', category).limit(2).get().then(res => {
            res.forEach(res => {
                tmpItems.push({
                    name: res.data().name,
                    price: res.data().price,
                    image: res.data().images[0],
                    sale: res.data().sale,
                    quantity: res.data().quantity,
                    description: res.data().description,
                    images: res.data().images
                });
            })
        });

        setRandomItems(tmpItems);
    }

    return (
        <div className={isLightMode ? 'light-taskbar-container' : 'dark-taskbar-container'}>
            <div className="taskbar-wrapper">

                <button className="mobile-menu">
                    <img className="menu-icon" src={MenuH} alt={"Menu"}/>
                </button>

                <Link to="/">
                    <button className="wordmark-container">
                        <img className="besterbuy-wordmark" src={isLightMode ? BBwmLight : BBwm}
                             alt={"Company Image"}/>
                    </button>
                </Link>

                <ul className="button-container">

                    <Link className="task-router-link"
                          to="/departmentpage"
                          onClick={() => handleDepartmentPageClick("appliances", "Appliances")}>
                        <li className={isLightMode ? "light-bar-button" : "bar-button"}
                            onMouseEnter={() => handleMouseEnter("kitchen_appliances")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Appliances
                            <div className={isLightMode ? "light-taskbar-flyout" : "taskbar-flyout"}>
                                <div className="flyout-wrapper">
                                    <div className="flyout-column1">
                                        <div
                                            className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop
                                            by Category
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("kitchen_appliances", "Pots & Pans")}>Pots
                                            & Pans</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("refrigerator", "Refrigerators")}>Refrigerators</Link>
                                    </div>

                                    <div className="flyout-column1">
                                        <div
                                            className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop
                                            by Brand
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("Frigidaire")}>Frigidaire</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("GeneralBrand")}>GeneralBrand</Link>

                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[0].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[0].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[0].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[0].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[0].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[0].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[1].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[1].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[1].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[1].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[1].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[1].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </Link>

                    <Link className="task-router-link"
                          to="/departmentpage"
                          onClick={() => handleDepartmentPageClick("computers", "Computers")}>
                        <li className={isLightMode ? "light-bar-button" : "bar-button"}
                            onMouseEnter={() => handleMouseEnter("laptop")}
                            onMouseLeave={handleMouseLeave}>
                            Computers
                            <div className={isLightMode ? "light-taskbar-flyout" : "taskbar-flyout"}>
                                <div className="flyout-wrapper">
                                    <div className="flyout-column1">
                                        <div
                                            className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop
                                            by Category
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("laptop", "Laptops")}>Laptops</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("desktop", "Desktops")}>Desktops</Link>
                                    </div>

                                    <div className="flyout-column1">
                                        <div
                                            className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop by Brand
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("Acer")}>Acer</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("HP")}>HP</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("Dell")}>Dell</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("Lenovo")}>Lenovo</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("MSI")}>MSI</Link>
                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[0].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[0].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[0].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[0].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[0].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[0].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[1].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[1].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[1].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[1].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[1].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[1].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </Link>

                    <Link className="task-router-link"
                          to="/departmentpage"
                          onClick={() => handleDepartmentPageClick("phones", "Phones")}>
                        <li className={isLightMode ? "light-bar-button" : "bar-button"}
                            onMouseEnter={() => handleMouseEnter("smartphone")}
                            onMouseLeave={handleMouseLeave}>
                            Phones
                            <div className={isLightMode ? "light-taskbar-flyout" : "taskbar-flyout"}>
                                <div className="flyout-wrapper">
                                    <div className="flyout-column1">
                                        <div
                                            className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop
                                            by Category
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("smartphone", "Smartphones")}>Smartphones</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("flipphone", "Flip phones")}>Flip
                                            phones</Link>
                                    </div>

                                    <div className="flyout-column1">
                                        <div
                                            className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop by Brand
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("iPhone")}>iPhone</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("Samsung")}>Samsung</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("Nokia")}>Nokia</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("GAMAKOO")}>GAMAKOO</Link>
                                    </div>
                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[0].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[0].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[0].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[0].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[0].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[0].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[1].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[1].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[1].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[1].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[1].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[1].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </Link>

                    <Link className="task-router-link"
                          to="/departmentpage"
                          onClick={() => handleDepartmentPageClick("video", "Video")}>
                        <li className={isLightMode ? "light-bar-button" : "bar-button"}
                            onMouseEnter={() => handleMouseEnter("camera")}
                            onMouseLeave={handleMouseLeave}>
                            Video
                            <div className={isLightMode ? "light-taskbar-flyout" : "taskbar-flyout"}>
                                <div className="flyout-wrapper">
                                    <div className="flyout-column1">
                                        <div className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop by
                                            Category
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("camera", "Cameras")}>Cameras</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("webcam", "Webcams")}>Webcams</Link>
                                    </div>

                                    <div className="flyout-column1">
                                        <div
                                            className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop by Brand
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("GoPro")}>GoPro</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("AKASO")}>AKASO</Link>
                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[0].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[0].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[0].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[0].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[0].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[0].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[1].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[1].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[1].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[1].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[1].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[1].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </Link>

                    <Link className="task-router-link"
                          to="/departmentpage"
                          onClick={() => handleDepartmentPageClick("audio", "Audio")}>
                        <li className={isLightMode ? "light-bar-button" : "bar-button"}
                            onMouseEnter={() => handleMouseEnter("headphone")}
                            onMouseLeave={handleMouseLeave}>
                            Audio
                            <div className={isLightMode ? "light-taskbar-flyout" : "taskbar-flyout"}>
                                <div className="flyout-wrapper">
                                    <div className="flyout-column1">
                                        <div className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop by
                                            Category
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("headphone", "Headphones")}>Headphones</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("earphone", "Earphones")}>Earphones</Link>
                                    </div>

                                    <div className="flyout-column1">
                                        <div
                                            className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop by Brand
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("Sennheiser")}>Sennheiser</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("Sony")}>Sony</Link>
                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[0].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[0].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[0].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[0].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[0].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[0].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[1].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[1].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[1].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[1].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[1].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[1].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </Link>

                    { /* --------------------------------------------------------------------------------------------------------------------------- */}
                    <Link className="task-router-link"
                          to="/departmentpage"
                          onClick={() => handleDepartmentPageClick("office", "Office")}>
                        <li className={isLightMode ? "light-bar-button" : "bar-button"}
                            onMouseEnter={() => handleMouseEnter("chair")}
                            onMouseLeave={handleMouseLeave}>
                            Office
                            <div className={isLightMode ? "light-taskbar-flyout" : "taskbar-flyout"}>
                                <div className="flyout-wrapper">
                                    <div className="flyout-column1">
                                        <div className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop by
                                            Category
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/querypage"
                                              onClick={() => handleQueryPageClick("chair", "Chairs")}>Chairs</Link>
                                    </div>

                                    <div className="flyout-column1">
                                        <div
                                            className={isLightMode ? "light-flyout-header" : "flyout-header"}>Shop by Brand
                                        </div>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("HON")}>HON</Link>
                                        <Link className={isLightMode ? "light-flyout-link" : "flyout-link"}
                                              to="/brandpage"
                                              onClick={() => setBrandPageSelection("Herman Miller")}>Herman Miller</Link>
                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[0].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[0].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[0].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[0].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[0].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[0].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>

                                    <div className="flyout-column2">
                                        <SpecialItemCell
                                            itemName={randomItems.length > 0 ? randomItems[1].name : ''}
                                            itemCost={randomItems.length > 0 ? randomItems[1].price : ''}
                                            imageSrc={randomItems.length > 0 ? randomItems[1].image : ''}
                                            itemImages={randomItems.length > 0 ? randomItems[1].images : []}
                                            itemQuantity={randomItems.length > 0 ? randomItems[1].quantity : ''}
                                            itemDescription={randomItems.length > 0 ? randomItems[1].description : ''}
                                            itemSale={randomItems.length > 0 ? randomItems[0].sale : ''}
                                            setName={setName}
                                            setQuantity={setQuantity}
                                            setImages={setImages}
                                            setPrice={setPrice}
                                            setSale={setSale}
                                            setDescription={setDescription}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </Link>

                    <Overlay isFlyoutVisible={isFlyoutVisible}/>
                </ul>

                <div className="icon-container">
                    <Modes/>

                    <button className="search-container" onClick={toggleDiv}>
                        <img className={"search-icon"}
                             src={isLightMode ? SearchIconLight : SearchIcon}
                             alt={"Search Glass"}
                        />
                    </button>

                    <div
                        className={`sliding-div ${isLightMode ? 'light-sliding-div' : 'sliding-div'} ${isDivVisible ? 'visible' : 'hidden'}`}>
                        <div className="sliding-div-search-frame">
                            <button className={isLightMode ? "light-div-exit" : "div-exit"} onClick={toggleDiv}>
                                <img className={"exit-icon"}
                                     src={isLightMode ? LightExitIcon : ExitIcon}
                                     alt={"Search Glass"}
                                />
                            </button>
                            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
                        </div>
                    </div>

                    <Link to={user ? "/accountLoggedIn" : "/account"}>
                        <button className="account-container">
                            {user ? <span style={{textDecoration: 'none'}}
                                          className={isLightMode ? 'light-account-circle' : 'account-circle'}>A
                        </span> : <img className="account-icon"
                                       src={isLightMode ? AccountIconLight : AccountIcon}
                                       alt={"Account Icon"}/>}
                        </button>
                    </Link>

                    <button className="shopping-container" onClick={toggleDiv2}>
                        <img className="shopping-icon"
                             src={isLightMode ? ShoppingIconLight : ShoppingIcon}
                             alt={"Account Icon"}
                        />
                        <svg
                            className="order-number-circle"
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{position: "absolute", top: "12", right: "2"}}>
                            <circle cx="12" cy="12" r="12" fill={circleColor}/>
                            <circle cx="12" cy="12" r="9" fill={innerCircleColor}/>
                            <text className="order-number" x="12" y="16" textAnchor="middle" fill={textColor}
                                  fontSize="12">
                                {itemsQuantity}
                            </text>
                        </svg>
                    </button>

                    <div
                        className={`sliding-div2 ${isLightMode ? 'light-sliding-div2' : 'sliding-div2'} ${isDiv2Visible ? 'visible' : 'hidden'}`}>
                        <button className={isLightMode ? "light-div-exit" : "div-exit"} onClick={toggleDiv2}>
                            <img className={"exit-icon"}
                                 src={isLightMode ? LightExitIcon : ExitIcon}
                                 alt={"Exit"}/>
                        </button>
                        <Cart/>
                    </div>

                    <SlideOverlay isDivVisible={isDivVisible}/>
                    <SlideOverlay isDiv2Visible={isDiv2Visible}/>
                </div>

            </div>
        </div>);

}

export default Taskbar;