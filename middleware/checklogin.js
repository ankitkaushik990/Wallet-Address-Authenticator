// const LoginHistory = require("../model/loginHistory");
const db = require("../models");

const LoginHistory = db.Login_history;


const checkPreviousLogin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const email = req.user.email; // Assuming the email is available in req.user
    const ipAddress = req.ip;

    // Check if there is a previous login from the same user ID, email, and IP address where logoutTime is null
    const previousLogin = await LoginHistory.findOne({
      where: { ipAddress, userId, email, logoutTime: null },
    });

    if (previousLogin) {
      // User is already logged in from this IP address and email
      return res.status(403).send({
        message: "User already logged in from this IP address and email",
      });
    }

    // If there is no previous login, proceed with the next middleware or route handler
    next();
  } catch (err) {
    // Handle errors
    res
      .status(500)
      .send({ message: "Internal Server Error", err: err.message });
  }
};

module.exports = { checkPreviousLogin };
