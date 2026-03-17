import { useState, useEffect } from "react";
import { Menu, X, LogOut, User } from "lucide-react"; // Added User icon as fallback
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState(""); // State for the dynamic photo
  const navigate = useNavigate();

  useEffect(() => {
    // Get the photo URL we saved during login
    const storedPhoto = localStorage.getItem("userPhoto");
    if (storedPhoto) {
      setUserPhoto(storedPhoto);
    }
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.clear(); // Clears everything (EID, Name, Photo, etc.)
    navigate("/login");
  };

  // Fallback image in case the spreadsheet URL is empty or broken
  const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=random";

  return (
    <nav className="relative bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo + Desktop Menu */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img
                  src="http://eas.drukgreen.bt/EAS/image/logo.png"
                  alt="logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                  Dashboard
                </Link>
                <Link to='/Team' className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                  Team
                </Link>
                <Link to='/useful_links' className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                  Quick Links
              </Link>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:ml-6 sm:pr-0">

            {/* Profile Dropdown */}
            <div className="relative ml-3">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 overflow-hidden"
              >
                {/* Updated Image to use userPhoto from state */}
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={userPhoto || defaultAvatar}
                  alt="profile"
                  onError={(e) => { e.target.src = defaultAvatar; }} // Handles broken links
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <Link to='/Profile' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </Link>
                  <Link to='/Setting' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-800 border-t border-gray-700">
          <Link to="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">
            Dashboard
          </Link>
          <Link to='Team' className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">
            Team
          </Link>
          <Link to='/useful_links' className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">
            Quick Links
          </Link>
          
        </div>
      )}
    </nav>
  );
}