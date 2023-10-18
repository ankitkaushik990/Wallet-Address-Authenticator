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
  await empService.isAdmin(userId);

  //check employee exist or not before add
  await empService.isExist(email);

  // Check if the company belongs to the logged-in user
  await empService.doesCompanyBelongToUser(companyId, loggeduser);

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
