import React, { useState } from 'react';

function Filter({ onFilterChange }) {
    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterValue(value);
        onFilterChange(value);
    };

    return (
        <div className="filter">
            <input
                type="text"
                placeholder="Filter by preference"
                value={filterValue}
                onChange={handleFilterChange}
            />
        </div>
    );
}

export default Filter;