import React from 'react';
import Loading from './loading';
import { useWishlist } from '../hooks/useWishlist';
import { useWishlistMutation } from '../hooks/useWishlistMutation';
import { useMutationCart } from '../hooks/useMutationCart';

export default function Wishlist() {
  const { data, isLoading, isError } = useWishlist();
  const { removeFromWishlist, isRemoving } = useWishlistMutation();
  const { addToCart, isLoading: isAddingToCart } = useMutationCart();

  if (isLoading) return <Loading />;
  if (isError) return <div className="container mx-auto p-4 text-red-500">Error loading wishlist</div>;
  if (!data || !data.data) return <div className="container mx-auto p-4">Your wishlist is empty</div>;

  const wishlist = data.data;

  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your wishlist?')) {
      removeFromWishlist(productId);
    }
  };

  const handleMoveToCart = (productId) => {
    addToCart(productId);
    removeFromWishlist(productId);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="relative group">
              <img 
                src={item.imageCover} 
                alt={item.title} 
                className="w-full h-48 object-cover rounded mb-4"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg truncate">{item.title}</h3>
              <p className="text-green-600 font-bold">{item.price} EGP</p>
              
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => handleMoveToCart(item._id)}
                  disabled={isAddingToCart}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1 mr-2"
                >
                  {isAddingToCart ? 'Adding...' : 'Move to Cart'}
                </button>
                
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  disabled={isRemoving}
                  className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}