const logger = require("../config/logger.config");
const empService = require("../service/empService");
const ethers = require("ethers");

function generateRandomWallet() {
  const randomWallet = ethers.Wallet.createRandom();
  const address = randomWallet.address;
  const publicKey = randomWallet.publicKey;
  const privateKey = randomWallet.privateKey;
  return { address, privateKey, publicKey };
}

const createEmp = async (req, res) => {
  try {
    const userId = req.user.id;
    const loggeduser = req.user;

    const { address, privateKey } = generateRandomWallet();
    const walletAddress = address;

    const { name, email, phone, companyId } = req.body;

    // Check if the logged-in user is a super admin
    const isAdmin = await empService.isAdmin(userId);

    if (!isAdmin) {
      return res.status(403).json({ error: "Unauthorized to create admin" });
    }

    // Check if the company belongs to the logged-in user
    const doesCompanyBelongToUser = await empService.doesCompanyBelongToUser(
      companyId,
      loggeduser
    );

    if (!doesCompanyBelongToUser) {
      return res
        .status(403)
        .json({ error: "Unauthorized to create employee for this company" });
    }

    // Create the admin
    const emp = await empService.createEmp(
      name,
      email,
      phone,
      walletAddress,
      companyId,
      userId
    );

    return res.status(201).json({ emp, privatekey: privateKey });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEmp = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;

    await empService.updateEmp(userId, name, phone);
    return res
      .status(201)
      .json({ message: "information updatedn successfully" });
  } catch (err) {
    logger.error(err);
    return res.status(400).send(err);
  }
};

module.exports = {
  createEmp,
  updateEmp,
};
