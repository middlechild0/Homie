'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Listing, listings } from './components/listings';
import CustomImage from './components/CustomImage/CustomImage';
import FilterComponent from './components/FilterComponent';
import ProfileComponent from './components/ProfileComponent';
import SearchComponent from './components/SearchComponent';
import { Search, Sliders, ShoppingCart, User, Star, MapPin, Heart, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

const Homie = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const router = useRouter();
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);

  const amenities = [
    'WiFi', 'Pool', 'Kitchen', 'Parking', 'Air Conditioning', 'Washer', 'Dryer', 'TV'
  ];
  const propertyTypes = [
    'House', 'Apartment', 'Villa', 'Cabin', 'Studio', 'Loft'
  ];

  const advertisements = [
    {
      id: 1,
      title: "Summer Special: 20% Off Beach Houses",
      image: 'house1' as const,
      description: "Book your summer getaway now and save!"
    },
    {
      id: 2,
      title: "New Listings in Popular Destinations",
      image: 'house2' as const,
      description: "Be the first to book these amazing properties"
    }
  ];

  const handleFilterChange = (filtered: Listing[]) => {
    setFilteredListings(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter Component */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${showFilters ? 'block' : 'hidden'}`} onClick={() => setShowFilters(false)}>
        <FilterComponent
          listings={listings}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          amenities={amenities}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          propertyTypes={propertyTypes}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          minRating={minRating}
          setMinRating={setMinRating}
          onFilterChange={handleFilterChange}
          onClose={() => setShowFilters(false)}
          onSave={() => setShowFilters(false)}
        />
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowMobileMenu(false)}>
          <div className="bg-white w-64 h-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col space-y-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <span>Home</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900" onClick={() => setShowFilters(true)}>
                <span>Filters</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <span>Search</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <span>Profile</span>
              </button>
              <Link href="/cart" className="flex items-center text-gray-600 hover:text-gray-900 relative">
                <span>Cart</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </Link>
            </div>
          </div>
        </div>
      )}

     {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4"
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-2xl font-bold text-indigo-600">HOMEI</div>
          </div>

          {/* Search Component */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchComponent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={() => {
                // Implement search functionality
                console.log('Searching for:', searchQuery);
              }}
            />
          </div>

          {/* Navigation Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Sliders className="w-6 h-6" />
            </button>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </Link>

            <ProfileComponent
              onLogout={() => {
                // Implement logout functionality
                console.log('User logged out');
              }}
            />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Advertisements Carousel */}
        <div className="relative mb-8">
          <div className="overflow-hidden rounded-lg">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}>
              {advertisements.map((ad) => (
                <div key={ad.id} className="w-full flex-shrink-0">
                  <div className="relative h-96">
                    <CustomImage 
                      imageKey={ad.image}
                      alt={ad.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg" />
                    <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-8 pb-16 bg-gradient-to-t from-black/60 to-transparent">
                      <h2 className="text-3xl font-bold mb-4">{ad.title}</h2>
                      <p className="text-lg text-center">{ad.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            onClick={() => setCurrentAdIndex((prev) => (prev === 0 ? advertisements.length - 1 : prev - 1))}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            onClick={() => setCurrentAdIndex((prev) => (prev === advertisements.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <CustomImage 
                  imageKey={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <Heart className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="p-4 z-30">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{listing.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{listing.rating}</span>
                    <span className="text-sm text-gray-500">({listing.reviews})</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <MapPin className="inline-block w-4 h-4 mr-1" />
                  {listing.location}
                </div>
                <div className="text-lg font-bold mb-4">${listing.price}/night</div>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  {listing.amenities.map((amenity) => (
                    <span key={amenity} className="bg-gray-100 px-2 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homie;