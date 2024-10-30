import React from 'react';

  const Footer = () => {
    return (
      <footer className="bg-gray-600 text-white h-40 py-10 mt-10 flex items-center justify-center">
        <p className="text-center">
          &copy; {new Date().getFullYear()} STOPify. All rights reserved.
        </p>
      </footer>
    );
  };
  
  export default Footer;
  