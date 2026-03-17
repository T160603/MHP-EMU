import React, { useState } from 'react';

const Setting = () => {
  const [formData, setFormData] = useState({
    eid: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // Client-side validation
    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({ type: 'error', message: 'New passwords do not match!' });
      return;
    }

    setLoading(true);

    // Replace with your actual Web App URL after re-deploying as "Anyone"
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbz6t_GgXp2VuNQSyYWit4w5OeTtgNbabCzkiHyMy_o5DVIVs_tJMPyeccOTrGrE9GM/exec';

    const params = new URLSearchParams({
      action: "resetPassword",
      eid: formData.eid,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword
    });

    try {
      const response = await fetch(`${scriptUrl}?${params.toString()}`, {
        method: 'GET',
        mode: 'cors',
      });

      const data = await response.json();

      if (data.status === "success") {
        setStatus({ type: 'success', message: data.message });
        setFormData({ eid: '', oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatus({ 
        type: 'error', 
        message: 'Network error. Ensure script is deployed to "Anyone".' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-400">Change Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Employee ID</label>
            <input
              type="text"
              name="eid"
              value={formData.eid}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Current Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          <hr className="border-gray-700 my-4" />

          <div>
            <label className="block text-sm font-semibold mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold transition-colors ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 active:scale-95'
            }`}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        {status.message && (
          <div className={`mt-6 p-4 rounded-lg text-sm font-medium text-center animate-pulse ${
            status.type === 'success' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400 border border-red-800'
          }`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;