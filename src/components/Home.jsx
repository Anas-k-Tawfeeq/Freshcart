import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import Slider from 'react-slick'
import Header from './Header'
import Categories from './Categories'

export default function Home() {
  return (
    <div>
      <Header/>
      <Categories/>
      <FeaturedProducts/>
    </div>
  )
}
