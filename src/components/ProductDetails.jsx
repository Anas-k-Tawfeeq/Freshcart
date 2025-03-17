import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Loading from './loading'
import { useMutationCart } from '../hooks/useMutationCart'
import { UserTokenContext } from '../context/UserTokenContext'
import { useWishlistMutation } from '../hooks/useWishlistMutation'
import { useWishlist } from '../hooks/useWishlist'

export default function ProductDetails() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mainImage, setMainImage] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])
  const { id } = useParams()
  const { addToCart, isLoading: isAddingToCart } = useMutationCart();
  const { userToken } = useContext(UserTokenContext);
  const { addToWishlist, removeFromWishlist, isAdding, isRemoving } = useWishlistMutation();
  const { data: wishlistData } = useWishlist();
  const isInWishlist = wishlistData?.data?.some(item => item._id === id);

  useEffect(() => {
    getProductDetails()
  }, [id])

  useEffect(() => {
    if (product) {
      setMainImage(product.imageCover)
      getSimilarProducts()
    }
  }, [product])

  async function getProductDetails() {
    try {
      setLoading(true)
      setError(null)
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setProduct(data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching product details')
    } finally {
      setLoading(false)
    }
  }

  async function getSimilarProducts() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${product.category._id}&limit=4`)
      // Filter out the current product from similar products
      setSimilarProducts(data.data.filter(item => item._id !== id))
    } catch (err) {
      console.log('Error fetching similar products:', err)
    }
  }

  const handleImageClick = (image) => {
    setMainImage(image)
  }

  const handleAddToCart = () => {
    addToCart(id);
  };

  const handleWishlistToggle = () => {
    if (!userToken) return;
    if (isInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  if (loading) return <Loading />
  if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>
  if (!product) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images Section */}
          <div className="md:w-1/2">
            {/* Main Image */}
            <img src={mainImage} alt={product.title} className="w-full rounded-lg mb-4" />
            
            {/* Additional Images */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {[product.imageCover, ...product.images].map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${product.title} - Image ${index + 1}`} 
                    className={`w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity ${mainImage === image ? 'border-2 border-green-600' : ''}`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <p className="text-lg font-semibold text-green-color mb-2">Category: {product.category?.name}</p>
              <div className="flex items-center gap-2 mb-4">
                <p className={`text-xl ${product.priceAfterDiscount ? 'line-through text-gray-400' : 'text-gray-900 font-bold'}`}>
                  {product.price} EGP
                </p>
                {product.priceAfterDiscount && (
                  <p className="text-xl text-gray-900 font-bold">{product.priceAfterDiscount} EGP</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                <i className="fas fa-star text-yellow-400"></i>
                <span className="ml-1 text-gray-600">{product.ratingsAverage}</span>
              </div>
              <span className="text-gray-500">({product.ratingsQuantity} reviews)</span>
            </div>

            {/* Additional Details */}
            <div className="space-y-4 mb-8">
              <p className="text-gray-600">
                <span className="font-semibold">Brand:</span> {product.brand?.name}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Quantity in Stock:</span> {product.quantity}
              </p>
              {product.sold > 0 && (
                <p className="text-gray-600">
                  <span className="font-semibold">Sold:</span> {product.sold} units
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart || !userToken}
                className="btn flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? 'Adding to Cart...' : !userToken ? 'Login to Add to Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleWishlistToggle}
                disabled={!userToken || isAdding || isRemoving}
                className="btn px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className={`fas fa-heart text-xl ${isInWishlist ? 'text-red-500' : 'text-gray-500'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <Link to={`/product/${item._id}`} key={item._id} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={item.imageCover} 
                    alt={item.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-green-600 font-bold">{item.price} EGP</p>
                      <div className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                        <span className="text-gray-600">{item.ratingsAverage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}