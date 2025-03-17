import React from 'react'
import Loading from './loading'
import { useCart } from '../hooks/useCart'
import { useUpdateCart } from '../hooks/useUpdateCart'
import { useDeleteFromCart } from '../hooks/useDeleteFromCart'
import { useClearCart } from '../hooks/useClearCart'
import Payment from './Payment'

export default function Cart() {
  const { data, isLoading, isError } = useCart();
  const { mutate: updateQuantity, isLoading: isUpdating } = useUpdateCart();
  const { mutate: deleteItem, isLoading: isDeleting } = useDeleteFromCart();
  const { mutate: clearCart, isLoading: isClearing } = useClearCart();

  if (isLoading) return <Loading />;
  if (isError) return <div className="container mx-auto p-4 text-red-500">Error loading cart</div>;
  if (!data || !data.data) return <div className="container mx-auto p-4">Your cart is empty</div>;

  const cart = data.data;

  const handleQuantityChange = (productId, count) => {
    if (count >= 1) {
      updateQuantity({ productId, count });
    }
  };

  const handleDeleteItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      deleteItem(productId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        {cart.products.length > 0 && (
          <button
            onClick={handleClearCart}
            disabled={isClearing}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear Cart
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cart Items */}
        <div className="bg-white p-4 rounded-lg shadow">
          {cart.products.map((item) => (
            <div key={item._id} className="flex items-center gap-4 py-4 border-b">
              <img 
                src={item.product.imageCover} 
                alt={item.product.title} 
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <button
                    onClick={() => handleDeleteItem(item.product._id)}
                    disabled={isDeleting}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                <p className="text-green-600 font-bold">{item.price} EGP</p>
                <div className="flex items-center gap-2 mt-2">
                  <button 
                    onClick={() => handleQuantityChange(item.product._id, item.count - 1)}
                    disabled={isUpdating || item.count <= 1}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.count}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.product._id, item.count + 1)}
                    disabled={isUpdating}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        {cart.products.length > 0 && (
          <Payment 
            cartId={cart._id} 
            totalPrice={cart.totalCartPrice}
          />
        )}
      </div>
    </div>
  )
}

