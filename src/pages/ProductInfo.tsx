import React from 'react'
import { useGetProductsListQuery } from '../redux/RTKQuery/ProductsList'

function ProductInfo() {
            const { data} = useGetProductsListQuery({});
            console.log(data)
  return (
    <div className='bg-amber-600 h-50'>
            <div className="flex justify-content-center items-center">
            <h2 className="font-bold ">Product Info Page</h2>
            <img src="" alt="" />
            

            </div>

    </div>
  )
}

export default ProductInfo
