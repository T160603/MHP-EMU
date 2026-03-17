import React, { useEffect, useState } from 'react';

const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your actual Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6t_GgXp2VuNQSyYWit4w5OeTtgNbabCzkiHyMy_o5DVIVs_tJMPyeccOTrGrE9GM/exec";

  useEffect(() => {
    fetch(`${SCRIPT_URL}?action=fetchTeam`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTeam(data.team);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching team:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white animate-pulse">Loading Team Members...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
          Our Team
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-600"
            >
              <div className="flex items-center p-6">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-white">{member.name}</h2>
                  <p className="text-blue-400 text-sm">{member.position}</p>
                </div>
              </div>
              
              <div className="px-6 pb-6 space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-400">EID:</span>
                  <span>{member.eid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-400">Email:</span>
                  <a href={`mailto:${member.email}`} className="text-blue-300 hover:underline">{member.email}</a>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-400">Phone:</span>
                  <span>{member.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;