import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { UserTokenContext } from '../context/UserTokenContext';
import { CounterContext } from '../context/CounterContext';
import toast from 'react-hot-toast';

export const usePayment = () => {
    const { userToken } = useContext(UserTokenContext);
    const { setCounter } = useContext(CounterContext);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ shippingAddress, cartId }) => {
            const successUrl = 'http://localhost:5173/cart';
            const cancelUrl = 'http://localhost:5173/cart';
            
            console.log('Payment URLs:', { successUrl, cancelUrl });
            
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?success_url=${encodeURIComponent(successUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}`,
                {
                    shippingAddress
                },
                {
                    headers: {
                        'token': userToken
                    }
                }
            );
            return data;
        },
        onSuccess: (data) => {
            console.log('Payment success data:', data);
            // Reset counter to 0 since cart will be empty after successful payment
            setCounter(0);
            // Invalidate and refetch cart data
            queryClient.invalidateQueries(['cart']);
            // Redirect to payment URL
            if (data.session?.url) {
                console.log('Redirecting to:', data.session.url);
                window.location.href = data.session.url;
            } else {
                console.error('No redirect URL found in response');
                toast.error('Payment initiated but no redirect URL received');
            }
        },
        onError: (error) => {
            console.error('Error processing payment:', error);
            toast.error(error.response?.data?.message || 'Error processing payment');
        }
    });
}; 