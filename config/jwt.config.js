const jwt = require("jsonwebtoken");
const ethers = require("ethers");
const Admin = require("../model/admin");
const superAdmin = require("../model/superAdmin");
const Employee = require("../model/employee");

const loginUser = async (req, res) => {
  try {
    const { email, privatekey } = req.body;

    // Perform authentication logic similar to Passport.js
    let user =
      (await superAdmin.findOne({ where: { email } })) ||
      (await Admin.findOne({ where: { email } })) ||
      (await Employee.findOne({ where: { email } }));

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Validate private key against the stored wallet address
    const wallet = new ethers.Wallet(privatekey);
    if (wallet.address.toLowerCase() === user.walletAddress.toLowerCase()) {
      // Generate a token with the entire user object in the payload
      const token = jwt.sign({ user }, "your-secret-key", { expiresIn: "1h" });

      // Store the token in the session
      req.session.token = token;

      // Send a response indicating successful login
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(401).json({ message: "Invalid private key" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const isloggedIN = (req, res, next) => {
  const token = req.session.token; // Retrieve the token from session

  if (!token) {
    return res.status(401).json({ message: "Please Login" });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded; // The entire user object is available at req.user.user
    next();
  });
};

const logoutUser = (req, res) => {
  try {
    // Clear the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error occurred while logging out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { loginUser, isloggedIN, logoutUser };
