import React, { useEffect, useState } from "react"
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { useDispatch, useSelector } from "react-redux"
// import { useAlert } from "react-alert"

// import {
//   clearSelectedProduct,
//   createproductAsyn,
//   fetchProductByIdAsync,
//   productUpdateAsync,
//   selectAllBrands,
//   selectAllCategories,
//   selectedProductById,
// } from "../../Product/ProductSlice"
import { useForm } from "react-hook-form"
import {  clearSelectedProduct, fetchProductByIdAsync, productCreateAsync, selectAllBrands, selectAllCategories, selectedProductById, updateProductAsync } from "../product/productSlice"
import { useParams } from "react-router-dom"
import { fetchProductById } from "../product/productAPI"
// import Modal from "../../common/Modal"

const ProductForm = () => {
  const [openModal, setOpenModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()
  const categories = useSelector(selectAllCategories)
  const brands = useSelector(selectAllBrands)
  const dispatch = useDispatch()
  const selectedProduct = useSelector(selectedProductById);
  const params = useParams()

  useEffect(()=>{
    if(params.id){
      dispatch(fetchProductByIdAsync(params.id))

    }else{
      dispatch(clearSelectedProduct())

    }

  },[params.id,dispatch])

  useEffect(()=>{
    if(selectedProduct && params.id){
      setValue("title", selectedProduct.title)
      setValue("description", selectedProduct.description)
      setValue("price", selectedProduct.price)
      setValue("discountPercentage", selectedProduct.discountPercentage)
      setValue("image1", selectedProduct.images[0])
      setValue("image2", selectedProduct.images[1])
      setValue("image3", selectedProduct.images[2])

      setValue("stock", selectedProduct.stock)
      setValue("brand", selectedProduct.brand)
      setValue("category", selectedProduct.category)
      setValue("thumbnail", selectedProduct.thumbnail)
    }


  },[selectedProduct,dispatch,params.id])


  const handleDelete = ()=>{
    const product = {...selectedProduct};
    product.delete = true;
    dispatch(updateProductAsync(product));

  }
  // const selectedProduct = useSelector(selectedProductById)
  // const alert = useAlert()

  // useEffect(() => {
  //   if (params.id) {
  //     dispatch(fetchProductByIdAsync(params.id))
  //   } else {
  //     dispatch(clearSelectedProduct())
  //   }
  // }, [params.id, dispatch])

  // useEffect(() => {
  //   if (selectedProduct && params.id) {
  //     setValue("title", selectedProduct.title)
  //     setValue("description", selectedProduct.description)
  //     setValue("price", selectedProduct.price)
  //     setValue("discountPercentage", selectedProduct.discountPercentage)
  //     setValue("image1", selectedProduct.images[0])
  //     setValue("image2", selectedProduct.images[1])
  //     setValue("image3", selectedProduct.images[2])

  //     setValue("stock", selectedProduct.stock)
  //     setValue("brand", selectedProduct.brand)
  //     setValue("category", selectedProduct.category)
  //     setValue("thumbnail", selectedProduct.thumbnail)
  //   }
  // }, [selectedProduct, setValue, params.id])

  // const handleDeleted = () => {
  //   const product = { ...selectedProduct }
  //   product.deleted = true
  //   dispatch(productUpdateAsync(product))
  // }

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data }
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ]
          product.rating = 0;
          delete product["image1"]
          delete product["image2"]
          delete product["image3"]
          product.price = +product.price
          product.stock = +product.stock

          product.discountPercentage = +product.discountPercentage
          if(params.id){
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product))
            reset()

          }else{
            dispatch(productCreateAsync(product))
          }
          // dispatch(productCreateAsync(product))

          // if (params.id) {
          //   product.id = params.id
          //   dispatch(productUpdateAsync(product))
          //  alert.success("Product Updated Sucessfully");

          //   reset()
          // } else {
          //   dispatch(createproductAsyn(product))
          //   alert.success("Create Product");

          //   reset()
          // }
        })}
      >
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* {selectedProduct?.deleted && ( */}
                <h1 className="text-red-700 sm:col-span-4">
                  This product is deleted
                </h1>
              {/* )} */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("title", { required: "Name is required" })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Descripation
                </label>
                <div className="mt-2">
                  <textarea
                    id="descripation"
                    {...register("description", {
                      required: "descripation is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about Product.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", { required: "Brand is required" })}
                  >
                    <option value="">--Choose Option--</option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.label}</option>
                    ))}
                  </select>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about Product.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  categories
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "categories is required",
                    })}
                  >
                    <option value="">--Choose categories--</option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about Product.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="Price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("price", {
                        required: "Price is required",
                        min: 1,
                        max: 10000,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        required: "Discount is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "Stock is required",
                        min: 0,
                      })}
                      id="stocke"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "Thumbnail is required",
                        min: 0,
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image1", {
                        required: "image1 is required",
                      })}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image2", {
                        required: "image2 is required",
                      })}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image3", {
                        required: "image3 is required",
                      })}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Extra
            </h2>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
        
           {selectedProduct && <button
            // onClick={() => setOpenModal(true)}  
            onClick={handleDelete}
            type="button"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete Product
          </button>}
          
        
          <button
            type="submit"
            // onClick={() => setOpenModal(false)}  

            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>

        {/* <Modal
          title={`Delete ${selectedProduct?.title} `}
          message="Are you sure you want to delete this Product"
          dangerOption="Danger"
          cancelOption="Cancel"
          cancelAction={() => setOpenModal(false)}
          dangerAction={handleDeleted}
          showModal={openModal}
        ></Modal> */}
      </form>
    </>
  )
}

export default ProductForm;

