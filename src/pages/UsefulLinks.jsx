import React from 'react';
import { ExternalLink, Globe, Lock, Folder } from 'lucide-react'; // Optional: Lucid icons for flair

const usefulLinks = [
  { link: 'https://fiori.drukgreen.bt:49001/fiori?sap-client=200', name: 'Fiori', desc: 'SAP Business Suite' },
  { link: 'http://eas.drukgreen.bt/EAS/', name: 'EAS', desc: 'Employee Appraisal System' },
  { link: 'http://info.drukgreen.bt/disc/', name: 'Disc', desc: 'Information Portal' },
  { link: 'http://172.30.242.117:7009/', name: 'Attendance (MHP)', note: 'MHP Network Only', icon: <Lock size={16} /> },
  { link: 'https://thegateway.bt/', name: 'TheGateway', desc: 'National JOB Portal' },
  { link: 'https://ramis.drc.gov.bt/appUserLogin.html', name: 'RAMIS', desc: 'Tax Management' },
  { link: 'https://drive.google.com/drive/folders/1VHwvzVEvBxJzX6eN6Nkp_NmYleYlxHbT?usp=drive_link', name: 'EMU Centralized folder', note: 'Centralized folder for EMU', icon: <Folder size={16} />  },
];

function UsefulLinks() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-2">Quick Links</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usefulLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                  <Globe size={24} />
                </div>
                <ExternalLink size={18} className="text-slate-500 group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
              
              {item.desc && <p className="text-slate-400 text-sm">{item.desc}</p>}
              
              {item.note && (
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md">
                  {item.icon}
                  {item.note}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsefulLinks;