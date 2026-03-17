import React, { useState, useEffect } from 'react';
import ICT_Check_List_Fields from '../assets/ICT_Check_list_Field'

const API_URL = "https://script.google.com/macros/s/AKfycbxaUi5P1APSO8d6RONjTsfIYUOASFRl-Yfa_td2aj1INUKAiiKOtc1ouV1xGo_9M55V/exec";

const IctTransformerChecklistDetailView = ({ data: initialData, onEdit, onClose }) => {
  const [data, setData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    // Only fetch if no data was passed from the dashboard
    if (!initialData) {
      const fetchData = async () => {
        try {
          const response = await fetch(API_URL);
          const result = await response.json();
          if (result && Array.isArray(result) && result.length > 0) {
            // Get the latest entry
            setData(result[result.length - 1]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [initialData]);

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#22c55e] border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[#22c55e] font-black uppercase tracking-widest text-sm">Loading Data...</div>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-6 text-center">
      <p className="text-xl font-bold">No records found.</p>
      <button onClick={onClose} className="mt-4 bg-gray-800 px-6 py-2 rounded-lg text-[#22c55e]">Go Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-4xl relative pb-24">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-2xl font-black text-[#22c55e] uppercase">Inter-connected Transformer - {data.Phase || '# '} Phase Checklist Record</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-4xl">&times;</button>
        </div>

        <div className="space-y-3">
          {ICT_Check_List_Fields.map((field, index) => {
            if (field.type === 'header') {
              return (
                <div key={index} className="bg-gray-800/50 text-[#22c55e] px-4 py-2 mt-6 rounded font-bold uppercase text-xs tracking-widest border-l-2 border-[#22c55e]">
                  {field.label}
                </div>
              );
            }
            return (
              <div key={field.name || index} className="flex justify-between items-center bg-gray-800/30 p-4 rounded-lg border border-gray-800">
                <span className="text-gray-400 text-sm font-medium">{field.label}</span>
                <span className="text-white font-bold">{data[field.name] || '—'}</span>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => onEdit(data)} // Passes the full data object with ID to the form
          className="fixed bottom-8 right-8 bg-[#22c55e] text-gray-900 px-8 py-4 rounded-full font-black uppercase shadow-2xl hover:bg-[#1eb054] flex items-center gap-2 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Record
        </button>
      </div>
    </div>
  );
};

export default IctTransformerChecklistDetailView;