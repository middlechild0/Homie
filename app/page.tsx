'use client';

import React, { useState } from 'react';
import CustomImage from './components/customImage';
import { pictures } from './components/pictures';
import { Search, Sliders, ShoppingCart, User, Star, MapPin, Heart, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

const Homie = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const amenities = [
    'WiFi', 'Pool', 'Kitchen', 'Parking', 'Air Conditioning', 'Washer', 'Dryer', 'TV'
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

  const listings = [
    {
      id: 1,
      title: "Luxury Beachfront Villa",
      location: "Malibu, CA",
      price: 450,
      rating: 4.9,
      reviews: 128,
      image: 'house3' as const,
      amenities: ['Pool', 'Beach Access', 'WiFi'],
      bedrooms: 4,
      bathrooms: 3
    },
    {
      id: 2,
      title: "Downtown Modern Loft",
      location: "New York, NY",
      price: 200,
      rating: 4.7,
      reviews: 95,
      image: 'house4' as const,
      amenities: ['WiFi', 'Gym', 'Parking'],
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 3,
      title: "Mountain View Cabin",
      location: "Aspen, CO",
      price: 300,
      rating: 4.8,
      reviews: 75,
      image: 'house5' as const,
      amenities: ['Fireplace', 'Hot Tub', 'WiFi'],
      bedrooms: 3,
      bathrooms: 2
    },
    {
      id: 4,
      title: "Coastal Paradise Home",
      location: "Miami, FL",
      price: 380,
      rating: 4.6,
      reviews: 112,
      image: 'house6' as const,
      amenities: ['Pool', 'Beach Access', 'WiFi'],
      bedrooms: 3,
      bathrooms: 2
    },
    {
      id: 5,
      title: "Urban Studio Apartment",
      location: "San Francisco, CA",
      price: 175,
      rating: 4.5,
      reviews: 89,
      image: 'house7' as const,
      amenities: ['WiFi', 'Kitchen', 'Workspace'],
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 6,
      title: "Historic Downtown House",
      location: "Boston, MA",
      price: 275,
      rating: 4.7,
      reviews: 134,
      image: 'house1' as const,
      amenities: ['Parking', 'Garden', 'WiFi'],
      bedrooms: 2,
      bathrooms: 2
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter Button on the Left Side */}
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className={`fixed top-1/4 left-0 z-10 ${showFilters ? 'bg-indigo-600' : 'bg-gray-600'} p-3 text-white rounded-full transition-all duration-300
          md:left-4 md:top-20 md:w-auto md:h-auto
          ${showFilters ? 'md:max-w-full' : 'md:max-w-[50%]'}`}>
        <Sliders className="w-6 h-6"/>
      </button>

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
              <button className="flex items-center text-gray-600 hover:text-gray-900 relative">
                <span>Cart</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </button>
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

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for homes..."
                className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setShowFilters(true)}
            >
              <Sliders className="w-6 h-6" />
            </button>
            <button className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <User className="w-6 h-6" />
            </button>
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
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
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
          {listings.map((listing) => (
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
              <div className="p-4">
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
