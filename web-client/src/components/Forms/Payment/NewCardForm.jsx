import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { paymentAPI } from "../../../services";
import { useToast } from "../../../utils/alert-utils/ToastUtil";

function NewCardForm({ userId, onSuccess, type }) {
  const stripe = useStripe();
  const elements = useElements();
  const [saveCard, setSaveCard] = useState(true);
  const [cardName, setCardName] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.warn("Stripe.js has not loaded yet.");
      return;
    }

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card });

    if (error || !paymentMethod) {
      console.error(error?.message || "Failed to create payment method");
      return;
    }

    if (saveCard) {
      try {
        await axios.post(paymentAPI.CardAPISaveCard, {
          userId,
          paymentMethodId: paymentMethod.id,
          cardName,
        });
        onSuccess(paymentMethod.id);
      } catch (err) {
        toast.error("Error: Couldn't Save Card");
      }
    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={{ hidePostalCode: true }} />
      <input
        type="text"
        className="input w-full border-none shadow-none bg-transparent focus:outline-none focus:ring-0"
        placeholder="Card name (e.g., Personal Visa)"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        required
      />

      {type === "Payment" ?
        <label className="label cursor-pointer">
          <span className="label-text">Save this card?</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={saveCard}
            onChange={() => setSaveCard(!saveCard)}
          />
        </label> : <></>

      }
      <button type="submit" className="btn btn-primary w-full mb-10">
        {type === "Card" ? "Save" : "Pay"}
      </button>
    </form>
  );
}

export default NewCardForm;
