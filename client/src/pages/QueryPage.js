import React, {useEffect, useState} from 'react';
import ItemList from '../items/ItemList';
import {useTheme} from "../ThemeContext";

import '../pages/pagestyles/querypage.css';
import '../pages/pagestyles/light-querypage.css';
import {safePreventDefault} from "react-slick/lib/utils/innerSliderUtils";
import {useNavigate} from "react-router-dom";

function QueryPage({queryPageSelection, category, setName, setQuantity, setImages, setPrice, setSale, setDescription}) {
    const [selectedOption, setSelectedOption] = useState("");
    const {isLightMode} = useTheme();
    const navigate = useNavigate();
    const [sortAlpha, setSortAlpha] = useState(false);
    const [sortAvail, setSortAvail] = useState(false);
    const [sortLowest, setSortLowest] = useState(false);
    const [sortHighest, setSortHighest] = useState(false);

    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;

        if (selectedValue === 'Option 1') {
            setSortAlpha(true);
            setSortAvail(false);
            setSortLowest(false);
            setSortHighest(false);
        } else if (selectedValue === 'Option 2') {
            setSortAvail(true);
            setSortAlpha(false);
            setSortLowest(false);
            setSortHighest(false);
        } else if (selectedValue === 'Option 3') {
            setSortLowest(true);
            setSortAlpha(false);
            setSortAvail(false);
            setSortHighest(false);
        } else if (selectedValue === 'Option 4') {
            setSortHighest(true);
            setSortAlpha(false);
            setSortAvail(false);
            setSortLowest(false);
        }

        setSelectedOption(selectedValue);
        event.preventDefault();
    };

    useEffect(() => {
        // console.log("Query Page Selection:", queryPageSelection);
        // console.log("Category:", category);
        // console.log("Sort Alpha:", sortAlpha);
        // console.log("Sort Avail:", sortAvail);
        // console.log("Sort Lowest:", sortLowest);
        // console.log("Sort Highest:", sortHighest);

        // Check if parameters are null, empty strings, or empty arrays, indicating a page refresh
        const isPageRefreshed =
            (queryPageSelection === null || queryPageSelection === '') &&
            (category === null || category === '') &&
            !sortAlpha &&
            !sortAvail &&
            !sortLowest &&
            !sortHighest;

        console.log("Is Page Refreshed:", isPageRefreshed);

        if (isPageRefreshed) {
            // Redirect to the homepage or perform other actions as needed
            navigate("/");
        }
    }, [queryPageSelection, category, sortAlpha, sortAvail, sortLowest, sortHighest]);

    return (
        <div className={isLightMode ? "light-query-container" : "query-container"}>
            <div className="query-wrapper">
                <div className="query-header">
                    <span className={isLightMode ? "light-content-header" : "content-header"}>Showing Category: {category}</span>
                </div>

                <div className="dropdown-container">
                    <span className={isLightMode ? "light-sorting-by" : "sorting-by"}>Sort by: </span>
                    <select className={isLightMode ? "light-sorting-dropdown" : "sorting-dropdown"}
                            value={selectedOption} onChange={handleOptionChange}>
                        <option value="Option 1" >Alphabetical</option>
                        <option value="Option 2">Availability</option>
                        <option value="Option 3">Lowest Price</option>
                        <option value="Option 4">Highest Price</option>
                    </select>
                </div>

                <div className={isLightMode ? "light-query-body" : "query-body"}>
                    <ItemList
                        category={queryPageSelection}
                        maxItems={100}
                        setName={setName}
                        setQuantity={setQuantity}
                        setImages={setImages}
                        setPrice={setPrice}
                        setSale={setSale}
                        setDescription={setDescription}
                        sortAlpha={sortAlpha}
                        sortLowest={sortLowest}
                        sortHighest={sortHighest}
                        sortAvail={sortAvail}
                    />
                </div>
            </div>
        </div>
    );
}

export default QueryPage;