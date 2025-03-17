import React from 'react'
import Loading from './loading'
import ProductItem from './ProductItem'
import { useProducts } from '../hooks/useProducts'

export default function Products() {
  const { data: products, isLoading, isError, error } = useProducts({
    queryKey: ['products', 'all']
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
