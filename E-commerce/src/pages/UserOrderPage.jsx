import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/Components/UserOrders'

const UserOrderPage = () => {
  return (
    <>
      <Navbar>
        <UserOrders></UserOrders>
      </Navbar>
    </>
  )
}

export default UserOrderPage