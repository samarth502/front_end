// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
// import counterReducer from "../features/counter/counterSlice"
import productReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import userReducer from "../features/user/userSlice";






import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
      product:productReducer,
      auth:authReducer,
      cart:cartReducer,
      order:orderReducer,
      user:userReducer
  },
})

