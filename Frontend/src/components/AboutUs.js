
import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-6 sm:flex items-center mt-6">
      <div className="sm:w-1/2 p-5">
        <div className="image object-center text-center">
          <img className="rounded-lg shadow-lg transition-transform transform hover:scale-105 h-64 md:h-80 object-cover" src="images/DepartureStation.webp" alt="About Us" />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-gray-500 border-b-2 border-sky-600 uppercase tracking-wide">About Us</span>
          <h2 className="my-4 font-bold text-3xl sm:text-4xl">
            About <span className="text-sky-500">Our Company</span>
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, commodi
            doloremque, fugiat illum magni minus nisi nulla numquam obcaecati placeat quia, repellat tempore
            voluptatum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
