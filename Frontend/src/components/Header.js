import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faPeopleGroup, faEnvelope } from '@fortawesome/free-solid-svg-icons';



const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>

      <header className="flex justify-between items-center p-4 bg-sky-500 opacity-90 shadow-md sticky top-0 z-50">
        <div className='flex items-center'>
          <img src='/images/bustop_white.webp' style={{ width: '20px' }} alt="Bus Stop Icon" />
          <div className="text-white text-xl sm:text-3xl text-center ml-2 font-bold stopify-title">STOPify</div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        <nav className="hidden md:block">
          <ul className="flex space-x-6 sm:text-xl">
            {[
              { name: 'Map', to: '/map', icon: faMapLocationDot },
              { name: 'About Us', to: '/about-us', icon: faPeopleGroup },
              { name: 'Contact Us', to: '/contact-us', icon: faEnvelope },
            ].map(({ name, to, icon }) => (
              <li key={name}>
                <Link
                  to={to}
                  className="text-white border-b-2 border-transparent hover:border-white-500 transition duration-200 relative inline-block"
                >
                  <span className="absolute left-0 right-0 bottom-0 border-b-2 border-white-500 opacity-0 hover:opacity-100 transition duration-200" />
                  <span className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={icon} />
                    <span>{name}</span>
                  </span>
                </Link>
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
            {[
              { name: 'Map', to: '/' },
              { name: 'About Us', to: '/about-us' },
              { name: 'Contact Us', to: '/contact-us' },
            ].map(({ name, to }) => (
              <li key={name}>
                <Link
                  to={to}
                  className="text-black border-b-2 border-transparent hover:border-sky-500 transition duration-200 relative inline-block"
                >
                  <span className="absolute left-0 right-0 bottom-0 border-b-2 border-sky-500 opacity-0 hover:opacity-100 transition duration-200" />
                  <span>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Transition>
    </div>

  );
};

export default Header;
