import React from 'react';

const TransitInfo = () => {
    return (
        <div className="p-4 justify-center items-center bg-white shadow-md rounded-lg">
            {/* <h2 className="text-xl font-bold mb-2">Transit Information</h2>
            <p>Stay updated with the latest transit schedules, routes, and alerts.</p> */}
            <ul className="list-disc ml-5 mt-2">
                <li>Real-time arrival information</li>
                <li>Service alerts and updates</li>
                <li>Route planning assistance</li>
            </ul>
            
        </div>
    );
};

export default TransitInfo;


