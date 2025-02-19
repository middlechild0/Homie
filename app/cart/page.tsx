'use client';

import React, { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    // Example cart items
    {
      id: 1,
      title: "Luxury Beachfront Villa",
      price: 450,
      quantity: 1,
      image: 'house-3.png',

    },
    {
      id: 2,
      title: "Downtown Modern Loft",
      price: 200,
      quantity: 2,
      image: 'house-4.png',

    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const handleApplyPromoCode = () => {
    // Implement promo code application logic
    console.log('Applying promo code:', promoCode);
    // Example: setDiscount(50); // Apply a discount of $50
  };

  const handleCheckout = () => {
    // Implement checkout functionality
    console.log('Proceed to checkout');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - discount + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img
                  src={`/images/${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <button onClick={() => handleRemoveItem(item.id)}>
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <div className="text-lg font-bold mb-4">${item.price}</div>
                <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <button 
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Apply Promo Code</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder="Enter promo code"
            />
            <button
              onClick={handleApplyPromoCode}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleCheckout}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Proceed to Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
