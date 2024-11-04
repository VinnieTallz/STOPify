import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-6 sm:flex items-center">
      <div className="sm:w-1/2 p-5">
        <div className="image object-center text-center">
          <img className="rounded-lg shadow-lg transition-transform transform hover:scale-105" src="/images/Brainstorm.gif" alt="Contact Us" />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-gray-500 border-b-2 border-sky-600 uppercase">Contact Us</span>
          <form className="space-y-6 my-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                placeholder="Email address..."
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your Message</label>
              <textarea
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-red-500 focus:border-red-500"
                placeholder="Leave a comment..."
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full sm:w-40 bg-sky-500 text-white px-6 py-3 font-semibold rounded-md hover:bg-red-600 transition duration-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
