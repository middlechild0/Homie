'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';

interface ProfileComponentProps {
  onLogout: () => void;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button 
        className="p-2 hover:bg-gray-100 rounded-full"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <User className="w-6 h-6" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            <button
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                // Handle profile view
                setShowDropdown(false);
              }}
            >
              View Profile
            </button>
            <button
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                // Handle settings
                setShowDropdown(false);
              }}
            >
              Settings
            </button>
            <button
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                onLogout();
                setShowDropdown(false);
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
