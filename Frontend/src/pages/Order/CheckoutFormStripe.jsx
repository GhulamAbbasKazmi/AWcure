
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { updateUserDetails } from "../../features/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import './Order.css'

export default function CheckoutFormStripe({order}) {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }


    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required"
    });

    if (error) {
      setMessage(error.message);
    } 
    
    else if (paymentIntent && paymentIntent.status === 'succeeded') {
        dispatch(
            updateUserDetails({
                email: order?.user?.email,
                order_id: order?._id,
                isPaid: true,
            })
        )
    }
    
    else  {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button className="btnPayment" disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}