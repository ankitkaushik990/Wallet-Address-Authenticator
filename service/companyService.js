const Company = require("../model/company");
const User = require("../model/superAdmin"); // Assuming you have a User model

const createCompany = async (name, description, createdBy) => {
  try {
    // Find the user by ID from the database
    const user = await User.findByPk(createdBy);
    console.log(user);
    // Check if the user exists and their role is superAdmin
    if (!user || user.role !== "superAdmin") {
      throw new Error("Only superAdmins can create companies.");
    }

    // Create the company if the user is a superAdmin
    const newCompany = await Company.create({
      name,
      description,
      createdBy,
    });

    return newCompany;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCompany,
};
