const  Admin = require("../model/admin");
const superAdmin = require("../model/superAdmin");
const Company= require("../model/company")
const AppError = require("../middleware/appError");

const logger = require("../config/logger.config");

const createAdmin = async (
  name,
  email,
  phone,
  walletAddress,
  companyId,
  createdBy
) => {
  const admin = await Admin.create({
    name,
    email,
    phone,
    walletAddress,
    companyId,
    createdBy,
  });

  return admin;
};

const isSuperAdmin = async (userId) => {
  const user = await superAdmin.findByPk(userId);

  if (!user) {
    throw new AppError("1294", "superAdmin not found", 400);
  }

  // Check if the user has the super admin role
  const isSuperAdmin = user.role === "superAdmin";

  if (!isSuperAdmin) {
    throw new AppError(
      "1294",
      "Unauthorized- only superadmin can create Admin",
      400
    );
  }

  return isSuperAdmin;
};

const doesCompanyBelongToUser = async (companyId, userId) => {
  const company = await Company.findByPk(companyId);

  if (!company) {
    throw new AppError("1294", "Company not found", 400);
  }

  // Check if the company was created by the user with the given userId
  const belongsToUser = company.createdBy == userId;

  if (!belongsToUser) {
    throw new AppError(
      "1294",
      "not authorized to create admin for this company",
      400
    );
  }

  return belongsToUser;
};


module.exports = {
  createAdmin,
    isSuperAdmin,
  doesCompanyBelongToUser
};

