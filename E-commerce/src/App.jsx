import React, { useEffect } from "react"
import Home from "./pages/Home"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SingupPage from "./pages/SingupPage"
// import CheckOutPage from "./pages/CheckOut"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import Protected from "./features/auth/components/Protected"
import { useDispatch, useSelector } from "react-redux"
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice"
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from "./features/auth/authSlice"
import Cart from "./features/cart/Cart"
import PageNotFound from "./pages/404"
import OrderSuccessPage from "./pages/OrderSuccessPage"
import UserOrderPage from "./pages/UserOrderPage"
// import UserProfile from "./features/user/Components/UserProfile"
import UserProfilePage from "./pages/UserProfilePage"
import { fetchLoggedInUserAsync } from "./features/user/userSlice"
import Logout from "./features/auth/components/Logout"
import ForgetPassword from "./features/auth/components/ForgetPassword"
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin"
import AdminHome from "./pages/AdminHome "
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage.jsx"
import ProductForm from "./features/admin/ProductForm.jsx"
import AdminOrders from "./features/admin/Components/AdminOrders.jsx"
import CheckOutPage from "./pages/CheckOutPage.jsx"
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// import StripeCheckout from "./pages/StripeCheckout.jsx"

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },

  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },


  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <ProductForm></ProductForm>
      </ProtectedAdmin>
    ),
  },


  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <ProductForm></ProductForm>
      </ProtectedAdmin>
    ),
  },

  {
    path: "/admin/order",
    element: (
      <ProtectedAdmin>
        <AdminOrders></AdminOrders>
      </ProtectedAdmin>
    ),
  },

  

  {
    path: "/singup",
    element: <SingupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/cart",
    element: (
      <Protected>
        <Cart></Cart>
      </Protected>
    ),
  },

  {
    path: "/check-out",
    element: (
      <Protected>
        <CheckOutPage />
      </Protected>
    ),
  },

  {
    path: "/product-details/:id",
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },


  {
    path: "/admin/product-details/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPage />
      </ProtectedAdmin>
    ),
  },

  {
    path: "/order-sucess/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },

  {
    path: "/orders",
    element: (
      <Protected>
        
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },

  {
    path: "/profile",
    element: (
      <Protected>
        
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },

  {
    path: "/logout",
    element: (
      <Logout></Logout>
    ),
  },
  {
    path: "/forget-password",
    element: (<ForgetPassword></ForgetPassword>)
  },

  // {
  //   path: "/stripe-checkout/",
  //   element: (<Protected>
  //     <StripeCheckout></StripeCheckout>

  //   </Protected>)
  // },

  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
])
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  const userCheked = useSelector(selectUserChecked);

  useEffect(()=>{
    dispatch(checkAuthAsync());
  },[])

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  }, [dispatch, user])
  return (
    <>
      <div className="App">
      <Provider template={AlertTemplate} {...options}>
        {userCheked && 
        <RouterProvider router={router} />
}
        </Provider>
      </div>
    </>
  )
}

export default App
