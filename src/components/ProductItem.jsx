import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useMutationCart } from '../hooks/useMutationCart'
import { UserTokenContext } from '../context/UserTokenContext'
import { useWishlistMutation } from '../hooks/useWishlistMutation'
import { useWishlist } from '../hooks/useWishlist'

export default function ProductItem({prod}) {
    let{imageCover, title, price, category , ratingsAverage, priceAfterDiscount, _id}= prod
    const { addToCart, isLoading } = useMutationCart();
    const { userToken } = useContext(UserTokenContext);
    const { addToWishlist, removeFromWishlist, isAdding, isRemoving } = useWishlistMutation();
    const { data: wishlistData } = useWishlist();
    const isInWishlist = wishlistData?.data?.some(item => item._id === _id);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        addToCart(_id);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        if (!userToken) return;
        if (isInWishlist) {
            removeFromWishlist(_id);
        } else {
            addToWishlist(_id);
        }
    };

    return (
   
    <div className='w-full md:w-1/4 lg:w-1/6 p-3'>
      <div className="product relative bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <button 
          onClick={handleWishlistToggle}
          disabled={!userToken || isAdding || isRemoving}
          className="absolute top-6 right-6 z-10 text-xl text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className={`fas fa-heart ${isInWishlist ? 'text-red-500' : ''}`}></i>
        </button>
        <Link to={`/product/${_id}`} className='cursor-pointer block'>
          <img src={imageCover} className='w-full' alt="" />
          <p className='text-green-color text-sm font-bold'>{category.name}</p>
          <h3>{title.split(' ').slice(0,2).join(' ')}</h3>
          <div className="flex items-center gap-2">
            <p className={`${priceAfterDiscount ? 'line-through text-gray-400' : ''}`}>{price} EGP</p>
            {priceAfterDiscount ? <p className= "font-bold">{priceAfterDiscount} EGP</p> : null}
          </div>
          <div className="flex items-center justify-end mt-2">
            <i className="fas fa-star text-yellow-400 text-sm"></i>
            <span className="ml-1 text-sm">{ratingsAverage}</span>
          </div>
        </Link>
        <button 
          onClick={handleAddToCart}
          disabled={isLoading || !userToken}
          className="btn w-full mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Adding...' : !userToken ? 'Login to Add' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
