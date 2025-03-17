import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { UserTokenContext } from '../context/UserTokenContext';

export const useWishlist = () => {
    const { userToken } = useContext(UserTokenContext);

    const query = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            if (!userToken) {
                return null;
            }
            const { data } = await axios.get(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                {
                    headers: {
                        'token': userToken
                    }
                }
            );
            return data;
        },
        enabled: !!userToken,
        refetchOnWindowFocus: true,
        staleTime: 30 * 1000,
        onError: (error) => {
            console.error('Error fetching wishlist:', error);
            if (error.response?.status === 404) {
                return null;
            }
        }
    });

    return query;
};