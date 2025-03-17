import React from 'react'
import ProductItem from './ProductItem'
import Loading from './loading'
import { useProducts } from '../hooks/useProducts'

export default function FeaturedProducts() {
    const { data: products, isLoading, isError, error } = useProducts({
        queryKey: ['products', 'featured']
    });

    if (isError) {
        return <h2 className="text-red-500 text-center py-8">{error.message}</h2>
    }

    return (
        <div className='container'>
            <div className='flex flex-wrap'>
                {!isLoading && products ? 
                    products.map(prod => <ProductItem key={prod._id} prod={prod} />)
                    : <Loading />
                }
            </div>
        </div>
    )
}
