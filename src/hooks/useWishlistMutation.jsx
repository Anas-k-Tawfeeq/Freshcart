import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { UserTokenContext } from '../context/UserTokenContext';

export const useWishlistMutation = () => {
    const { userToken } = useContext(UserTokenContext);
    const queryClient = useQueryClient();

    const addToWishlist = useMutation({
        mutationFn: async (productId) => {
            const { data } = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                { productId },
                {
                    headers: { 'token': userToken }
                }
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist']);
        }
    });

    const removeFromWishlist = useMutation({
        mutationFn: async (productId) => {
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                {
                    headers: { 'token': userToken }
                }
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist']);
        }
    });

    return {
        addToWishlist: addToWishlist.mutate,
        removeFromWishlist: removeFromWishlist.mutate,
        isAdding: addToWishlist.isLoading,
        isRemoving: removeFromWishlist.isLoading
    };
};