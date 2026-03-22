import React from 'react';
import { Link } from "react-router-dom";

const equipment = [
  { id: 1, type: "Generator", name: "Generator", color: "bg-green-600", path: "/generator" },
  { id: 2, type: "Transformer", name: "GSU Transformer", color: "bg-blue-600", path: "/gsu-transformer" },
  { id: 3, type: "Reactor", name: "Shunt Reactor", color: "bg-purple-600", path: "/shunt-reactor" },
  { id: 4, type: "Transformer", name: "Interconnected Transformer", color: "bg-orange-600", path: "/interconnected-transformer" },
  { id: 5, type: "Bearing", name: "Bearing DTT checklist", color: "bg-red-600", path: "/bearing" }
];

export default function EquipmentCards() {
  return (
    <div className="p-8 flex flex-wrap items-center justify-center bg-gray-900 min-h-screen">
      {equipment.map((item) => (
        <Link key={item.id} to={item.path} className="no-underline">
          <div
            className={`
              shrink-0 m-4 relative overflow-hidden ${item.color} 
              rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200
              w-72 h-80 flex flex-col justify-between
            `}
          >
            {/* Top Section: Icon/Type Area */}
            <div className="relative pt-12 px-10 flex items-center justify-center">
              <div className="text-white text-3xl font-bold text-center">
                {item.type}
              </div>
            </div>

            {/* Bottom Section: Name Area */}
            <div className="relative text-white px-6 pb-8">
              <span className="block opacity-75 text-sm uppercase tracking-wider mb-1">
                Equipment Type
              </span>
              <div className="flex justify-between items-end">
                <span className="block font-bold text-xl leading-tight">
                  {item.name}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}