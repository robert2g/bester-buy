import React from "react";
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs';

function AdminHeader({OpenSidebar}) {

    return (
        <header className="admin-dash-header">
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar} />
            </div>
        </header>
    );
}

export default AdminHeader;