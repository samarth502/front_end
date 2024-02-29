


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchAllProduct, fetchAllbrands, fetchAllcategories, fetchProductByFillter, fetchProductById, productCreate, updateProduct } from "./productAPI"



const initialState = {
  products: [],
  categories:[],
  brands:[],
  selectedProduct:null,
  totalItems:0,
  status: "idle",
}


export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProduct()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)


export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (update) => {
    const response = await updateProduct(update)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const productCreateAsync = createAsyncThunk(
  "product/productCreate",
  async (product) => {
    const response = await productCreate(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const fetchProducFiltersAsync = createAsyncThunk(
  "product/fetchProductByFillter",
  async ({filter,sort,pagination,admin}) => {
    const response = await fetchProductByFillter(filter,sort,pagination,admin)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)


export const fetchAllcategoriesAsync = createAsyncThunk(
  "product/fetchAllcategories",
  async () => {
    const response = await fetchAllcategories()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const fetchAllbrandsAsync = createAsyncThunk(
  "product/fetchAllbrands",
  async () => {
    const response = await fetchAllbrands()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)



export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearSelectedProduct: (state) => {
  
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.products = action.payload
      })
      .addCase(fetchProducFiltersAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.products = action.payload.products
        state.totalItems = action.payload.totalItems


      })
      .addCase(fetchAllcategoriesAsync.pending, (state) => {
        state.status = "loading"
      })
      
      .addCase(fetchAllcategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.categories = action.payload
      })

      .addCase(fetchAllbrandsAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAllbrandsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.brands = action.payload
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.selectedProduct = action.payload
      })
      .addCase(productCreateAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(productCreateAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.products.push( action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle"
        const index = state.products.findIndex(product=>product.id===action.payload.id);
        state.products[index] = action.payload;
      })
      
  },
})

export const { clearSelectedProduct } = productSlice.actions

export const selectAllCategories = (state) => state.product.categories
export const selectAllBrands = (state) => state.product.brands
export const selectAllProducts = (state) => state.product.products
export const selectTotalItems = (state) => state.product.totalItems
export const selectedProductById = (state) => state.product.selectedProduct
export const selectedProducListStatus = (state) => state.product.status









export default productSlice.reducer
