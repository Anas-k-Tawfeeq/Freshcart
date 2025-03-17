import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { UserTokenContext } from '../context/UserTokenContext';
import { CounterContext } from '../context/CounterContext';
import toast from 'react-hot-toast';

export const useUpdateCart = () => {
    const { userToken } = useContext(UserTokenContext);
    const { setCounter } = useContext(CounterContext);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ productId, count }) => {
            const { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    count: count
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
            // Update the counter with the new number of items
            setCounter(data.numOfCartItems);
            // Invalidate and refetch cart data
            queryClient.invalidateQueries(['cart']);
            toast.success('Cart updated successfully');
        },
        onError: (error) => {
            console.error('Error updating cart:', error);
            toast.error(error.response?.data?.message || 'Error updating cart');
        }
    });
}; 