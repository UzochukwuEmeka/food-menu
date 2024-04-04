import React from 'react'
import Product from './Product'

const ProductList = ({productList}) => {
  return (
    <div className='py-5'>
       <h3 className="text-[#fb8e00] font-bold text-2xl">Products Lists</h3>

       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 '>
        {productList.map((productDetails,index)=> index < 8&&(
           <Product productDetails={productDetails} key={index} />
        ))}
       </div>

    </div>
  )
}

export default ProductList
