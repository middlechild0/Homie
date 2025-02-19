export interface CustomImageProps {
  imageKey: keyof typeof import('../components/pictures').pictures;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export interface FilterComponentProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  amenities: string[];
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
}

export interface ProfileComponentProps {
  onLogout: () => void;
}

export interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
}

export interface SearchComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}
