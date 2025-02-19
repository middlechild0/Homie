'use client';

import React, { useState, useEffect } from 'react';
import { Sliders, MapPin, Star, X } from 'lucide-react';

import { Listing } from '../types';

interface FilterComponentProps {
  listings: Listing[];
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  amenities: string[];
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
  onFilterChange: (filteredListings: Listing[]) => void;
  onClose: () => void; // Corrected type definition
  propertyTypes: string[];
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  minRating: number;
  setMinRating: (rating: number) => void;
  onSave: () => void; // Add onSave prop
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  listings,
  priceRange,
  setPriceRange,
  amenities,
  selectedAmenities,
  setSelectedAmenities,
  propertyTypes,
  selectedTypes,
  setSelectedTypes,
  minRating,
  setMinRating,
  onFilterChange,
  onClose,
  onSave // Destructure onSave prop
}) => {
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showClearFilters, setShowClearFilters] = useState<boolean>(false);

  const fetchLocationSuggestions = async (query: string): Promise<string[]> => {
    // TODO: Implement actual API call
    return ['New York', 'Los Angeles', 'Chicago', 'Miami'];
  };

  const handleLocationInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationFilter(value);
    
    if (value.length > 2) {
      const suggestions = await fetchLocationSuggestions(value);
      setLocationSuggestions(suggestions);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev: string[]) => 
      prev.includes(type) 
        ? prev.filter((t: string) => t !== type) 
        : [...prev, type]
    );
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedAmenities([]);
    setSelectedTypes([]);
    setMinRating(0);
    setLocationFilter('');
    setLocationSuggestions([]);
    setShowClearFilters(false);
  };

  const saveFilters = () => {
    // Implement the logic to save the filters
    console.log('Filters saved:', {
      priceRange,
      selectedAmenities,
      selectedTypes,
      minRating,
      locationFilter
    });
    onSave(); // Call onSave prop to close the filter component
  };

  useEffect(() => {
    const hasFilters = 
      priceRange[0] !== 0 || 
      priceRange[1] !== 1000 ||
      selectedAmenities.length > 0 ||
      selectedTypes.length > 0 ||
      minRating > 0 ||
      locationFilter !== '';
    
    setShowClearFilters(hasFilters);
  }, [priceRange, selectedAmenities, selectedTypes, minRating, locationFilter]);

  useEffect(() => {
    const filtered = listings.filter((listing: Listing) => {
      const priceMatch = listing.price >= priceRange[0] && listing.price <= priceRange[1];
      const amenitiesMatch = selectedAmenities.length === 0 ? true : 
        selectedAmenities.every(amenity => listing.amenities?.includes(amenity));
      const typeMatch = selectedTypes.length === 0 || 
        selectedTypes.includes(listing.title.split(' ')[0]);
      const ratingMatch = listing.rating >= minRating;
      const locationMatch = !locationFilter || 
        listing.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      return priceMatch && amenitiesMatch && typeMatch && ratingMatch && locationMatch;
    });
    onFilterChange(filtered);
  }, [priceRange, selectedAmenities, locationFilter, selectedTypes, minRating, listings]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(
      selectedAmenities.includes(amenity)
        ? selectedAmenities.filter(a => a !== amenity)
        : [...selectedAmenities, amenity]
    );
  };

  return (
    <div 
      className="fixed top-0 left-0 w-80 h-full bg-white shadow-xl z-50 p-6 transform transition-transform duration-300 ease-in-out font-sans overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-700">Price Range</label>
        <div className="flex items-center space-x-2">
          <span>${priceRange[0]}</span>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full range-slider"
          />
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-medium mb-3 text-gray-700">Location</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter location..."
            value={locationFilter}
            onChange={handleLocationInput}
            className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          {locationSuggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
              {locationSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocationFilter(suggestion);
                    setLocationSuggestions([]);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-4 text-gray-700">Property Type</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={(e) => {
                  e.stopPropagation();
                  handleTypeChange(type);
                }}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-4 text-gray-700">Minimum Rating</h3>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={(e) => {
                e.stopPropagation();
                handleRatingChange(rating);
              }}
              className={`p-2 rounded-full ${
                minRating >= rating
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              <Star className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-4 text-gray-700">Amenities</h3>
        <div className="space-y-2">
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={(e) => {
                  e.stopPropagation();
                  handleAmenityChange(amenity);
                }}
                className="w-4 h-4 rounded border-gray-300 text indigo-600 focus:ring-indigo-500"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {showClearFilters && (
        <div className="mt-8 sticky bottom-0 bg-white pt-4">
          <button
            onClick={clearAllFilters}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-base font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
            <span>Clear All Filters</span>
          </button>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={saveFilters}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          <Sliders className="w-5 h-5" />
          <span>Save Filters</span>
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;