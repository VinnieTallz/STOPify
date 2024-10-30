import React from 'react';

const Header = () => {
    return (
        <div>
        <div className='bg-cover bg-center opacity-75' style={{backgroundImage: `url('images/DepartureStation.webp')`}}> 
        <header className="flex justify-between items-center p-4 bg-white opacity-50 shadow-md">
            <div className="text-black text-xl font-bold">
            STOPify
            </div>
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <a href="#home" className="text-black hover:underline">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="text-black hover:underline">
                            Contact Us
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="text-black hover:underline">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="#login" className="text-black hover:underline">
                            Login
                        </a>
                    </li>
                    <li>
                        <a href="#signup" className="text-black hover:underline">
                            Sign Up
                        </a>
                    </li>
                </ul>
            </nav>
        </header>

        {/* hero section*/}
        <main className="flex-grow flex flex-col items-center justify-center h-80"> 
        <div className="text-center  p-6 rounded-lg">
        <h2 className=" text-black text-3xl font-semibold mb-4">STOPify</h2>
        <p className="mb-6 font-semibold">Find what you're looking for:</p>
        <div className="flex justify-center">      
            <input
            type="text"
            placeholder="Search your bus..."
            className="border border-gray-300 rounded-full p-2 w-80"
            />
            {/* <button className="bg-blue-500 text-white rounded-r-md px-4">
            Search
            </button> */}
        </div>
        </div>
    </main>
    </div>
    </div>    
);
};

export default Header;
