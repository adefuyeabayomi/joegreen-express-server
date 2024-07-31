const Order = require('../models/order.model');
const Auth = require('../models/auth.model');
const { transporter, mailOptions } = require('../functions/nodemailer.config');
const emailTemplates = require('../utils/emailTemplates');
const crypto = require('crypto');
const sendOrderConfirmationEmail = async (email, orderDetails) => {
    const confirmationEmailOptions = {
      ...mailOptions,
      to: email,
      subject: "Order Confirmation",
      html: emailTemplates.orderConfirmation(orderDetails),
    };
    await transporter.sendMail(confirmationEmailOptions);
  };
  
  const sendOrderCancellationEmail = async (email, orderDetails) => {
    const cancellationEmailOptions = {
      ...mailOptions,
      to: email,
      subject: "Order Cancellation",
      html: emailTemplates.orderCancellation(orderDetails),
    };
    await transporter.sendMail(cancellationEmailOptions);
  };
  
  const sendPaymentStatusEmail = async (email, paymentDetails) => {
    const paymentStatusEmailOptions = {
      ...mailOptions,
      to: email,
      subject: "Payment Status Update",
      html: emailTemplates.paymentStatus(paymentDetails),
    };
    await transporter.sendMail(paymentStatusEmailOptions);
  };
  
  // Example usage
  // await sendOrderConfirmationEmail(clientEmail, orderDetails);
// Create Order
    const createOrder = async (req, res) => {
    try {
        const { cartItems, phoneNumber, deliveryInfo, narration } = req.body;
        const transactionRef = crypto.randomBytes(15).toString('hex');
        const paymentRef = crypto.randomBytes(15).toString('hex');
        const newOrder = new Order({
            cartItems,
            phoneNumber,
            deliveryInfo,
            narration,
            transactionRef,
            paymentRef,
            paymentStatus: 'Pending',
            cancelled: false,
            user: req.user.userId
        });
        await newOrder.save();

        // Send Order Confirmation Email to Client
        const clientEmailOptions = {
            ...mailOptions,
            to: req.user.email,
            subject: "Order Confirmation",
            html: emailTemplates.orderConfirmation(newOrder)
        };

        await transporter.sendMail(clientEmailOptions);

        // Send Order Confirmation Email to Admin
        const admin = await Auth.findOne({ role: 'admin' }).sort({ createdAt: 1 }).limit(1);
        if (admin) {
            const adminEmailOptions = {
                ...mailOptions,
                to: admin.email,
                subject: "New Order Received",
                html: emailTemplates.orderConfirmation(newOrder),
            };
            await transporter.sendMail(adminEmailOptions);
        }

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.log({error})
        res.status(500).json({ error: error.message });
    }
};

// Update Order (e.g payment status)
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentStatus, cancelled, fulfilled, paymentRef, transactionRef } = req.body;
        
        // Update the order
        const updatedOrder = await Order.findByIdAndUpdate(orderId, {...req.body}, { new: true });
        
        // Send Email Notification based on update
        if (fulfilled) {
            const clientEmailOptions = {
                ...mailOptions,
                to: req.user.email,
                subject: "Your Order is On Its Way!",
                html: emailTemplates.orderFulfilled(req.user.email, updatedOrder),
            };
            await transporter.sendMail(clientEmailOptions);
        }

        if (paymentStatus) {
            const clientEmailOptions = {
                ...mailOptions,
                to: req.user.email,
                subject: "Order Payment Status Updated",
                html: emailTemplates.paymentStatus(req.user.email, updatedOrder),
            };
            await transporter.sendMail(clientEmailOptions);
        }

        if (cancelled) {
            const clientEmailOptions = {
                ...mailOptions,
                to: req.user.email,
                subject: "Order Cancelled",
                html: emailTemplates.orderCancellation(req.user.email, updatedOrder),
            };
            await transporter.sendMail(clientEmailOptions);
        }

        // Send Notification to Admin
        const admin = await Auth.findOne({ role: 'admin' }).sort({ createdAt: 1 }).limit(1);
        if (admin) {
            const adminEmailOptions = {
                ...mailOptions,
                to: admin.email,
                subject: cancelled ? "Order Cancelled" : fulfilled ? "Order Fulfilled" : "Order Updated",
                html: cancelled 
                    ? emailTemplates.orderCancellation(admin.email, updatedOrder) 
                    : fulfilled 
                        ? emailTemplates.orderFulfilled(admin.email, updatedOrder) 
                        : emailTemplates.paymentStatus(admin.email, updatedOrder),
            };
            await transporter.sendMail(adminEmailOptions);
        }

        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        console.log({error})
        res.status(500).json({ error: error.message });
    }
};


// Get Order by ID
    const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Orders with Search Queries
const getAllOrders = async (req, res) => {
    try {
        const { userId, paymentStatus, fulfilled, date } = req.query;

        // Build the query object based on provided search criteria
        let query = {};

        if (userId) {
            query.user = userId; // Use userId from query, not req.user.userId
        }

        if (paymentStatus) {
            query.paymentStatus = paymentStatus;
        }

        if (fulfilled) {
            query.fulfilled = fulfilled === 'false' ? false : true;
        }

        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999); // Set end of the day

            query.createdAt = {
                $gte: startDate,
                $lte: endDate
            };
        }

        console.log(query);

        // Fetch orders with the query object and populate user details
        const orders = await Order.find(query);

        res.status(200).json(orders);
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getOrderById,
    getAllOrders,
    updateOrder,
    createOrder
}