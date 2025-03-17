import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { UserTokenContext } from '../context/UserTokenContext';
import { CounterContext } from '../context/CounterContext';
import toast from 'react-hot-toast';

export const useDeleteFromCart = () => {
    const { userToken } = useContext(UserTokenContext);
    const { setCounter } = useContext(CounterContext);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productId) => {
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers: {
                        'token': userToken
                    }
                }
            );
            return data;
        },
        onSuccess: (data) => {
            // Update the counter with the new number of items
            setCounter(data.numOfCartItems);
            // Invalidate and refetch cart data
            queryClient.invalidateQueries(['cart']);
            toast.success('Item removed from cart');
        },
        onError: (error) => {
            console.error('Error removing item from cart:', error);
            toast.error(error.response?.data?.message || 'Error removing item from cart');
        }
    });
}; 