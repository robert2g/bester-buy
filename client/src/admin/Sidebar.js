import React from "react";
import {useTheme} from "../ThemeContext";

function Sidebar({openSidebarToggle, handleItemClick}) {
    const { isLightMode } = useTheme();
    return (
        <aside id={isLightMode ? "light-admin-sidebar" : "admin-sidebar"} className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className={isLightMode ? "light-admin-sidebar-header" : "admin-sidebar-header"}>
                <div className={isLightMode ? "light-admin-sidebar-title" : 'admin-sidebar-title'}>
                    Directory
                </div>
            </div>

            <div className='sidebar-list'>
                <button className={isLightMode ? "light-sidebar-list-item" : 'sidebar-list-item'}
                        onClick={() => handleItemClick('dashboard')}>Dashboard</button>
                <button className={isLightMode ? "light-sidebar-list-item" : 'sidebar-list-item'}
                        onClick={() => handleItemClick('orders')}>Orders</button>
                <button className={isLightMode ? "light-sidebar-list-item" : 'sidebar-list-item'}
                        onClick={() => handleItemClick('users')}>Users</button>
                <button className={isLightMode ? "light-sidebar-list-item" : 'sidebar-list-item'}
                        onClick={() => handleItemClick('inventory')}>Inventory</button>
            </div>

        </aside>
    );
}
export default Sidebar;