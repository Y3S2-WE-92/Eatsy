const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL;

export const paymentAPI = {
    PaymentAPIhealth: `${PAYMENT_API_URL}/health`,
    PaymentAPIGetPaymentForUser: `${PAYMENT_API_URL}/payment/user/`,
    PaymentAPIGetPaymentById: `${PAYMENT_API_URL}/payment/`,
    PaymentAPIProcessPayment: `${PAYMENT_API_URL}/payment-order/pay`,
    
    CardAPIGetCardsByUser: `${PAYMENT_API_URL}/card/user/`,
    CardAPISaveCard: `${PAYMENT_API_URL}/card/save`,
    DeleteCard: `${PAYMENT_API_URL}/card/`,

    
    PaymentAPIGetPaybackByReceiverId: `${PAYMENT_API_URL}/payback/receiver/`,
    EditDeleteCard: (id) => `${PAYMENT_API_URL}/card/${id}`,
};
