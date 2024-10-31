import React from 'react';

  const Contact = () => {
    return (
        <div className="sm:flex items-center max-w-screen-xl">
        <div className="sm:w-1/2 p-10">
            <div className="image object-center text-center">
                <img className='rounded-lg' src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" alt="contact us"/>
            </div>
        </div>
        <div className="sm:w-1/2 p-5">
            <div className="text">
                <span className="text-gray-500 border-b-2 border-blue-600 uppercase">Contactt us</span>
                <form className="space-y-8 my-10" action="" method="post">
               <div>
                     <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                     <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Email address..." required/>
                 </div>
                 <div>
                     <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                     <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required/>
                 </div>
                 <div className="sm:col-span-2">
                     <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                     <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                 </div>
                    
                 <button type="submit" className="w-40 bg-blue-500 text-white px-6 py-3 font-xl rounded-md sm:mb-0">Send Message</button>
                    
             </form>      
            </div>
        </div>
    </div>
    );
  };
  
  export default Contact;