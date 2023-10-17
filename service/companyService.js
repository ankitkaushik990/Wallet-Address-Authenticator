const Company = require("../model/company");
const User = require("../model/superAdmin"); // Assuming you have a User model
const AppError = require("../middleware/appError");

const createCompany = async (name, description, createdBy) => {
  // Find the user by ID from the database
  const user = await User.findByPk(createdBy);

  // Check if the user exists and their role is superAdmin
  if (!user || user.role !== "superAdmin") {
    throw new AppError(
      "890",
      "Unauthorized - only superAdmins are allowed to create company",
      400
    );
  }

  // Create the company if the user is a superAdmin
  const newCompany = await Company.create({
    name,
    description,
    createdBy,
  });

  return newCompany;
};


module.exports = {
  createCompany,
};
