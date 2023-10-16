const logger = require("../config/logger.config");
const AdminService = require("../service/adminService");
const ethers = require("ethers");

function generateRandomWallet() {
  const randomWallet = ethers.Wallet.createRandom();
  const address = randomWallet.address;
  const publicKey = randomWallet.publicKey;
  const privateKey = randomWallet.privateKey;
  return { address, privateKey, publicKey };
}

const createAdmin = async (req, res) => {
  try {
    const userId = req.user.id;

    const { address, privateKey } = generateRandomWallet();
    const walletAddress = address;

    const { name, email, phone, companyId } = req.body;

    // Check if the logged-in user is a super admin
    const isSuperAdmin = await AdminService.isSuperAdmin(userId);

    if (!isSuperAdmin) {
      return res.status(403).json({ error: "Unauthorized to create admin" });
    }

    // Check if the company belongs to the logged-in user
    const doesCompanyBelongToUser = await AdminService.doesCompanyBelongToUser(
      companyId,
      userId
    );

    if (!doesCompanyBelongToUser) {
      return res
        .status(403)
        .json({ error: "Unauthorized to create admin for this company" });
    }

    // Create the admin
    const admin = await AdminService.createAdmin(
      name,
      email,
      phone,
      walletAddress,
      companyId,
      userId
    );

    return res.status(201).json({ admin, privatekey: privateKey });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAdmin,
};
