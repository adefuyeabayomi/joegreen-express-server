const config = require("./config");

function welcome(name) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      <style>
        .w-max-content {
          width: max-content
        }
        body {
          color: #264f03;
        }
        .logo {
          width: 50px;
        }
        .heading-banner {
          background-image: linear-gradient(-196deg, #2d7004, #79c500);
          color: white !important;
          border-radius: 15px;
        }
        h1,h2,h3,h4,h5,h6 {
          color: #176917;
        }
        .heading-banner h1,.heading-banner h2,.heading-banner h3,.heading-banner h4,.heading-banner h5,.heading-banner h6{
          color: white;
        }
    .button-1 {
      background-color: #141612;
      color: white;
      border: 0px solid;
      border-radius: 6px;
      padding: 7px 30px;
    }
    .p-space{
      padding: 8px 0px;
    }

      </style>
    </head>
    <body>
      <div class="email-container m-2">
        <div class="py-2"></div>
        <h1>Hi ${name},Welcome to ${config.companyName}!</h1>
        <p>We're thrilled to have you on board. Let's serve you with the best inclass cullinary artistry in Nigeria.</p>
        <p>A Verification email would be sent to you shortly. Kindly verify your email so that you can be able to continue using the site.</p>
        <div class="p-space"></div>
        <small><i>For support, contact us via</i> <br>Company Mail: joegreencafeteriaservice@gmail.com <br> Call: 0916478 0187, 07043536861 </small>
      </div>
    </body>
    </html>`;
  }

function verify(name, userId, verifyToken) {
  const verifyLink = `${
    config.productionAddress || `http://${config.host}:${config.port}`
  }/auth/verify?user=${userId}&token=${verifyToken}`;
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Email</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <style>
    .w-max-content {
      width: max-content
    }
    body{
      color: #264f03;
    }
    .logo {
      width: 50px;
    }
    .heading-banner {
      background-image: linear-gradient(-196deg, #2d7004, #79c500);
      color: white !important;
      border-radius: 15px;
    }
    h1,h2,h3,h4,h5,h6 {
      color: #176917;
    }
    .heading-banner h1,.heading-banner h2,.heading-banner h3,.heading-banner h4,.heading-banner h5,.heading-banner h6{
      color: white;
    }
    .button-1 {
      background-color: #141612;
      color: white;
      border: 0px solid;
      border-radius: 6px;
      padding: 7px 30px;
    }
    .p-space{
      padding: 8px 0px;
    }
  </style>
</head>
<body>
  <div class="email-container p-2">
    <div class="py-2"></div>
    <h1>Verify Your Email</h1>
    <p>Hi ${name}, Please click the button below to verify your email address. If you didn't sign up for the account, kindly ignore this email.</p>
    <a href="${verifyLink}" class="button-1">Verify Email</a>
    <div class="p-space"></div>
    <small><i>For support, contact us via</i> <br>Company Mail: joegreencafeteriaservice@gmail.com <br> Call: 0916478 0187, 07043536861 </small>
  </div>
</body>
</html>
  `;
}

