const Payback = require("../models/payback.model");
const CommissionSetting = require("../models/commissionSetting.model");
const sendPaybackNotification = require("../utils/sendPaybackNotification.util");
const getUserEmailByType = require("../utils/getUserEmailByType.util.js")

const createPayback = async (req, res) => {
    try {
        const { refNo, receiverId, amount, receiverType } = req.body;

        const commissionSetting = await CommissionSetting.findOne();
        if (!commissionSetting) {
            return res.status(400).json({ message: "Commission settings not configured." });
        }

        const platformCommission = receiverType === 'restaurant'
            ? amount * commissionSetting.restaurantCommissionPercentage / 100
            : amount * commissionSetting.deliveryCommissionPercentage / 100;

        const amountReceived = amount - platformCommission;

        // Check if payback already exists
        const existingPayback = await Payback.findOne({ refNo, receiverType });
        if (existingPayback) {
            return res.status(400).json({ message: "Payback already exists" });
        }

        const payback = new Payback({
            refNo,
            receiverId,
            receiverType,
            amountReceived,
            platformCommission
        });

        await payback.save();

        const email = getUserEmailByType({id: receiverId, receiverType})

        // Prepare different email content based on receiverType
        if (email) {
            const isRestaurant = receiverType === 'restaurant';
            const greeting = isRestaurant ? "Dear Restaurant Partner," : "Dear Delivery Partner,";
            const serviceType = isRestaurant ? "your recent order" : "your delivery service";
            const thanksMessage = isRestaurant ? "Thank you for partnering with Eatsy!" : "Thank you for working with Eatsy!";
            const subject = isRestaurant ? "Payment Received for Your Order" : "Payment Received for Delivery";

            await sendPaybackNotification({
                to: email,
                subject,
                text: `You have received LKR ${amountReceived} after platform commission for Order ID: ${refNo}.`,
                html: `<div style="font-family: Arial, sans-serif; color: #333; padding-left: 20px;">
                    <h3>${greeting}</h3>
                    <h3>We are pleased to inform you that you have received a payment for ${serviceType}.</h3>
                    <h3><b>Net Amount:</b> LKR ${amountReceived}</h3>
                    <h3><b>Order ID:</b> ${refNo}</h3>
                    <h3>${thanksMessage}</h3>
                </div>`
            });
        }

        res.status(201).json(payback);

    } catch (error) {
        console.error("Error creating payback:", error.message);
        res.status(500).json({ message: "Server error while creating payback." });
    }
};

const getPaybacks = async (req, res) => {
    try {
        const paybacks = await Payback.find();
        res.status(200).json(paybacks);
    } catch (error) {
        console.error("Error fetching paybacks:", error.message);
        res.status(500).json({ message: "Server error while fetching paybacks." });
    }
};

const getPaybackByOrderId = async (req, res) => {
    const { id } = req.params;
    try {
        const paybacks = await Payback.find({ refNo: id });
        res.status(200).json(paybacks);
    } catch (error) {
        console.error("Error fetching paybacks:", error.message);
        res.status(500).json({ message: "Server error while fetching paybacks." });
    }
};

module.exports = { createPayback, getPaybacks, getPaybackByOrderId };