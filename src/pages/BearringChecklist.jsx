import React, { useState, useEffect } from 'react';
import BearRingChecklistComponent from '../components/BearRingChecklistComponents'
import BearringChecklistDetailView from '../components/BearingChecklistDetailView'

const API_URL = "https://script.google.com/macros/s/AKfycbziFZ5aXhn7vUJCzG8YGuUW_tyQZDo15vehbhaO1qKe5bGpQZ_UeYIwUhfrmRdbst0z/exec";

function BearingChecklistPage() {
  const [view, setView] = useState('dashboard');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [records, setRecords] = useState([]); // Start with empty array
  const [loading, setLoading] = useState(true);

  // --- READ OPERATION (FETCH DATA) ---
  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      // Only set records if data exists and is an array
      setRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleCardClick = (record) => {
    setSelectedRecord(record);
    setView('view');
  };

  const handleAddNew = () => {
    setSelectedRecord(null);
    setView('edit');
  };

  // --- CREATE / UPDATE (POST TO API) ---
  const saveRecord = async (formData) => {
    setLoading(true);
    try {
      // Logic for save/update is now handled in the child Component via fetch, 
      // so we just need to refresh our list here.
      await fetchRecords(); 
      setView('dashboard');
    } catch (error) {
      console.error("Error after saving:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE OPERATION ---
  const deleteRecord = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this Checklist record?")) {
      setLoading(true);
      try {
        // Note: You'll need to update your AppScript to handle action: 'DELETE'
        await fetch(API_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({ action: 'DELETE', id: id })
        });
        // Optimistic UI update or re-fetch
        setRecords(records.filter(r => r.id !== id));
      } catch (error) {
        alert("Failed to delete record");
      } finally {
        setLoading(false);
      }
    }
  };

  if (view === 'edit') {
    return <BearRingChecklistComponent initialData={selectedRecord} onSave={saveRecord} onCancel={() => setView('dashboard')} />;
  }

  if (view === 'view') {
    return <BearringChecklistDetailView data={selectedRecord} onEdit={() => setView('edit')} onClose={() => setView('dashboard')} />;
  }

  return (
    <div className='min-h-screen w-full bg-gray-900 p-4 md:p-8 flex flex-col items-center'>
      <div className="w-full max-w-4xl">
        <header className="mb-10 text-center">
          <p className='text-3xl font-black text-[#22c55e] uppercase tracking-tight'>
            Bearing Checklist
          </p>
          {loading && <p className="text-gray-500 text-sm animate-pulse mt-2">Syncing with Google Sheets...</p>}
        </header>

        {/* Display logic: If loading and no records, show loading. If not loading and no records, show empty state. */}
        {records.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {records.map((record, index) => (
              <div 
                key={record.id || index} 
                className="bg-gray-850 border border-gray-800 p-5 rounded-xl hover:border-[#22c55e]/50 transition-all cursor-pointer shadow-lg relative group"
                onClick={() => handleCardClick(record)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[#22c55e] font-black text-xl">{record.Generating_Unit || 'NEW UNIT'}</h3>
                  </div>
                  
                  <button 
                    onClick={(e) => deleteRecord(e, record.id)}
                    className="text-gray-600 hover:text-red-500 p-2 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 flex justify-between items-center text-xs uppercase font-bold text-gray-500">
                  <span>View Details</span>
                  <span className="text-[#22c55e] opacity-50">#{String(record.id || index).slice(-4)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl">
              <p className="text-gray-500 font-bold">No Checklist records found.</p>
              <button onClick={handleAddNew} className="text-[#22c55e] text-sm mt-2 underline">Create your first entry</button>
            </div>
          )
        )}
      </div>

      <button
        onClick={handleAddNew}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center text-gray-900 shadow-2xl hover:scale-110 active:scale-95 transition-all z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}

export default BearingChecklistPage;