const db = require("../models");
const LoginHistory = db.Login_history;

const checkPreviousLogin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const email = req.user.email;
    const ipAddress = req.ip;
    const previousLogin = await LoginHistory.findOne({
      where: { ipAddress, userId, email, logoutTime: null },
    });

    if (previousLogin) {
      return res.status(403).send({
        message: "User already logged in from this IP address and email",
      });
    }

    next();
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal Server Error", err: err.message });
  }
};

module.exports = { checkPreviousLogin };
