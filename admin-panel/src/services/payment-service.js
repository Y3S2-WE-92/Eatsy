const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL;

export const paymentAPI = {
    PaymentAPIhealth: `${PAYMENT_API_URL}/health`,

    GetAllPaybacks: `${PAYMENT_API_URL}/payback`,

    GetCommissionSetting: `${PAYMENT_API_URL}/commission-setting`,
    UpdateCommissionSetting: `${PAYMENT_API_URL}/commission-setting/update`,
};
