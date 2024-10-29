import React from 'react';

const Header = () => {
    return (
        <div>
        <header className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
            <div className="text-white text-xl font-bold">
                Your Logo
            </div>
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <a href="#login" className="text-white hover:underline">
                            Login
                        </a>
                    </li>
                    <li>
                        <a href="#signup" className="text-white hover:underline">
                            Sign Up
                        </a>
                    </li>
                </ul>
            </nav>
        </header>

        {/* hero section*/}
        <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 py-20"> {/* Changed to h-screen */}
        <div className="text-center">
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
