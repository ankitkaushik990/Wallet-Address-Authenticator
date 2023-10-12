const ethers = require("ethers");
const SuperAdmin = require("../model/user");

const isAuthenticated = async (req, res, next) => {
  try {
    const { email, privateKey } = req.body;

    // Check if the email exists in the database
    const superadmin = await SuperAdmin.findOne({ where: { email } });
    if (!superadmin) {
      return res.status(401).send("User not available. Please register first.");
    }

    // Validate private key against the stored wallet address
    const wallet = new ethers.Wallet(privateKey);
    const isValidPrivateKey =
      wallet.address.toLowerCase() === superadmin.walletAddress.toLowerCase();

    if (!isValidPrivateKey) {
      return res.status(401).send("Invalid private key.");
    }

    // If email and private key are valid, attach the superadmin object to the request for further processing
    req.superadmin = superadmin;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = isAuthenticated;
