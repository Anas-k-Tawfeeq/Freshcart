import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useBrands = (options = {}) => {
    const { 
        queryKey = ['brands'],
        limit = 25
    } = options;

    return useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands?limit=${limit}`);
            return data.data;
        },
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });
};