import React from 'react';
import emuImg from '../assets/emu.jpg';

function UserProfile() {
  // 1. Retrieve data from localStorage (set by your LoginPage)
  const userName = localStorage.getItem("userName") || "Guest User";
  const userPosition = localStorage.getItem("userPosition") || "Position Not Set";
  const userEID = localStorage.getItem("userEID") || "N/A";
  const userPhoto = localStorage.getItem("userPhoto");
  const userEmail = localStorage.getItem("userEmail" || 'No Email Found');
  const userPhone = localStorage.getItem("userphone" || 'No Phone Number Found');

  // 2. Prepare the stats array dynamically
  const stats = [
    { label: "Eid", value: userEID },
    { label: "Email", value: userEmail },
    { label: "Phone", value: userPhone },
    
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#011a11]">
      {/* Card Container */}
      <div className="relative w-full max-w-md bg-gray-800 shadow-xl rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
        
        {/* Cover Image Section */}
        <div 
          className="h-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${emuImg})` }}
        />

        {/* Profile Details Section */}
        <div className="relative px-6 -mt-20">
          
          {/* Profile Picture - Uses the URL from the Google Sheet */}
          <div className="flex justify-center">
            <img 
              className="w-32 h-32 rounded-full border-4 border-gray-800 shadow-md object-cover bg-gray-700"
              src={userPhoto || "https://via.placeholder.com/150"} 
              alt={userName}
            />
          </div>

          {/* User Info */}
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-white">{userName}</h2>
            <p className="text-green-400 font-medium">{userPosition}</p>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col items-center mt-6 space-y-4 border-t pt-6 border-gray-700 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</p>
                <p className="font-bold text-white text-lg">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;