import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardSelect from "../../../components/Cards/Payment/CardSelect";
import NewCardForm from "../../../components/Forms/Payment/NewCardForm";
import axios from "axios";
import { paymentAPI, orderAPI } from "../../../services";
import { useStripe } from "@stripe/react-stripe-js";
import ConfirmModal from "../../../components/Cards/Payment/ConfirmModal";
import { useToast } from "../../../utils/alert-utils/ToastUtil";

export default function SelectCardPayment({ amount, refNo }) {
    const [cards, setCards] = useState([]);
    const [useNewCard, setUseNewCard] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const stripe = useStripe();


    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(paymentAPI.CardAPIGetCardsByUser + `${user.id}`);
                if (response) {
                    setCards(response.data.cards); // Set only the cards array
                }
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchCards(); // Call the fetch function
    }, []);  // Make sure this is only called once when the component mounts

    const handleCardSelect = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    const confirmPayment = () => {
        axios
            .post(paymentAPI.PaymentAPIProcessPayment, {
                userId: user.id,
                refNo,
                amount,
                cardToken: selectedCard.cardToken,
            })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Payment successful!");
                    axios
                        .put(orderAPI.updatePaymentID(refNo), { paymentID: res.data.payment._id })
                        .then((response) => {

                            navigate("/customer/my-orders");

                        })
                        .catch((error) => {
                            console.error("Failed to update order status:", error);
                            toast.error("Failed to update order!");
                        });
                } else {
                    console.error("Payment failed");
                }
            })
            .catch((error) => {
                console.error("Payment error:", error);
                toast.error("Error processing payment. Please try again.");
            })
            .finally(() => {
                setShowModal(false);
                setSelectedCard(null);
            });
    };



    const handleModalCancel = () => {
        setShowModal(false);
        setSelectedCard(null);
    };

    const PaymentSuccess = () => {
        return (
            <h1 className="font-bold text-xl">Your Payment is successful !</h1>
        );
    }


    const handleNewCardSuccess = (token) => {
        axios
            .post(paymentAPI.PaymentAPIProcessPayment, {
                userId: user.id,
                refNo,
                amount,
                cardToken: token,
            })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Payment successful!");
                    PaymentSuccess();
                    axios
                        .put(orderAPI.updatePaymentID(refNo), { paymentID: res.data.payment._id })
                        .then((response) => {
                            navigate("/customer/my-orders");
                        })
                        .catch((error) => {
                            console.error("Failed to update order status:", error);
                            toast.error("Failed to update order!");
                        });
                } else {
                    toast.error("Payment failed.");
                    console.error("Payment failed response:", res.data);
                }
            })
            .catch((err) => {
                console.error("Error processing payment:", err);
                toast.error("Error processing payment. Please try again.");
            });
    };


    return (
        <div className="max-w-xl mx-auto p-4 space-y-4 overflow-auto mb-8 w-2/3 ">
            <h2 className="text-xl font-bold text-center">Select Card To Proceed Payment</h2>
            {useNewCard || cards.length === 0 ? (
                <NewCardForm userId={user.id} onSuccess={handleNewCardSuccess} type="Payment" />
            ) : (
                <CardSelect
                    savedCards={cards}
                    onSelect={handleCardSelect}
                    onOther={() => setUseNewCard(true)}
                />
            )}
            <ConfirmModal
                open={showModal}
                message={<span dangerouslySetInnerHTML={{ __html: `Are you sure you want to pay <strong>${amount}</strong> using <strong>${selectedCard?.cardName}</strong>?` }} />}
                header="Confirm Payment"
                onCancel={handleModalCancel}
                onConfirm={confirmPayment}
            />

        </div>
    );
}