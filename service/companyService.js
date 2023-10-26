const db = require("../models");
const Company = db.Company;
const User = db.SuperAdmin;

const AppError = require("../middleware/appError");

const createCompany = async (name, description, logo, loggedUser) => {
  const email = loggedUser.email;
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    throw new AppError(
      "890",
      "Unauthorized - only Super-Admins are allowed to create company",
      400
    );
  }
  if (loggedUser.role !== "superAdmin") {
    throw new AppError(
      "890",
      "Unauthorized - only superAdmins are allowed to create company",
      400
    );
  }
  const createdBy = loggedUser.id;

  const newCompany = await Company.create({
    name,
    description,
    createdBy,
    logo,
  });

  return newCompany;
};


module.exports = {
  createCompany,
};
