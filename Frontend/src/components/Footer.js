import React from 'react';

  const Footer = () => {
    return (
      <footer className="bg-sky-500 text-white p-5 flex items-center justify-center">
        <p className="text-center">
          &copy; {new Date().getFullYear()} STOPify. All rights reserved.
        </p>
      </footer>
    );
  };
  
  export default Footer;
  