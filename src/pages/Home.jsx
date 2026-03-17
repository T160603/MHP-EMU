import React, { useState, useEffect } from 'react';
import Navbar from '../components/Nav';
import EquipmentCards from '../components/equipmentCard';
import Footer from '../components/footer';

export default function Home() {
  const [userData, setUserData] = useState({ name: "Guest", eid: "000" });

  useEffect(() => {
    // Retrieve the data we stored during login
    const storedName = localStorage.getItem("userName");
    const storedEID = localStorage.getItem("userEID");

    if (storedName && storedEID) {
      setUserData({
        name: storedName,
        eid: storedEID
      });
    }
  }, []);

  return (
    <div className="bg-[#011a11] min-h-screen"> 
      <Navbar />
      
      <div className="flex justify-center items-center py-6">
        <p className="text-xl font-semibold text-white">
          Welcome {userData.name}, EID: {userData.eid}
        </p>
      </div>

      <div className="container mx-auto px-4">
        <EquipmentCards />
      </div>

      <Footer />
    </div>
  );
}
