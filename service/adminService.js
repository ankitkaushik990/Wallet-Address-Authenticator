const  Admin = require("../model/admin");
const superAdmin = require("../model/superAdmin");
const Company= require("../model/company")



const logger = require("../config/logger.config");

const createAdmin = async (
  name,
  email,
  phone,
  walletAddress,
  companyId,
  createdBy
) => {
  try {
    const admin = await Admin.create({
      name,
      email,
      phone,
      walletAddress,
      companyId,
      createdBy,
    });

    return admin;
  } catch (error) {
    throw error;
  }
};

const isSuperAdmin = async (userId) => {
  try {
    const user = await superAdmin.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user has the super admin role
    const isSuperAdmin = user.role === "superAdmin";
    return isSuperAdmin;
  } catch (error) {
    throw error;
  }
};

const doesCompanyBelongToUser = async (companyId, userId) => {
  try {
    const company = await Company.findByPk(companyId);

    if (!company) {
      throw new Error("Company not found");
    }

    // Check if the company was created by the user with the given userId
    const belongsToUser = company.createdBy == userId;
    logger.info("belongsToUser:", belongsToUser);

    return belongsToUser;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createAdmin,
    isSuperAdmin,
  doesCompanyBelongToUser
};

