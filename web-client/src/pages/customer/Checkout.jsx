import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageTitle } from '../../components'
import { styles } from '../../styles/styles'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SelectCardPayment from "./payment/SelectCardPayment";

const PUBLISHABLE_KEY = import.meta.env.VITE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

function Checkout() {
  const { cartId, amount } = useParams();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkStripe = async () => {
      await stripePromise;
      setReady(true);
    };
    checkStripe();
  }, []);


  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className={`${styles.paddingX} flex flex-col`}>
      <PageTitle title='Checkout' backLink='/customer' />

      <Elements stripe={stripePromise}>
        <SelectCardPayment amount={amount} refNo={cartId} />
      </Elements>
    </div>
  )
}

export default Checkout