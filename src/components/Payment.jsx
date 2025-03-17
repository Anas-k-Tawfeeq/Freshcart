import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { usePayment } from '../hooks/usePayment';
import Loading from './loading';

export default function Payment({ cartId, totalPrice }) {
    const { data, isLoading: isCartLoading } = useCart();
    const { mutate: processPayment, isLoading: isProcessing } = usePayment();
    const [formData, setFormData] = useState({
        shippingAddress: {
            details: '',
            phone: '',
            city: ''
        }
    });

    if (isCartLoading) return <Loading />;
    if (!data || !data.data) return <div className="container mx-auto p-4">Your cart is empty</div>;

    const cart = data.data;

    const handleSubmit = (e) => {
        e.preventDefault();
        processPayment({
            shippingAddress: formData.shippingAddress,
            cartId
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            shippingAddress: {
                ...prev.shippingAddress,
                [name]: value
            }
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Summary */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    {cart.products.map((item) => (
                        <div key={item._id} className="flex justify-between items-center py-2 border-b">
                            <div>
                                <h4 className="font-medium">{item.product.title}</h4>
                                <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                            </div>
                            <p className="text-green-600 font-bold">{item.price} EGP</p>
                        </div>
                    ))}
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Total Price:</span>
                            <span className="text-green-600 font-bold text-xl">{cart.totalCartPrice} EGP</span>
                        </div>
                    </div>
                </div>

                {/* Shipping Form */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
                                Address Details
                            </label>
                            <input
                                type="text"
                                id="details"
                                name="details"
                                value={formData.shippingAddress.details}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.shippingAddress.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.shippingAddress.city}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? 'Processing...' : `Pay ${totalPrice} EGP`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 