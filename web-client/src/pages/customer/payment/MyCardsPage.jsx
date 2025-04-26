import { useEffect, useState } from "react";
import SavedCards from "../../../components/Cards/Payment/SavedCards";
import NewCardForm from "../../../components/Forms/Payment/NewCardForm";
import axios from "axios";
import { paymentAPI } from "../../../services";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "../../../utils/alert-utils/ToastUtil";

const PUBLISHABLE_KEY = import.meta.env.VITE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

export default function MyCardsPage() {
  const [ready, setReady] = useState(false);
  const [cards, setCards] = useState([]);
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCards = () => {
    return axios.get(paymentAPI.CardAPIGetCardsByUser + `${user.id}`)
      .then(response => {
        setCards(response.data.cards || []);
      })
      .catch(error => {
        console.error("Error fetching cards:", error);
        toast.error("Error fetching data");
      });
  };

  const fetchCardsAfterSaving = () => {
    fetchCards()
      .then(() => {
        toast.success("Card Saved Successfully!");
      });
  };

  const checkStripe = () => {
    stripePromise.then(() => setReady(true));
  };

  useEffect(() => {
    fetchCards();
    checkStripe();
  }, []);

  const handleDelete = (id) => {
    axios.delete(paymentAPI.DeleteCard + `${id}`)
      .then(() => fetchCards())
      .then(() => {
        toast.success("Card deleted successfully!");
      })
      .catch(error => {
        console.error("Error deleting card:", error);
        toast.error("Couldn't delete card");
      });
  };

  if (!ready) return <div>Loading Stripe...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold">My Saved Cards</h2>

      {/* Always render SavedCards */}
      <SavedCards cards={cards} onDelete={handleDelete} />

      <div className="divider">Add New Card</div>

      <Elements stripe={stripePromise}>
        <NewCardForm userId={user.id} onSuccess={fetchCardsAfterSaving} type="Card" />
      </Elements>
    </div>
  );
}
