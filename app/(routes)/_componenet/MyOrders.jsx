import React from 'react'
import Image from 'next/image'

const MyOrders = ({orderItem}) => {
  return (
    <div className='grid grids-5 w-[100%] mt-3'>
    <div className="col-span-2">
      <h2>{orderItem.product.data.attributes.name}</h2>
      <h2> Item Price:{orderItem.product.data.attributes.name}</h2>

    </div>
    <h2> Quantity:{orderItem.quantity}</h2>
    <h2>{orderItem.price}</h2>
    <hr />
    </div>
  )
}

export default MyOrders
