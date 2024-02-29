import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product/Components/ProductList'
import AdminProductList from '../features/admin/Components/AdminProductList'

const AdminHome  = () => {
  return (
    <>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </>
  )
}

export default AdminHome 