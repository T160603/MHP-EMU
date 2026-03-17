import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 mt-auto overflow-hidden">
      <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img 
              src="https://i.ibb.co/PsW5NV83/logo.png" 
              className="h-8 shrink-0" // Prevents logo from squishing
              alt="EMU Logo" 
            />
            {/* Removed whitespace-nowrap and added responsive text sizes */}
            <span className="self-center text-lg md:text-2xl font-semibold text-white leading-tight">
              Electrical Maintenance Unit, MHP
            </span>
          </Link>

          {/* Copyright Section */}
          <span className="block text-sm text-gray-400 sm:text-center mt-2 sm:mt-0">
            © {currentYear} <Link to="/" className="hover:underline">EMU</Link>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}