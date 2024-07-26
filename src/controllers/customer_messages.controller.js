const CustomerMessage = require("../models/customer_messages.model");
const { transporter, mailOptions } = require("../functions/nodemailer.config");
const emailTemplates = require("../utils/emailTemplates");

// Endpoint to handle incoming customer messages
const postCustomerMessage = async (req, res) => {
  const { email, message } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Save the customer message to the database
    const newMessage = new CustomerMessage({
      email,
      message,
      created: new Date().toISOString(),
      replied: false
    });

    await newMessage.save();

    // Return success response
    return res.status(201).json({ message: "Message received successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Endpoint to handle admin reply to customer message
const replyToCustomerMessage = async (req, res) => {
  const { messageId } = req.params;
  const { replyMessage } = req.body;

  try {
    // Find the customer message by ID
    const customerMessage = await CustomerMessage.findById(messageId);
    if (!customerMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Update the message as replied
    customerMessage.replied = true;
    await customerMessage.save();

    // Send the reply via email
    const replyEmailOptions = {
      ...mailOptions,
      to: customerMessage.email,
      subject: "Your message has been replied",
      html: emailTemplates.reply(customerMessage.email, replyMessage)
    };
    await transporter.sendMail(replyEmailOptions);

    // Return success response
    return res.status(200).json({ message: "Reply sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { postCustomerMessage, replyToCustomerMessage };
