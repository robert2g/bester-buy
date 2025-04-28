import React, {useEffect, useState} from 'react';

import ItemSlab from './ItemSlab';
import {useTheme} from "../ThemeContext";
import {db} from '../db';
import './itemstyles/itemlist.css'
import './itemstyles/light-itemlist.css'

const scrapedRef = db.collection('scraped');

function ItemList({
                      filter,
                      maxItems,
                      department,
                      category,
                      brand,
                      setName,
                      setQuantity,
                      setImages,
                      setPrice,
                      setSale,
                      setDescription,
                      sortAlpha,
                      sortLowest,
                      sortHighest,
                      sortAvail
                  }) {
    const {isLightMode} = useTheme();
    const itemsPerPage = 20;

    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);
    const [didMount, setDidMount] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setDidMount(true);
        const start = (currentPage - 1) * itemsPerPage + 1;
        const end = Math.min(start + itemsPerPage - 1, maxItems);

        async function getItems() {
            let tmpItems = [];

            if (category != null) {
                await scrapedRef.where('category', '==', category).get().then(res => {
                    res.forEach(res => {
                        tmpItems.push({
                            name: res.data().name,
                            price: res.data().price,
                            sale: res.data().sale,
                            image: res.data().images[0],
                            quantity: res.data().quantity,
                            description: res.data().description,
                            images: res.data().images
                        });
                    });
                });
            } else if (brand != null) {
                await scrapedRef.where('brand', '==', brand).get().then(res => {
                    res.forEach(res => {
                        tmpItems.push({
                            name: res.data().name,
                            price: res.data().price,
                            sale: res.data().sale,
                            image: res.data().images[0],
                            quantity: res.data().quantity,
                            description: res.data().description,
                            images: res.data().images
                        });
                    });
                });
            } else if (department != null) {
                await scrapedRef.where('department', '==', department).get().then(res => {
                    res.forEach(res => {
                        tmpItems.push({
                            name: res.data().name,
                            price: res.data().price,
                            sale: res.data().sale,
                            image: res.data().images[0],
                            quantity: res.data().quantity,
                            description: res.data().description,
                            images: res.data().images
                        });
                    });
                });
            } else if (filter != null) {
                await scrapedRef.get().then(res => {
                    res.forEach(res => {
                        if (res.data().name.toLowerCase().includes(filter.toLowerCase())) {
                            tmpItems.push({
                                name: res.data().name,
                                price: res.data().price,
                                sale: res.data().sale,
                                image: res.data().images[0],
                                quantity: res.data().quantity,
                                description: res.data().description,
                                images: res.data().images
                            });
                        }
                    });
                });

            }

            // Sorting logic
            if (sortAlpha) {
                tmpItems = [...tmpItems].sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortLowest) {
                tmpItems = [...tmpItems].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            } else if (sortHighest) {
                tmpItems = [...tmpItems].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            } else if (sortAvail) {
                tmpItems = [...tmpItems].sort((a, b) => parseFloat(a.quantity) - parseFloat(b.quantity));
            }
            setTotalPages(Math.ceil(tmpItems.length / itemsPerPage));
            setItems(tmpItems.slice(start - 1, end));
        }

        getItems().catch(e => console.error("Failed to get items: ", e));
    }, [currentPage, didMount, sortAlpha, sortAvail, sortHighest, sortLowest, category, brand, department, filter]);

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);

        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button className={isLightMode ? "light-list-num-button" : "list-num-button"} key={i}
                        onClick={() => changePage(i)} disabled={i === currentPage}>
                    {i}
                </button>
            );
        }
        return pageButtons;
    };

    return (
        <div className="item-list-wrapper">
            <div className="item-list">
                {items.map((item, index) => (
                    <ItemSlab name={item.name} price={item.price} sale={item.sale} imageSrc={item.image} images={item.images}
                              quantity={item.quantity} description={item.description} setName={setName}
                              setQuantity={setQuantity} setImages={setImages} setPrice={setPrice} setSale={setSale}
                              setDescription={setDescription}/>
                ))}
            </div>
            <div className="item-list-pagination">
                <button className={isLightMode ? "light-list-side-button" : "list-side-button"}
                        onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                </button>
                {renderPageButtons()}
                <button className={isLightMode ? "light-list-side-button" : "list-side-button"}
                        onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default ItemList;