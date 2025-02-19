export type Listing = {
    id: number;
    title: string;
    location: string;
    price: number;
    rating: number;
    reviews: number;
    image: 'house1' | 'house2' | 'house3' | 'house4' | 'house5' | 'house6' | 'house7';
    amenities: string[];
    bedrooms: number;
    bathrooms: number;
  };
  
  export const listings: Listing[] = [
    {
      id: 1,
      title: "Luxury Beachfront Villa",
      location: "Malibu, CA",
      price: 450,
      rating: 4.9,
      reviews: 128,
      image: 'house3',
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
      image: 'house4',
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
      image: 'house5',
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
      image: 'house6',
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
      image: 'house7',
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
      image: 'house1',
      amenities: ['Parking', 'Garden', 'WiFi'],
      bedrooms: 2,
      bathrooms: 2
    }
  ];