import React from 'react'
import ProductDetails from '../features/product/Components/ProductDetails'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/common/Footer'

const ProductDetailsPage = () => {
  return (
    <>
    <Navbar>
    <ProductDetails></ProductDetails>
    </Navbar>
    <Footer/>
    </>
  )
}

export default ProductDetailsPage