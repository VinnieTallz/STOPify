import React, { useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const formRef = React.useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setEmail('');
    setSubject('');
    setMessage('');
    if (formRef.current) {
      formRef.current.reset();
    }

    //e.target.reset();
  };



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
          <form className="space-y-6 my-8" ref={formRef} onSubmit={handleSubmit}>
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

            {showPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                  <div className="flex flex-col items-center">
                    <div className="bg-sky-500 rounded-full p-2 mb-4 absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                    <p className="text-gray-600 mb-4 text-center">Your message has been Succesfully Submitted. Thanks!</p>
                    <button onClick={closePopup} className="w-full sm:w-40 bg-sky-500 text-white px-6 py-2 rounded-md hover:bg-sky-900 transition duration-200">OK</button>
                  </div>
                </div>
              </div>
            )}
            <button type="submit" className="w-full sm:w-40 bg-sky-500 text-white px-6 py-3 font-semibold rounded-md hover:bg-sky-900 transition duration-200">
              Send Message
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
