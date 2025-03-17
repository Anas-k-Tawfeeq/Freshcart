import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { UserTokenContext } from '../context/UserTokenContext';
import { CounterContext } from '../context/CounterContext';
import toast from 'react-hot-toast';

export const useClearCart = () => {
    const { userToken } = useContext(UserTokenContext);
    const { setCounter } = useContext(CounterContext);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(
                'https://ecommerce.routemisr.com/api/v1/cart',
                {
                    headers: {
                        'token': userToken
                    }
                }
            );
            return data;
        },
        onSuccess: () => {
            // Reset counter to 0 since cart is empty
            setCounter(0);
            // Invalidate and refetch cart data
            queryClient.invalidateQueries(['cart']);
            toast.success('Cart cleared successfully');
        },
        onError: (error) => {
            console.error('Error clearing cart:', error);
            toast.error(error.response?.data?.message || 'Error clearing cart');
        }
    });
}; 