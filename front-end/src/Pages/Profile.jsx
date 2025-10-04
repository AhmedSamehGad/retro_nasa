import React from 'react';

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-[#10001D] font-sans text-white overflow-hidden">
      {/* Top Background Section (Dark Purple Gradient) */}
      {/* This mimics the top section's gradient and shape without the nav items */}
      <div className="relative h-[250px] md:h-[300px] lg:h-[350px] bg-gradient-to-b from-[#25004A] to-[#10001D] w-full rounded-b-[40px] shadow-xl">
        {/* Profile Header within the gradient area */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[120px] md:top-[150px] flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 w-full max-w-4xl px-4">
          {/* Avatar Container */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center shadow-lg border-[6px] border-[#25004A] transition-transform duration-300 transform hover:scale-105">
            {/* Astronaut Image - Use the actual image from the link */}
            <img
              src="https://framerusercontent.com/images/3m59xM9v3JqjXk7Jt1m0u1m0u.png"
              alt="User Avatar"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          {/* User Info */}
          <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">User 1</h1>
            <p className="text-lg md:text-xl text-purple-200 font-light italic mt-1">
              Hello! I am into discovering the universe
            </p>
          </div>
        </div>

        {/* Edit Button - Positioned relative to the overall top section */}
        <button className="absolute top-6 right-6 md:top-10 md:right-10 bg-[#5A2E8C] p-3 rounded-full shadow-md hover:bg-[#4a2473] transition duration-300 z-10">
          {/* Edit Icon */}
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-6.574 6.574A1 1 0 009 12h4a1 1 0 001-1V8a1 1 0 00-1-1H9a1 1 0 00-1 1v4z" />
          </svg>
        </button>
      </div>

      {/* Content Sections (History & Favourites) */}
      <div className="relative z-0 grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-10 lg:px-16 pb-16 pt-24 -mt-16 md:-mt-20"> {/* Adjusted padding-top to bring cards up */}
        {/* History Card */}
        <div className="bg-[#2A0054] rounded-xl p-8 shadow-2xl border border-[#4A007C] flex flex-col items-center justify-center min-h-[200px] transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-center tracking-wide">History</h2>
          <p className="text-purple-200 text-center text-opacity-80 font-light">Your journey through the cosmos...</p>
        </div>
        {/* Favourites Card */}
        <div className="bg-[#2A0054] rounded-xl p-8 shadow-2xl border border-[#4A007C] flex flex-col items-center justify-center min-h-[200px] transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-center tracking-wide">Favourites</h2>
          <p className="text-purple-200 text-center text-opacity-80 font-light">Stars, galaxies, and nebulae you love...</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;