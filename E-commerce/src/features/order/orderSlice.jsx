import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createOrder, fetchAllOrder, updateOrder } from "./orderAPI"



const initialState = {
  value: 0,
  orders:[],
  totalOrders:0,
  currentOrder:null,
  status: "idle",
}


export const createOrderAsyuc = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const updateOrderAsyuc = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const fetchAllOrderAyanc = createAsyncThunk(
  "order/fetchAllOrder",
  async ({pagination,sort}) => {
    const response = await fetchAllOrder(pagination,sort)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const orderSlice = createSlice({
  name: "order",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetCurrentOrder: (state) => {
  
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsyuc.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createOrderAsyuc.fulfilled, (state, action) =>  {
        state.status = "idle"
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrderAyanc.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAllOrderAyanc.fulfilled, (state, action) =>  {
        state.status = "idle"
        state.orders = action.payload.orders
        state.totalOrders = action.payload.totalOrders

      })
      .addCase(updateOrderAsyuc.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateOrderAsyuc.fulfilled, (state, action) =>  {
        state.status = "idle"
        const index = state.orders.findIndex(order=>order.id===action.payload.id);
        state.orders[index] = action.payload;

      })
      
      
  },
})

export const { resetCurrentOrder } = orderSlice.actions

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;






export default orderSlice.reducer
