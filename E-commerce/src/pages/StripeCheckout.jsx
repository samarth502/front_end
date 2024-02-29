// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// // import CheckoutForm from "./CheckoutForm";
// import "../Stripe.css";
// import { useSelector } from "react-redux";
// import { selectCurrentOrder } from "../features/order/orderSlice";
// import CheckoutForm from "./CheckOutForm";

// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// // This is your test publishable API key.
// const stripePromise = loadStripe("pk_test_51NcQ2XSAtKMo28x7MZ14MxsbCEZHChSKUIOiLK2Xl8ObPMBQp3O4UH13qbvCfjAqGVWzAQ1exQjAezvGK3TqrQTt00CF0XR5WQ");

// export default function StripeCheckout() {
//   const [clientSecret, setClientSecret] = useState("");
//   const currentOrder = useSelector(selectCurrentOrder);

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);

//   const appearance = {
//     theme: 'stripe',
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div className="stripe">
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
//   );
// }