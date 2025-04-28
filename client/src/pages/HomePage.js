import '../pages/pagestyles/homepage.css';
import '../pages/pagestyles/light-homepage.css';

import Carousel from '../items/Carousel'
import ItemCell from "../items/ItemCell";
import {db} from "../db";
import {useEffect, useState} from 'react';
import {useTheme} from '../ThemeContext';

const GetMoreItems = ({section, data, clickCount, setName, setQuantity, setPrice, setSale, setImages, setDescription}) => {
    const minToRender = 4;
    const maxToRender = Math.floor(data.length / 4) * 4;
    const tryToRender = 4 * (clickCount + 1);
    const nElemToRender = Math.max(minToRender, Math.min(maxToRender, tryToRender))
    const moreItems = data.slice(0, nElemToRender);

    const rowsOfItems = [];
    for (let i = 0; i < moreItems.length; i += 4) {
        rowsOfItems.push(moreItems.slice(i, i + 4));
    }

    return (
        <div>
            {section === "may like" && rowsOfItems.map((row, index) => (
                <div key={index} className="item-row">
                    {row.map((item) => (
                        <ItemCell
                            key={item.id} // Assuming each item has a unique ID
                            itemDescription={item.description}
                            imageSrc={item.images[0]}
                            itemName={item.name}
                            itemCost={item.price}
                            itemSale={item.sale}
                            itemQuantity={item.quantity}
                            itemImages={item.images}
                            setName={setName}
                            setQuantity={setQuantity}
                            setPrice={setPrice}
                            setSale={setSale}
                            setImages={setImages}
                            setDescription={setDescription}
                        />
                    ))}
                </div>
            ))
            }
            {section === "deal" && rowsOfItems.map((row, index) => (
                <div key={index} className="item-row">
                    {row.map((item) => (
                        <ItemCell
                            key={item.id} // Assuming each item has a unique ID
                            itemDescription={item.description}
                            imageSrc={item.images[0]}
                            itemName={item.name}
                            itemCost={item.price}
                            itemSale={item.sale}
                            itemQuantity={item.quantity}
                            itemImages={item.images}
                            setName={setName}
                            setQuantity={setQuantity}
                            setPrice={setPrice}
                            setSale={setSale}
                            setImages={setImages}
                            setDescription={setDescription}
                        />
                    ))}
                </div>
            ))
            }
            {section === "trending" && rowsOfItems.map((row, index) => (
                <div key={index} className="item-row">
                    {row.map((item) => (
                        <ItemCell
                            key={item.id} // Assuming each item has a unique ID
                            itemDescription={item.description}
                            imageSrc={item.images[0]}
                            itemName={item.name}
                            itemCost={item.price}
                            itemSale={item.sale}
                            itemQuantity={item.quantity}
                            itemImages={item.images}
                            setName={setName}
                            setQuantity={setQuantity}
                            setPrice={setPrice}
                            setSale={setSale}
                            setImages={setImages}
                            setDescription={setDescription}
                        />
                    ))}
                </div>
            ))
            }
        </div>
    )
}


function HomePage({setName, setQuantity, setPrice, setSale, setImages, setDescription}) {
    const {isLightMode} = useTheme();
    const [data, setData] = useState([]);
    const [dealsData, setDealsData] = useState([]);
    const [trendingData, setTrendingData] = useState([]);
    const [mayLikeData, setMayLikeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [numItems, setNumItems] = useState(0);
    const [fetchedItems, setFetchedItems] = useState(0); // Keep track of total and shown items in order to not show items we've shown already
    const [bestDealsClickCount, setBestDealsClickCount] = useState(0);
    const [alsoLikeClickCount, setAlsoLikeClickCount] = useState(0);
    const [trendingNowClickCount, setTrendingNowClickCount] = useState(0);

    useEffect(() => {
        const getData = async () => {
            let items = [];
            let dealsItems = [];
            let trendingItems = [];
            let mayLikeItems = [];
            try {
                const snapshot = await db.collection('scraped').get();
                snapshot.docs.forEach(doc => {
                    items.push(doc.data());
                    if (doc.data().section === "may like") {
                        mayLikeItems.push(doc.data());
                    } else if (doc.data().section === "trending") {
                        trendingItems.push(doc.data());
                    } else if (doc.data().section === "deal") {
                        dealsItems.push(doc.data());
                    }
                });
                setIsLoading(false);
                setData(items);
                setDealsData(dealsItems);
                setTrendingData(trendingItems);
                setMayLikeData(mayLikeItems);
                setNumItems(items.length);
            } catch (error) {
                console.error("Error getting data:", error);
                setIsLoading(false);
            }
        }

        getData();
    }, []);



    const handleBestDealsClick = () => {
        setBestDealsClickCount(prevBestDealsClickCount => prevBestDealsClickCount + 1);
    }
    const handleAlsoLikeClick = () => {
        setAlsoLikeClickCount(prevAlsoLikeClickCount => prevAlsoLikeClickCount + 1);
    }
    const handleTrendingNowClick = () => {
        setTrendingNowClickCount(prevTrendingNowClickCount => prevTrendingNowClickCount + 1);
    }


    return (
        <div className={isLightMode ? "light-home-container" : "home-container"}>
            <div className="home-wrapper">
                <div className="home-carousel">
                    <Carousel/>
                </div>
                {isLoading ? (<p>loading...</p>) :

                    <div className="block-container">
                        <div className={isLightMode ? "light-item-container-header" : "item-container-header"}>Today's
                            Best Deals
                        </div>
                        <GetMoreItems section={"deal"} data={dealsData} clickCount={bestDealsClickCount} setName={setName}
                                      setQuantity={setQuantity} setPrice={setPrice} setSale={setSale} setImages={setImages}
                                      setDescription={setDescription}/>
                        <div className="goto-container">
                            <button className={isLightMode ? "light-goto-button" : "goto-button"}
                                    onClick={handleBestDealsClick}>See More
                            </button>
                        </div>
                    </div>
                }

                <div className="block-container">
                    <div className={isLightMode ? "light-item-container-header" : "item-container-header"}>You May Also
                        Like
                    </div>
                    <GetMoreItems section={"may like"} data={mayLikeData} clickCount={alsoLikeClickCount} setName={setName}
                                  setQuantity={setQuantity} setPrice={setPrice} setSale={setSale} setImages={setImages}
                                  setDescription={setDescription}/>
                    <div className="goto-container">
                        <button className={isLightMode ? "light-goto-button" : "goto-button"}
                                onClick={handleAlsoLikeClick}>See More
                        </button>
                    </div>
                </div>

                <div className="block-container">
                    <div className={isLightMode ? "light-item-container-header" : "item-container-header"}>Trending
                        Now
                    </div>
                    <GetMoreItems section={"trending"} data={trendingData} clickCount={trendingNowClickCount} setName={setName}
                                  setQuantity={setQuantity} setPrice={setPrice} setSale={setSale} setImages={setImages}
                                  setDescription={setDescription}/>
                    <div className="goto-container">
                        <button className={isLightMode ? "light-goto-button" : "goto-button"}
                                onClick={handleTrendingNowClick}>See More</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HomePage;