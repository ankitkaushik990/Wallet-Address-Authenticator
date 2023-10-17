const User = require("../model/superAdmin");
const AppError = require("../middleware/appError");

const registerSuperAdmin = async (
  name,
  email,
  phone,
  walletAddress,
  publicKeywallet,
  secretCode
) => {
  // Check if the secret code matches
  const superadminSecretCode = process.env.SUPERADMIN_SECRET_CODE;

  if (superadminSecretCode !== secretCode) {
    throw new AppError("149B", "secret code not matched", 400);
  }

  // Check if the user already exists

  const existingUser = await User.findOne({
    where: { email: email },
  });

  if (existingUser) {
    throw new AppError("147B", "user already exist", 400);
  }

  // Create the new super admin
  const newUser = await User.create({
    name,
    email,
    phone,
    walletAddress,
    publicKeywallet,
    role: "superAdmin", // Assign the role as 'superadmin'
  });

  return newUser;
};

module.exports = {
  registerSuperAdmin,
};
