import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { selectUserInfo, updateUserAsync } from "../userSlice"



const UserProfile = () => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()
  const userInfo = useSelector(selectUserInfo)
  const [selectedEditIndex, setSelectedEditIndex] = useState(false)
  const [addNewAddress, setAddNewAddress] = useState(false)

  const dispatch = useDispatch()

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1,addressUpdate)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(false)
  }

  const handleEditForm = (index)=>{
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue('name',address.name);
    setValue('email',address.email);
    setValue('city',address.city);
    setValue('state',address.state);
    setValue('pinCode',address.pinCode);
    setValue('phone',address.phone);
    setValue('street',address.street);

    
  }


  
  const handleNewAdd = (address)=>{
    const newUser = { ...userInfo, addresses: [...userInfo.addresses,address] }
    dispatch(updateUserAsync(newUser))
    setAddNewAddress(false)

  }

  

  return (
    <>
      <div>
        <div className="mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 my-5">
              {userInfo?.name ? userInfo.name : "New user"}
            </h1>

            <p className="text-xl text-red-600 font-bold tracking-tight  my-5">
              Email Addreses: {userInfo.email}
            </p>


            {userInfo.role=='admin' && <p className="text-xl text-red-600 font-bold tracking-tight  my-5">
              role: {userInfo.role}
            </p>}
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
              type="submit"
              onClick={()=>{setAddNewAddress(true);setSelectedEditIndex(false)}}
              className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Addresess
            </button>

            {addNewAddress ? (
                  <form
                    className="bg-white px-5 mt-12 py-5"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      handleNewAdd(data)
                      reset()
                    })}
                  >
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "name is required",
                                })}
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register("email", {
                                  required: "email is required",
                                })}
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone Number
                            </label>
                            <div className="mt-2">
                              <input
                                type="tel"
                                {...register("phone", {
                                  required: "phone is required",
                                })}
                                id="phone"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("street", {
                                  required: "street is required",
                                })}
                                id="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "city is required",
                                })}
                                id="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("state", {
                                  required: "state is required",
                                })}
                                id="state"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="pinCode"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("pinCode", {
                                  required: "pinCode is required",
                                })}
                                id="pinCode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="submit"
                          onClick={() => setAddNewAddress(false)}
                          className="rounded-md  px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Chacel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add Addresess
                        </button>
                      </div>

                      <div className="border-b border-gray-900/10 pb-12">
                        {/* <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Addresses
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Chooes from Existing Addresses
                        </p>

                        <ul role="list">
                          {user.addresses.map((address, index) => (
                              
                            <li
                              key={index}
                              className="flex justify-between gap-x-6 py-5 px-4 border-solid border-2 border-gray-200"
                            >
                              <div className="flex min-w-0 gap-x-4">
                                <input
                                  type="radio"
                                  onClick={(e) => handleAddresess(e)}
                                  name="address"
                                  value={index}
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />

                                <div className="min-w-0 flex-auto">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {address.name}
                                  </p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {address.street}
                                  </p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {address.Pincode}
                                  </p>
                                </div>
                              </div>
                              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">
                                  phone: {address.phone}
                                </p>

                                <p className="text-sm leading-6 text-gray-500">
                                  {address.city}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>  */}

                        {/* <div className="mt-10 space-y-10">
                          <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                              Payment Method
                            </legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Chosse one
                            </p>
                            <div className="mt-6 space-y-6">
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="case"
                                  name="payments"
                                  onChange={(e) => handlePayment(e)}
                                  value="case"
                                  checked={paymenthMethod === "case"}
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label
                                  htmlFor="case"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  case
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="card"
                                  name="payments"
                                  onChange={(e) => handlePayment(e)}
                                  checked={paymenthMethod === "card"}
                                  value="card"
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label
                                  htmlFor="push-email"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  card payment
                                </label>
                              </div>
                            </div>
                          </fieldset>
                        </div> */}
                      </div>
                    </div>
                  </form>
                ) : null}
            <p className="mt-0.5 text-sm text-gray-500">Your Addresess</p>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Chooes from Existing Addresses
            </p>

            <ul role="list">
              {userInfo.addresses.map((address, index) => (
                <div>
                  {selectedEditIndex === index ? (
                    <form
                      className="bg-white px-5 mt-12 py-5"
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        // console.log(data)
                        handleEdit(data,index)

                        reset()
                      })}
                    >
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                            Personal Information
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use a permanent address where you can receive mail.
                          </p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Full Name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("name", {
                                    required: "name is required",
                                  })}
                                  id="name"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "email is required",
                                  })}
                                  type="email"
                                  autoComplete="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Phone Number
                              </label>
                              <div className="mt-2">
                                <input
                                  type="tel"
                                  {...register("phone", {
                                    required: "phone is required",
                                  })}
                                  id="phone"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="street"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("street", {
                                    required: "street is required",
                                  })}
                                  id="street"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("city", {
                                    required: "city is required",
                                  })}
                                  id="city"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="state"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("state", {
                                    required: "state is required",
                                  })}
                                  id="state"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="pinCode"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("pinCode", {
                                    required: "pinCode is required",
                                  })}
                                  id="pinCode"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            type="button"
                            onClick={()=>setSelectedEditIndex(false)}
                            className="text-sm font-semibold leading-6 text-gray-900"
                          >
                            Chacel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                          {/* <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Addresses
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Chooes from Existing Addresses
                          </p>

                          <ul role="list">
                            {user.addresses.map((address, index) => (
                              <li
                                key={index}
                                className="flex justify-between gap-x-6 py-5 px-4 border-solid border-2 border-gray-200"
                              >
                                <div className="flex min-w-0 gap-x-4">
                                  <input
                                    type="radio"
                                    // onClick={(e)=>handleAddresess(e)}
                                    onClick={(e) => handleAdresses(e)}
                                    name="address"
                                    value={index}
                                    // value={index}

                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />

                                  <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                      {address.name}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                      {address.street}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                      {address.pinCode}
                                    </p>
                                  </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                  <p className="text-sm leading-6 text-gray-900">
                                    phone: {address.phone}
                                  </p>

                                  <p className="text-sm leading-6 text-gray-500">
                                    {address.city}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul> */}

                          {/* <div className="mt-10 space-y-10">
                            <fieldset>
                              <legend className="text-sm font-semibold leading-6 text-gray-900">
                                Payment Method
                              </legend>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Chosse one
                              </p>
                              <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                  <input
                                    id="case"
                                    name="payments"
                                    onChange={(e) => handlePayment(e)}
                                    value="case"
                                    checked={payment === "case"}
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                  <label
                                    htmlFor="case"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    case
                                  </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                  <input
                                    id="card"
                                    name="payments"
                                    onChange={(e) => handlePayment(e)}
                                    checked={payment === "card"}
                                    value="card"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                  <label
                                    htmlFor="push-email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    card payment
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div> */}
                        </div>
                      </div>
                    </form>
                  ) : null}
                  <li
                    key={index}
                    className="flex justify-between gap-x-6 py-5 px-4 border-solid border-2 border-gray-200"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <input
                        type="radio"
                        //   onClick={(e) => handleAddresess(e)}
                        name="address"
                        value={index}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />

                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.Pincode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        phone: {address.phone}
                      </p>

                      <p className="text-sm leading-6 text-gray-500">
                        {address.city}
                      </p>
                    </div>

                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <button
                        onClick={() =>handleEditForm(index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleRemove(e, index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
