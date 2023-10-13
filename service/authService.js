const bcrypt = require("bcrypt");
const User = require("../model/user");

const registerSuperAdmin = async (
  name,
  email,
  phone,
  walletAddress,
  publicKeywallet,
  secretCode
) => {
  try {
    // Check if the secret code matches
    const superadminSecretCode = process.env.SUPERADMIN_SECRET_CODE;

    // bcrypt.compare(secretCode, superadminSecretCode).then(
    //   (isSecretCodeValid = () => {
    //     if (!isSecretCodeValid) throw new Error("Invalid secret code");
    //   })
    // );

    // console.log(isSecretCodeValid);
    // if (!isSecretCodeValid) {
    //   throw new Error("Invalid secret code");
    // }

    // without the use of bcrypt

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
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerSuperAdmin,
};
