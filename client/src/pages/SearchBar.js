import React, {useState, useEffect} from 'react';

import SearchIcon from "../images/searchtool_icon.svg";
import LightSearchIcon from '../images/lightmode/light-searchtool_icon.svg'

import {useNavigate} from "react-router-dom";
import SearchItem from "../items/SearchItem";
import {db} from "../config/Config";
import {useTheme} from "../ThemeContext";

import "./pagestyles/searchbar.css";
import "./pagestyles/light-searchbar.css";

function SearchBar({searchInput, setSearchInput}) {
    const {isLightMode} = useTheme();
    // const [input, setSearchInput] = useState('');
    const [items, setItems] = useState([]);
    const [updated, setUpdated] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection("scraped").get();
            setItems(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);


    const handleChange = (event) => {
        setSearchInput(event.target.value);

        // fetchData(value);
    }

    const filteredItems = items && items.length > 0 ? items.filter(item =>
        item.name && item.name.toLowerCase().includes(searchInput.toLowerCase())
    ) : [];

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setUpdated(searchInput);
            navigate("/results");
            // const propValue = searchInput;
            // externalFunction(propValue);
        }
    }


    return (
        <>
            <div className={isLightMode ? "light-search-func-container" : "search-func-container"}>
                <div className="search-func-wrapper">
                    <div className="search-func-header">
                        <span className={isLightMode ? "light-search-bar-title" : "search-bar-title"}>Search</span>
                    </div>

                    <div className="search-func-bar">
                        <input className={isLightMode ? "light-search-func-input" : "search-func-input"}
                               id="searchInput"
                               placeholder="Search products"
                               name="searchInput"
                               type="text"
                               value={searchInput}
                               onChange={handleChange}
                               onKeyDown={handleKeyDown}
                        />
                        <button className={isLightMode ? "light-search-button" : "search-button"}
                                onClick={() => navigate("/results")}>
                            <img className={"search-icon"} src={isLightMode ? LightSearchIcon : SearchIcon}
                                 alt={"Search Glass"}/>
                        </button>
                        {/* {searchInput.trim() !== '' && (
                        <div classname="test-output">
                         {filteredItems.map(item => (
                        <SearchItem key={item.id} ItemName={item.name} ItemCost={item.cost} />
                        ))}</div>)} */}
                    </div>
                    {searchInput.trim() !== '' && (
                        <div className="search-result-container">
                            {filteredItems.map(item => (
                                <React.Fragment key={item.id}>
                                    <SearchItem
                                        key={item.id}
                                        ItemName={item.name}
                                        ItemCost={item.price}
                                        ItemImage={item.images[0]}
                                    />
                                    {(item + 1) % 2 === 0 && <div className="row-spacing"/>}
                                </React.Fragment>
                            ))}
                        </div>)}

                    <div className="test-output">
                        {/*<h3>searchInput: {searchInput}</h3>*/}
                        {/*<h3>Updated: {updated}</h3>*/}
                    </div>
                </div>
            </div>
        </>

    );
}

export default SearchBar;
