import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'

export default function Categories() {
  const [cats, setCats] = useState([])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
  };

  async function getCat() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCats(data.data);
  }

  useEffect(() => {
    getCat()
  }, [])

  return (
    <div className='container mx-auto px-4 py-8 hidden md:block'>
      <Slider {...settings}>
        {cats.map(ele => <CatItem key={ele._id} ele={ele}></CatItem>)}
      </Slider>
    </div>
  )
}

function CatItem({ele}) {
  return (
    <div>
      <img src={ele.image} className='h-[200px] w-full object-cover' alt={ele.name} />
    </div>
  )
}
