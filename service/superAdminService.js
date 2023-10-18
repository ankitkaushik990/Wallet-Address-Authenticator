const User = require("../model/superAdmin");
const AppError = require("../middleware/appError");
const superAdmin = require("../model/superAdmin");
const company = require("../model/company");
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

const isSuperAdmin = async (loggeduser) => {
  const email = loggeduser.email;
  const user = await superAdmin.findOne({ where: { email: email } });

  if (!user) {
    throw new AppError("1294", "superAdmin not found", 400);
  }

  // Check if the user has the super admin role
  const isSuperAdmin = loggeduser.role === "superAdmin";

  if (!isSuperAdmin) {
    throw new AppError(
      "1294",
      "Unauthorized- only superadmin can view list of companies",
      400
    );
  }

  return isSuperAdmin;
};

const allcompany = async (loggeduser) => {
  const id = loggeduser.id;
  const all = await company.findAll({ where: { createdBy: id } });

  if (all.length === 0) {
    throw new AppError("456", "No company found", 403);
  }

  return all;
};
module.exports = {
  registerSuperAdmin,
  allcompany,
  isSuperAdmin,
};
