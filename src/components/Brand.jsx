import React from 'react'
import Loading from './loading'
import { useBrands } from '../hooks/useBrands'

export default function Brand() {
  const { data: brands, isLoading, isError, error } = useBrands({
    queryKey: ['brands']
  });

  if (isError) {
    return <h2 className="text-red-500 text-center py-8">{error.message}</h2>
  }

  return (
    <div className='container py-5'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {!isLoading && brands ? 
          brands.map(brand => (
            <div key={brand._id} className='p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow'>
              <img src={brand.image} alt={brand.name} className='w-full h-auto object-contain' />
              <h3 className='text-center mt-2 font-semibold text-gray-800'>{brand.name}</h3>
            </div>
          ))
          : <Loading />
        }
      </div>
    </div>
  )
}

