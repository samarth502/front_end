// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchLoggedInUserOrderAsync, selectUserOrders } from "../userSlice";
// import { selectLoggedInUser } from "../../auth/authSlice";
// import { selectCurrentOrder } from "../../order/orderSlice";



// export default function UserOrders() {
//   const dispatch = useDispatch();

//   const user = useSelector(selectLoggedInUser);
//   // const orders = useSelector(selectCurrentOrder);
//   const orders = useSelector(selectUserOrders);

//   useEffect(()=>{
//     dispatch(fetchLoggedInUserOrderAsync(user.id))
    
//   },[dispatch,user])
  

//   return (
//     <>  
//        {orders.map((order)=>(
//         <div>
//           {order.id}
//         </div>
//        ))}
//     </>
//   )
// }



import { useEffect, useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice"
import { discountedPrice } from "../../../app/constant"

export default function UserOrder() {
  const dispatch = useDispatch()
  // const userInfo = useSelector(selectUserInfo)
  const orders = useSelector(selectUserOrders)

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync())
  }, [])

  return (
    <>
      {Object.keys(orders|| {}).length ?
        orders.map((order, index) => (
          <div>
            <div className="mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 my-5">
                  Order# {order.id}
                </h1>
                <p className="text-xl text-red-600 font-bold tracking-tight  my-5">
                  Order Status: {order.status}
                </p>

                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.id}>{item.product.title}</a>
                              </h3>
                              <p className="ml-4">${discountedPrice(item.product)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              {" "}
                              <label 
                                htmlFor="quantity"   
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty:{item.quantity}
                              </label>
                            </p>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${order.totalAmount} </p>
                </div>
                <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                  <p>total items in cart</p>
                  <p>{order.totalItems} items </p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="flex px-5 justify-between gap-x-6 py-5 border-solid border-2 border-indigo-600">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddresess?.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddresess?.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddresess?.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {order.selectedAddresess?.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {order.selectedAddresess?.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )):(<div className="flex justify-center text-3xl font-bold tracking-tight align-top text-center items-center h-52 text-red-800">Empty Orders!!</div>)}
    </>
  )
}
