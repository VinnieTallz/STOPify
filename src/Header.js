import React from 'react';

const Header = () => {
    return (
        <div>
        <header className="flex justify-between items-center p-4 bg-white opacity-50 shadow-md">
            <div className="text-black text-xl font-bold">
               STOPIFY
            </div>
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <a href="#signup" className="text-black hover:underline">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#signup" className="text-black hover:underline">
                            Contact Us
                        </a>
                    </li>
                    <li>
                        <a href="#login" className="text-black hover:underline">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="#signup" className="text-black hover:underline">
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
        <main className="flex-grow flex flex-col items-center justify-center bg-cover bg-center h-3/4" style={{ backgroundImage: "url('../public/images/DepartureStation.jpg')" }}> {/* Replace with your image URL */}
        <div className="text-center bg-white bg-opacity-70 p-6 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">Welcome to Our Site</h2>
          <p className="mb-6">Find what you're looking for:</p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-l-md p-2 w-64"
            />
            <button className="bg-blue-500 text-white rounded-r-md px-4">
              Search
            </button>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Header;
