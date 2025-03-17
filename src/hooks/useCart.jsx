import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { UserTokenContext } from '../context/UserTokenContext';
import { CounterContext } from '../context/CounterContext';

export const useCart = () => {
    const { userToken } = useContext(UserTokenContext);
    const { setCounter } = useContext(CounterContext);

    const query = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            if (!userToken) {
                return null;
            }
            const { data } = await axios.get(
                'https://ecommerce.routemisr.com/api/v1/cart',
                {
                    headers: {
                        'token': userToken
                    }
                }
            );
            // Update counter with the numOfCartItems from API response
            setCounter(data.numOfCartItems || 0);
            return data;
        },
        enabled: !!userToken, // Only run query if user is logged in
        refetchOnWindowFocus: true,
        staleTime: 30 * 1000, // Consider data fresh for 30 seconds
        onError: (error) => {
            console.error('Error fetching cart:', error);
            if (error.response?.status === 404) {
                // Cart is empty or not found
                setCounter(0);
                return null;
            }
        }
    });

    // Reset counter when query is disabled or returns null
    useEffect(() => {
        if (!query.data) {
            setCounter(0);
        }
    }, [query.data, setCounter]);

    return query;
}; 