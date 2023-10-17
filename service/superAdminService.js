const User = require("../model/superAdmin");

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
    throw new Error("Invalid secret code");
  }

  // Check if the user already exists

  const existingUser = await User.findOne({
    where: { email: email },
  });

  if (existingUser) {
    throw new Error("User already exists");
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
