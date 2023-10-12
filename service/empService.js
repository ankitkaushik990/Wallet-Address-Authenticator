const Emp = require("../model/employee");
const Admin = require("../model/admin");
const Company = require("../model/company");

const createEmp = async (
  name,
  email,
  phone,
  walletAddress,
  companyId,
  createdBy
) => {
  try {
    const emp = await Emp.create({
      name,
      email,
      phone,
      walletAddress,
      companyId,
      createdBy,
    });

    return emp;
  } catch (error) {
    throw error;
  }
};

const isAdmin = async (userId) => {
  try {
    const user = await Admin.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user has the super admin role
    const isAdmin = user.role === "admin";
    return isAdmin;
  } catch (error) {
    throw error;
  }
};

const doesCompanyBelongToUser = async (companyId, loggeduser) => {
  try {
    const company = await Company.findByPk(companyId);

    if (!company) {
      throw new Error("Company not found");
    }

    // Check if the admin company id === company id 
    const belongsTocomp= companyId === loggeduser.companyId;
    
    console.log("belongsTocomp:", belongsTocomp);

    return belongsTocomp;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createEmp,
  isAdmin,
  doesCompanyBelongToUser,
};
