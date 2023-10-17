const authService = require("../service/superAdminService");
const { generateRandomWallet } = require("../utils/etherGen");
const { tryCatch } = require("../utils/tryCatch");

const passport = require("passport");

const registerSuperAdmin = tryCatch(async (req, res, next) => {
  // Get request data
  const { address, publicKey, privateKey } = generateRandomWallet();
  const walletAddress = address;
  const publicKeywallet = publicKey;
  const privatekey = privateKey;
  const { name, email, phone, secretCode } = req.body;

  // Call the service to register super admin
  await authService.registerSuperAdmin(
    name,
    email,
    phone,
    walletAddress,
    publicKeywallet,
    secretCode
  );

  // Return success response with the private key
  return res.status(201).send({ privatekey });
});

const loginUser = passport.authenticate("local");

const logoutUser = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(400).send("Something Went wrong");
    }
    res.send("Logged out successfully");
  });
};


const allcompany = tryCatch(async (req, res, next) => {
  const userId = req.user.id;


  // Check if the logged-in user is a super admin
  await authService.isSuperAdmin(userId);

  const allC = await authService.allcompany(userId);
  res.send(allC);
});

module.exports = {
  registerSuperAdmin,
  loginUser,
  logoutUser,
  allcompany,
};
