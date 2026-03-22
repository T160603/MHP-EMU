import React, { useState } from 'react';
import bearingChecklist from '../assets/BearingChecklist';
// Replace this with your actual Web App URL from Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbziFZ5aXhn7vUJCzG8YGuUW_tyQZDo15vehbhaO1qKe5bGpQZ_UeYIwUhfrmRdbst0z/exec"


const BearRingChecklistComponent = ({ initialData, onSave, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    const init = {};
    bearingChecklist.forEach(f => { 
      if (f.name) init[f.name] = initialData ? initialData[f.name] : ''; 
    });
    return init;
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Prepare data (adding a unique timestamp if it's a new record)
    const payload = {
      ...formData,
      action: initialData ? 'UPDATE' : 'CREATE',
      id: initialData?.id || new Date().getTime().toString() 
    };

    try {
      // Use no-cors mode for Google Apps Script to prevent redirect errors
      // Note: You won't be able to read the response body with no-cors, 
      // but the data will reach the sheet.
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      alert("Success! The data has been sent to the sheet.");
      if (onSave) onSave(formData);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error saving data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full bg-gray-900 p-4 md:p-8 flex flex-col items-center'>
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
           <p className='text-3xl font-black text-[#22c55e] uppercase tracking-tight'>
            {initialData ? 'Edit Checklist' : 'New Checklist'}
          </p>
          <button onClick={onCancel} className="text-gray-400 hover:text-white uppercase font-bold text-sm">Cancel</button>
        </div>
        
        <form className="bg-gray-850 rounded-xl shadow-2xl p-6 md:p-10 border border-gray-800" onSubmit={(e) => e.preventDefault()}>
          {bearingChecklist.map((field, index) => {
            if (field.type === 'header') {
              return (
                <div key={`header-${index}`} className="bg-[#22c55e]/20 text-[#22c55e] px-4 py-3 mt-8 mb-4 font-bold uppercase tracking-wider rounded border-l-4 border-[#22c55e]">
                  {field.label}
                </div>
              );
            }

            return (
              <div key={field.name} className="w-full flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-gray-800 px-2 transition-colors hover:bg-white/5">
                <label className="text-sm md:text-base font-medium text-gray-300 md:w-1/2">{field.label}</label>
                <div className="md:w-1/2 mt-2 md:mt-0">
                  {field.type === 'radio' ? (
                    <div className="flex gap-4 flex-wrap">
                      {field.options.map(opt => (
                        <label key={opt} className="flex items-center cursor-pointer group">
                          <input type="radio" name={field.name} checked={formData[field.name] === opt} onChange={() => handleChange(field.name, opt)} className="hidden" />
                          <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center transition-all ${formData[field.name] === opt ? 'border-[#22c55e] bg-[#22c55e]' : 'border-gray-600'}`}>
                            {formData[field.name] === opt && <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />}
                          </div>
                          <span className={`text-sm ${formData[field.name] === opt ? 'text-[#22c55e] font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input type={field.type} value={formData[field.name]} onChange={(e) => handleChange(field.name, e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-1 focus:ring-[#22c55e] outline-none" placeholder="..." />
                  )}
                </div>
              </div>
            );
          })}

          <button 
            type="button" 
            disabled={loading}
            onClick={handleSubmit}
            className={`w-full mt-12 ${loading ? 'bg-gray-600' : 'bg-[#22c55e] hover:bg-[#1eb054]'} text-gray-900 py-5 rounded-xl font-black uppercase transition-all shadow-lg flex justify-center items-center`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : (
              initialData ? 'Update Record' : 'Save Inspection Data'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BearRingChecklistComponent;