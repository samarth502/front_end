import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EyeIcon, PencilIcon ,ArrowDownIcon,ArrowUpIcon} from "@heroicons/react/20/solid"
import Pagination from "../../common/Pagination"

import { ITEMS_PER_PAGE } from "../../../app/constant"
import { fetchAllOrderAyanc, selectOrders, selectTotalOrders, updateOrderAsyuc } from "../../order/orderSlice"


const AdminOrders = () => {
  const [page, setPage] = useState(1)
  const [editableOrderId, setEditableOrderId] = useState(false)
  const [sort, setSort] = useState({})

  



  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)
  const totalOrders = useSelector(selectTotalOrders)
  // // const totalItems = useSelector(selectTotalItems)


 

  const handleShow = () => {
    console.log("show")
  }

  const handleEdit = (order) => {
    setEditableOrderId(order.id)
  }
  const handleUpdate = (e, order) => {
    const updateOrders = { ...order, status: e.target.value }
    dispatch(updateOrderAsyuc(updateOrders))
    setEditableOrderId(false)
  }

  

  const handlePage = (page)=>{
    setPage(page)
    
  

  } 

  const showColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600"
      case "dispatched":
        return "bg-yellow-200 text-yellow-600"
      case "delivered":
        return "bg-green-200 text-green-600"

      case "cancelled":
        return "bg-red-200 text-red-600"
      default:
        return "bg-purple-200 text-purple-600"


    }
  }

  const handleSort = ( sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order }
    console.log(sort)
    setSort(sort)                 
  }

  useEffect(() => { 
   const pagination = { _page: page, _limit:  ITEMS_PER_PAGE }
    dispatch(fetchAllOrderAyanc({pagination,sort}));
    
  }, [dispatch,page,sort])
  return (
    <>
      {/* component */}
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell cursor-pointer" onClick={(e)=>handleSort({sort:'id',order:sort?._order==='asc'?'desc':'asc'})}>
              Order#
              {sort._sort ==='id' && (sort._order==='asc'?<ArrowUpIcon className="w-4 h-4 inline"/> :<ArrowDownIcon className="w-4 h-4 inline"/>)}
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Items
            </th>

            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell cursor-pointer" onClick={(e)=>handleSort({sort:'totalAmount',order:sort?._order==='asc'?'desc':'asc'})}>
              Total Amount#
              {sort._sort ==='totalAmount' && (sort._order==='asc'?<ArrowUpIcon className="w-4 h-4 inline"/> :<ArrowDownIcon className="w-4 h-4 inline"/>)}
            </th>

            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Shipping Addresses
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Status
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                {order.id}
              </td>

              <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                {order.items.map((item, index) => (
                  <div className="flex items-center" key={index}>
                    <div className="mr-2">
                      <img
                        src={item.product.thumbnail}
                        className="w-6 h-6 rounded-full"
                        alt={item.product.title}
                      />
                    </div>
                    <span>
                      {item.product.title} - #{item.quantity}
                    </span>
                  </div>
                ))}
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {order.totalAmount}
                </div>
              </td>

              <td>
                <div className="">
                  <div>
                    <strong>{order.name}</strong>
                  </div>
                  <div> {order.selectedAddresess.street}</div>
                  <div> {order.selectedAddresess.city} </div>
                  <div>{order.selectedAddresess.state} </div>
                  <div>{order.selectedAddresess.pinCode} </div>
                </div>
              </td>

              <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                {editableOrderId ? (
                  <select onChange={e=>handleUpdate(e,order)} >
                    <option value="pending">Pending</option>

                    <option value="dispatched">DisPatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span
                    className={`${showColor(
                      order.status
                    )} py-1 px-3 rounded-full text-xs font-bold`}
                  >
                    {order.status}
                  </span>
                )}
              </td>

              <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Actions
                </span>
                <div className="flex justify-center items-center gap-7">
                  <EyeIcon
                    className="h-6 w-6"
                    onClick={(e) => handleShow(order)}
                  ></EyeIcon>
                  <PencilIcon
                    className="h-6 w-6"
                    onClick={(e) => handleEdit(order)}
                  ></PencilIcon>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {<Pagination
                    handlePage={handlePage}
                    page={page}
                    setPage={setPage}
                    totalItems={totalOrders}
                  /> }
    </>
  )
}

export default AdminOrders
