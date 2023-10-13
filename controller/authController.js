const bcrypt = require("bcrypt");
const authService = require("../service/authService");
const passport = require("passport");
const ethers = require("ethers");

function generateRandomWallet() {
  const randomWallet = ethers.Wallet.createRandom();
  const address = randomWallet.address;
  const publicKey = randomWallet.publicKey;
  const privateKey = randomWallet.privateKey;
  return { address, privateKey, publicKey };
}

const registerSuperAdmin = async (req, res) => {
  try {
    // Get request data
    const { address, publicKey, privateKey } = generateRandomWallet();
    const walletAddress = address;
    const publicKeywallet = publicKey;
    const privatekey = privateKey;
    const { name, email, phone, secretCode } = req.body;

    // Call the service to register super admin
    const newUser = await authService.registerSuperAdmin(
      name,
      email,
      phone,
      walletAddress,
      publicKeywallet,
      secretCode
    );

    // Return success response with the private key
    res.status(201).send({ privatekey });
  } catch (err) {
    console.error(err);
    res.status(401).send(err.message); // Use 401 Unauthorized status code for unauthorized access
  }
};

const loginUser = passport.authenticate("local");

const logoutUser = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(400).send("Something Went wrong");
    }
    res.send("Logged out successfully");
  });
};

module.exports = {
  registerSuperAdmin,
  loginUser,
  logoutUser,
};
