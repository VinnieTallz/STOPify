import React from 'react';

import { useState } from 'react';
import { Transition } from '@headlessui/react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="bg-cover bg-center opacity-75"
        style={{ backgroundImage: `url('images/DepartureStation.webp')` }}
      >
        <header className="flex justify-between items-center p-4 bg-white opacity-90 shadow-md sticky top-0 z-50">
          <div className="text-black text-xl font-bold">STOPify</div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>

          {/* Desktop menu */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {['Home', 'Contact Us', 'About Us', 'Login', 'Sign Up'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-black hover:underline transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Mobile menu */}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <nav className="md:hidden bg-white shadow-md rounded-lg p-4">
            <ul className="flex flex-col space-y-4">
              {['Home', 'Contact Us', 'About Us', 'Login', 'Sign Up'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-black hover:underline transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Transition>

        {/* Main Content Section */}
        <main className="flex-grow flex flex-col items-center justify-center h-80">
          <div className="text-center p-6 rounded-lg">
            <h2 className="text-black text-3xl font-semibold mb-4">STOPify</h2>
            <p className="mb-6 font-semibold">Find what you're looking for:</p>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search your bus..."
                className="border border-gray-300 rounded-full p-2 w-80"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Header;
