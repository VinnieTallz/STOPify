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
          <div className='flex items-center'>
          <img src='/images/bustop_blue.png' style={{ width: '20px' }} alt="Bus Stop Icon" />
          <div className="text-black text-xl md:text-2xl text-center ml-2 font-bold stopify-title">STOPify</div>
          </div>
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
            <span className="text-black border-b-2 border-transparent hover:border-red-500 transition duration-200 relative inline-block">
            <span className="absolute left-0 right-0 bottom-0 border-b-2 border-red-500 opacity-0 hover:opacity-100 transition duration-200" />
                  <a href={`#${item.toLowerCase().replace(' ', '')}`}>
                    {item}
                  </a>
            </span>
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
                    <span className="text-black border-b-2 border-transparent hover:border-red-500 transition duration-200 relative inline-block">
                    <span className="absolute left-0 right-0 bottom-0 border-b-2 border-red-500 opacity-0 hover:opacity-100 transition duration-200" />
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                  >
                    {item}
                  </a>
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </Transition>

        {/* Main Content Section */}
        <main className="flex-grow flex flex-col items-center justify-center h-80">
          <div className="text-center p-6 rounded-lg">
      
          </div>
        </main>
      </div>
    </div>
  );
};

export default Header;
