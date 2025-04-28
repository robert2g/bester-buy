import React, {useState} from "react";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Users from "./Users";
import Inventory from "./Inventory";
import {useTheme} from "../ThemeContext";

import './adminstyles/admindash.css';
import './adminstyles/light-admindash.css';

function AdminDashboard() {
    const { isLightMode } = useTheme();
    const [selectedComponent, setSelectedComponent] = useState('dashboard');
    const handleSidebarItemClick = (componentName) => {
        setSelectedComponent(componentName);
    };

    return (
        <div className={isLightMode ? "light-admin-dash-container" : "admin-dash-container"}>
            <div className="admin-dash-wrapper">
                <AdminHeader/>
                <Sidebar handleItemClick={handleSidebarItemClick} />
                <div className="admin-dash-content">
                    {selectedComponent === 'dashboard' && <Dashboard/>}
                    {selectedComponent === 'orders' && <Orders/>}
                    {selectedComponent === 'users' && <Users/>}
                    {selectedComponent === 'inventory' && <Inventory/>}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;