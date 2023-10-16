const Emp = require("../model/employee");
const Admin = require("../model/admin");
const Company = require("../model/company");



const logger = require("../config/logger.config");

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
    
    logger.info("belongsTocomp:", belongsTocomp);

    return belongsTocomp;
  } catch (error) {
    throw error;
  }
};

const updateEmp = async (userId, name, phone) => {
  try {
    const emp = await Emp.findOne({
      where: { id: userId },
    });

    if (emp) {
      // Update user details
      emp.name = name;
      emp.phone = phone;
      await emp.save(); // Save the changes to the database
      return emp; // Return the updated user object
    } else {
      throw new Error("User not found"); // Throw an error if user with given ID is not found
    }
  } catch (err) {
    throw err; // Throw any error that occurs during the process
  }
};

module.exports = {
  createEmp,
  isAdmin,
  doesCompanyBelongToUser,
  updateEmp,
};
