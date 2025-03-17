import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { UserTokenContext } from '../context/UserTokenContext';
import { CounterContext } from '../context/CounterContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useMutationCart = () => {
    const { userToken } = useContext(UserTokenContext);
    const { setCounter } = useContext(CounterContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const addToCart = useMutation({
        mutationFn: async (productId) => {
            if (!userToken) {
                throw new Error('Please login first');
            }
            try {
                const { data } = await axios.post(
                    'https://ecommerce.routemisr.com/api/v1/cart',
                    { productId },
                    {
                        headers: {
                            'token': userToken
                        }
                    }
                );
                return data;
            } catch (error) {
                // Throw the actual error from the API
                throw error.response?.data || error;
            }
        },
        onSuccess: (data) => {
            if (data.status === 'success') {
                toast.success('Product added to cart successfully!');
                // Update counter with the new number of items
                if (typeof data.numOfCartItems === 'number') {
                    setCounter(data.numOfCartItems);
                }
                queryClient.invalidateQueries('cart');
            }
        },
        onError: (error) => {
            if (error.message === 'Please login first') {
                toast.error('Please login first');
                navigate('/login');
            } else {
                toast.error(error.message || 'Error adding product to cart');
            }
        }
    });

    return {
        addToCart: addToCart.mutate,
        isLoading: addToCart.isLoading,
        isError: addToCart.isError,
        isSuccess: addToCart.isSuccess
    };
}; 