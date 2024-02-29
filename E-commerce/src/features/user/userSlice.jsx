import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedInUser, fetchLoggedInUserOrder, updateUser } from "./userAPI"



const initialState = {
  value: 0,
  status: "idle",
  userInfo:null,
}


export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrder",
  async () => {
    const response = await fetchLoggedInUserOrder()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)



export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (id) => {
    const response = await updateUser(id)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)


export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
  
      state.value += 1
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userInfo.orders = action.payload
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userInfo = action.payload
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userInfo = action.payload
      })
      
  },
})

export const { increment } = userSlice.actions

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo


export default userSlice.reducer
