const logger = require("../config/logger.config");
const empService = require("../service/empService");
const { generateRandomWallet } = require("../utils/etherGen");
const { tryCatch } = require("../utils/tryCatch");

const createEmp = tryCatch(async (req, res, next) => {
  const userId = req.user.id;
  const loggeduser = req.user;

  const { address, privateKey } = generateRandomWallet();
  const walletAddress = address;

  const { name, email, phone, companyId } = req.body;

  // Check if the logged-in user is a super admin
  const isAdmin = await empService.isAdmin(userId);

  if (!isAdmin) {
    return res.status(403).send({ error: "Unauthorized to create employee" });
  }

  // Check if the company belongs to the logged-in user
  const doesCompanyBelongToUser = await empService.doesCompanyBelongToUser(
    companyId,
    loggeduser
  );

  if (!doesCompanyBelongToUser) {
    return res
      .status(403)
      .send({ error: "Unauthorized to create employee for this company" });
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

  res.status(201).send({ emp, privatekey: privateKey });
});

const updateEmp = tryCatch(async (req, res, next) => {
  const userId = req.user.id;
  const { name, phone } = req.body;

  await empService.updateEmp(userId, name, phone);
  return res.status(201).send({ message: "information updated successfully" });
});

module.exports = {
  createEmp,
  updateEmp,
};
