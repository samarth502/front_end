import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginUser, createUser, singOut, checkAuth} from "./authAPI"
import { updateUser } from "../user/userAPI"
// import { fetchCount } from "./counterAPI"



const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error:null,
  userCheked:false
}


export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)



export const singOutAsync = createAsyncThunk(
  "user/singOut",
  async (userId) => {
    const response = await singOut(userId)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)



export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo,{rejectWithValue}) => {
    try {
      const response = await loginUser(loginInfo)
      return response.data
      
    } catch (error) {
      return rejectWithValue(error)      
    }
   
  },
)


export const checkAuthAsync = createAsyncThunk(
  "user/checkAuth",
  async () => {
    try {
      const response = await checkAuth();
      return response.data
      
    } catch (error) {
      // console.log(error);
    }
   
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
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.loggedInUserToken = action.payload
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.loggedInUserToken = action.payload
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle"
        state.error = action.payload
      })
      .addCase(singOutAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(singOutAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.loggedInUserToken =null
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.loggedInUserToken = action.payload;
        state.userCheked = true;

      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle"
        state.userCheked = true;

      })
      
  },
})

export const { increment } = userSlice.actions

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken
export const selectError = (state) => state.auth.error
export const selectUserChecked = (state) => state.auth.userCheked;



export default userSlice.reducer
