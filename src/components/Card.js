import React from 'react';

const Card = () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

    return (
        <div className="h-64 w-90 border border-gray-300 rounded-lg p-2 overflow-hidden">
            <ul className="list-none m-0 p-0 max-h-64 overflow-y-auto">
                {items.map((item, index) => (
                    <li key={index} className="py-1 hover:bg-gray-100">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Card;
