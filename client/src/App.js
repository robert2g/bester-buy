import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Taskbar from './Taskbar';
import Footer from './Footer';

import './styles/dark-taskbar.css';
import './styles/light-taskbar.css';

import './styles/footer.css';
import './styles/light-footer.css';

import './styles/fonts.css';

import HomePage from './pages/HomePage';
import NoPage from './pages/NoPage';
import SearchResults from "./pages/SearchResults";
import AdminDashboard from "./admin/AdminDashboard";
import Account from './pages/Account';
import AccountLoggedin from './pages/AccountLoggedin';
import QueryPage from './pages/QueryPage';
import ItemPage from './pages/ItemPage'
import Inventory from './admin/Inventory';
import Orders from "./admin/Orders";
import Users from "./admin/Users";
import BrandPage from "./pages/BrandPage";
import DepartmentPage from "./pages/DepartmentPage";

import {useTheme} from './ThemeContext';

function AnnouncementHeader() {
    const {isLightMode} = useTheme();

    return (
        <div className={isLightMode ? "light-header-container" : "header-container"}>
            <p className={isLightMode ? "light-announcement-text" : "announcement-text"}>Use code <span className="bold-this-text">BEST23</span> for 15% off!</p>
        </div>
    );
}

function App() {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [sale, setSale] = useState("");
    const [images, setImages] = useState([]);
    const [queryPageSelection, setQueryPageSelection] = useState("");
    const [brandPageSelection, setBrandPageSelection] = useState("");
    const [departmentPageSelection, setDepartmentPageSelection] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [department, setDepartment] = useState("");
    const [searchInput, setSearchInput] = useState("");

    return (
        <div className="app-container scrollbarStyles">
            <Router>
                <AnnouncementHeader/>
                <Taskbar setDepartmentPageSelection={setDepartmentPageSelection}
                         setQueryPageSelection={setQueryPageSelection}
                         setBrandPageSelection={setBrandPageSelection}
                         setDepartment={setDepartment}
                         setCategory={setCategory}
                         setName={setName}
                         setQuantity={setQuantity}
                         setPrice={setPrice}
                         setSale={setSale}
                         setImages={setImages}
                         setDescription={setDescription}
                         searchInput={searchInput}
                         setSearchInput={setSearchInput}
                />
                <Routes>
                    <Route path="/" element={<HomePage setName={setName} setQuantity={setQuantity} setPrice={setPrice} setSale={setSale}
                                                       setImages={setImages} setDescription={setDescription}/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/accountloggedin" element={<AccountLoggedin/>}/>
                    <Route path="/nopage" element={<NoPage/>}/>
                    <Route path="/querypage"
                           element={<QueryPage queryPageSelection={queryPageSelection} setName={setName}
                                               setQuantity={setQuantity} setPrice={setPrice} setSale={setSale} setImages={setImages}
                                               setDescription={setDescription} category={category}/>}/>
                    <Route path="/brandpage"
                           element={<BrandPage brandPageSelection={brandPageSelection} setName={setName}
                                               setQuantity={setQuantity} setPrice={setPrice} setSale={setSale} setImages={setImages}
                                               setDescription={setDescription}/>}/>
                    <Route path="/departmentpage"
                           element={<DepartmentPage departmentPageSelection={departmentPageSelection} setName={setName}
                                                   setQuantity={setQuantity} setPrice={setPrice} setSale={setSale} setImages={setImages}
                                                   setDescription={setDescription} department={department}/>}/>
                    <Route path="/itempage"
                           element={<ItemPage name={name} quantity={quantity} price={price} sale={sale} images={images}
                                              description={description}/>}/>
                    <Route path="/results"
                           element={<SearchResults searchInput={searchInput} setSearchInput={setSearchInput} setName={setName}
                                                   setQuantity={setQuantity} setPrice={setPrice} setSale={setSale} setImages={setImages}
                                                   setDescription={setDescription}/>}/>
                    <Route path="/admin" element={<AdminDashboard/>}/>
                    <Route path="/inventory" element={<Inventory/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/users" element={<Users/>}/>
                </Routes>
                <Footer/>
            </Router>
        </div>

    );

}



export default App;
