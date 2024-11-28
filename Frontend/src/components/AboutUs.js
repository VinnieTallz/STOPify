
import React from 'react';

const AboutUs = () => {
  return (
    <div className=" sm:p-6 sm:flex items-center  sm:flex-col">
      <div className=" sm:p-6 sm:flex items-center  sm:flex-row">

        <div className="sm:w-1/2 px-3">
          <div className="image object-center text-center">
            <img className="rounded-lg shadow-lg transition-transform transform hover:scale-105 h-fit sm:h-fit object-cover" src="images/DepartureStation.webp" alt="About Us" />
          </div>
        </div>
        <div className="sm:w-3/4 px-3">
          <div className="text">

            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              About <span className="text-sky-500">Our Website</span>
            </h2>
            <p className=" text-xl text-gray-700 leading-relaxed">
              Our mission is to empower seniors and travelers to confidently explore Calgary by offering an intuitive,
              icon-driven transit experience that breaks down language barriers and simplifies public transportation for all.
              We are dedicated to inclusivity and accessibility, focusing on developing a user-friendly web-based app that
              provides easy navigation through Calgary’s transit system. By prioritizing icon-based design, our app ensures
              that users, regardless of language or familiarity, can travel with independence and ease, transforming public
              transit into a simple and empowering experience.
            </p>
          </div>
        </div>

      </div>

      <div className=" sm:p-6 sm:flex items-center sm:flex-row-reverse">

        <div className="sm:w-1/2 px-3">
          <div className="image object-center text-center">
            <img className="rounded-lg shadow-lg transition-transform transform hover:scale-105 h-fit sm:h-fit object-cover" src="images/team4.jpeg" alt="Team 4 InceptionU" />
          </div>
        </div>
        <div className="sm:w-3/4 px-3">
          <div className="text">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              About <span className="text-sky-500">Our Team</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our team is a collaborative and diverse group of full-stack developers currently enrolled in the Full Stack Development course
              at InceptionU, each bringing unique strengths and expertise to the project.
              Although each member has areas of specialization, we have all engaged in every aspect of this full-stack project, working collaboratively
              to learn, contribute, and support each other as a cohesive unit. Together, we're committed to building a solution that embodies our shared
              passion for inclusivity, empowerment, and innovation in technology.

            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