function passwordReset(name, resetToken, role) {
  let frontEndAddr;
  if(role == 'admin'){
    frontEndAddr = "https://joegreen-admin.netlify.app"
  }
  else {
    frontEndAddr = "https://joegreencafe.com"
  }
  const resetLink = `${
    frontEndAddr
  }/reset-password?resetToken=${resetToken}`;
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"><style>
    .w-max-content {
      width: max-content
    }
    body{
      color: #264f03;
    }
    .logo {
      width: 50px;
    }
    .heading-banner {
      background-image: linear-gradient(-196deg, #2d7004, #79c500);
      color: white !important;
      border-radius: 15px;
    }
    h1,h2,h3,h4,h5,h6 {
      color: #176917;
    }
    .heading-banner h1,.heading-banner h2,.heading-banner h3,.heading-banner h4,.heading-banner h5,.heading-banner h6{
      color: white;
    }
    .button-1 {
      background-color: #141612;
      color: white;
      border: 0px solid;
      border-radius: 6px;
      padding: 7px 30px;
    }
    .p-space{
      padding: 8px 0px;
    }

  </style>
</head>
<body>
  <div class="email-container p-2">
    <h5>Hello ${name},</h5>
    <h1>Password Reset</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}" class="button-1">Reset Password</a>
    <div class="p-space"></div>
    <small><i>For support, contact us via</i> <br>Company Mail: joegreencafeteriaservice@gmail.com <br> Call: 0916478 0187, 07043536861 </small>
  </div>
  </div>
</body>
</html>

  `;
}

const reply = (email, replyMessage) => `
  <html>
  <body>
    <p>Dear User,</p>
    <p>Thank you for reaching out to us. Here is our reply to your message:</p>
    <blockquote>${replyMessage}</blockquote>
    <p>Best regards,<br>Joegreen Cafeteria</p>
    <div style="height: 20px;"></div>
    <small><i>For support, contact us via</i> <br>Company Mail: joegreencafeteriaservice@gmail.com <br> Call: 0916478 0187, 07043536861 </small>
  </body>
  </html>
`;

// src/utils/emailTemplates.js

const orderConfirmation = (order) => {
  const { cartItems, phoneNumber, deliveryInfo, narration } = order;

  const calculateGrandTotal = (cartItems) => {
    return cartItems.reduce((grandTotal, item) => {
      const addonsTotalPrice = item.addons.reduce((total, addon) => {
        return total + addon.price * addon.quantity;
      }, 0);
      const totalCostPerPlate = item.price + addonsTotalPrice;
      const itemTotalCost = totalCostPerPlate * item.quantity;
      return grandTotal + itemTotalCost;
    }, 0);
  };
  let totalCost = calculateGrandTotal(order.cartItems)
  
  const itemsHtml = cartItems.map(item => {
    const addonsHtml = item.addons.map(addon => `
      <div style="padding: 8px; border: 1px solid #e0e0e0; border-radius: 4px; margin-top: 8px;">
        <p><strong>${addon.name}</strong></p>
        <p>Quantity: ${addon.quantity}</p>
        <p>Price: N${addon.price}</p>
      </div>
    `).join('');

    return `
      <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 16px;">
        <h3>${item.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: N${item.price}</p>
        ${addonsHtml ? `<div style="margin-top: 12px;"><h4>Addons:</h4>${addonsHtml}</div>` : ''}
      </div>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 80%;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .details {
          font-size: 16px;
          margin-top: 20px;
        }
        .footer {
          font-size: 14px;
          margin-top: 20px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
          <p>Thank you for your order!</p>
        </div>
        <div class="details">
          <p>Your order ID is: <strong>${order._id}</strong></p>
          <div>${itemsHtml}</div>
          <p><strong>Total Cost: N${totalCost}</strong></p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Delivery Information:</strong> ${deliveryInfo}</p>
          <p><strong>Narration:</strong> ${narration}</p>
        </div>
        <div class="footer">
          <p>We will notify you once your order is shipped.</p>
          <p>Best regards,</p>
          <p>The Team</p>
        <div style="height: 20px;"></div>
        <small><i>For support, contact us via</i> <br>Company Mail: joegreencafeteriaservice@gmail.com <br> Call: 0916478 0187, 07043536861 </small>
        </div>
      </div>
    </body>
    </html>
  `;
};
const paymentStatus = (paymentDetails) => {
  const { orderId, status } = paymentDetails;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Add your CSS styling here */
      </style>
    </head>
    <body>
      <h1>We have recieved your payment</h1>
      <p>We wanted to let you know that the payment status for your order has been updated.</p>
      <p>Your order ID is: ${orderId}</p>
      <p>New Payment Status: ${status}</p>
      <p>Best regards,</p>
      <p>The Team</p>
      
    <div style="height: 20px;"></div>
    <small><i>For support, contact us via</i> <br>Company Mail: joegreencafeteriaservice@gmail.com <br> Call: 0916478 0187, 07043536861 </small>
    </body>
    </html>
  `;
};

 const orderCancellation = (orderDetails) => {
  const { orderId, reason } = orderDetails;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Add your CSS styling here */
      </style>
    </head>
    <body>
      <h1>Order Cancellation</h1>
      <p>We're sorry to inform you that your order has been cancelled.</p>
      <p>Your order ID was: ${orderId}</p>
      <p>Best regards,</p>
      <p>The Team</p>
    <div style="height: 20px;"></div>
    <small><i>For support, contact us via</i> <br>Company Mail: joegreencafeteriaservice@gmail.com <br> Call: 0916478 0187, 07043536861 </small>
    </body>
    </html>
  `;
};
// Email template function for Order Fulfilled
const orderFulfilled = (email, order) => `
    <html>
    <head>
        <style>
            .card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 16px;
                margin: 10px 0;
                background: #f9f9f9;
            }
            .card-header {
                font-size: 18px;
                font-weight: bold;
            }
            .card-content {
                margin-top: 10px;
            }
            .card-item {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 10px;
                margin-bottom: 10px;
                background: #fff;
            }
        </style>
    </head>
    <body>
        <h2>Your Order has been Fulfilled!</h2>
        <p>Dear Customer,</p>
        <p>Your order with the reference <strong>${order.transactionRef}</strong> has been successfully fulfilled and is on its way to you!</p>
        
        <div class="card">
            <div class="card-header">Order Summary</div>
            <div class="card-content">
                <p><strong>Delivery Information:</strong> ${order.deliveryInfo}</p>
                <p><strong>Phone Number:</strong> ${order.phoneNumber}</p>
                <p><strong>Narration:</strong> ${order.narration || 'N/A'}</p>
            </div>
        </div>
        
        ${order.cartItems.map(item => {
          if (item.quantity == 0) return ''
            return `
            <div class="card-item">
                <div><strong>Dish:</strong> ${item.name}</div>
                <div><strong>Description:</strong> ${item.description}</div>
                <div><strong>Price per Plate:</strong> ${item.price}</div>
                <div><strong>Quantity:</strong> ${item.quantity}</div>
                ${item.addons.length > 0 ? `
                    <div><strong>Addons:</strong></div>
                    ${item.addons.map(addon => `
                        <div>${addon.name} (Price: ${addon.price}, Quantity: ${addon.quantity})</div>
                    `).join('')}
                ` : ''}
            </div>
        `}).join('')
      }
        
        <p>Thank you for shopping with us!</p>
        <p>Best Regards,</p>
        <p>Your Company Name</p>
    </body>
    </html>
`;

const eduEnrollment = (name, email, course, phoneNumber) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Enrollment Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 90%;
                max-width: 600px;
                margin: 0 auto;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header h1 {
                margin: 0;
                color: #333;
            }
            .content {
                font-size: 16px;
                color: #555;
            }
            .content p {
                margin: 0 0 10px;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Enrollment Notification</h1>
            </div>
            <div class="content">
                <p>Hello Admin,</p>
                <p>We have a new enrollment. Here are the details:</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Course:</strong> ${course}</p>
                <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                <p>Please review the enrollment details and take the necessary actions.</p>
                <p>Best regards,<br>Your Education Team</p>
            </div>
            <div class="footer">
                <p>Company Name | Address | Phone</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

const eduEnrollmentStudent = (name, email, course, phoneNumber) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enrollment Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 90%;
                max-width: 600px;
                margin: 0 auto;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header h1 {
                margin: 0;
                color: #333;
            }
            .content {
                font-size: 16px;
                color: #555;
            }
            .content p {
                margin: 0 0 10px;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Enrollment Confirmation</h1>
            </div>
            <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for enrolling in our course. Here are the details of your enrollment:</p>
                <p><strong>Course:</strong> ${course}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                <p>If you have any questions or need further assistance, please feel free to contact us.</p>
                <p>Best regards,<br>Your Education Team</p>
            </div>
            <div class="footer">
                <p>Company Name | Address | Phone</p>
            </div>
        </div>
    </body>
    </html>
  `;
}



module.exports = {
  welcome,
  verify,
  passwordReset,
  reply,
  orderConfirmation,
  paymentStatus,
  orderCancellation,
  orderFulfilled,
  eduEnrollment
};
