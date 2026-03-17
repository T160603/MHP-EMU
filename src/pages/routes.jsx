import { Link } from "react-router-dom";

const equipment = [
  {
    id: 1,
    type: "Generator",
    name: "Generator",
    color: "bg-green-600",
    path: "/generator",
    
  },
  {
    id: 2,
    type: "Transformer",
    name: "GSU Transformer",
    color: "bg-blue-600",
    path: "/gsu-transformer"
  },
  {
    id: 3,
    type: "Reactor",
    name: "Shunt Reactor",
    color: "bg-purple-600",
    path: "/shunt-reactor"
  },
  {
    id: 4,
    type: "Transformer",
    name: "Interconnected Transformer",
    color: "bg-orange-600",
    path: "/interconnected-transformer"
  }
];


export default function EquipmentCards() {
  return (
    <div className="p-4 flex flex-wrap items-center justify-center">
      {equipment.map((item) => (
        <Link key={item.id} to={item.path} className="no-underline">
          <div
            className={`shrink-0 m-6 relative overflow-hidden ${item.color} rounded-lg max-w-xs shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200`}
          >
            {/* Top Section: Large Type Text */}
            <div className="relative pt-10 px-10 flex items-center justify-center">
              <div className="text-white text-3xl font-bold">
                {item.type}
              </div>
            </div>

            {/* Bottom Section: Labels */}
            <div className="relative text-white px-6 pb-6 mt-6">
              <span className="block opacity-75 -mb-1">{item.type}</span>
              <div className="flex justify-between items-center">
                <span className="block font-semibold text-xl">
                  {item.name}
                </span>
                {/* Status badge was removed from here */}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}