const Emp = require("../model/employee");
const Admin = require("../model/admin");
const Company = require("../model/company");
const AppError = require("../middleware/appError");
const { where } = require("sequelize");

const createEmp = async (
  name,
  email,
  phone,
  walletAddress,
  companyId,
  createdBy
) => {
  const emp = await Emp.create({
    name,
    email,
    phone,
    walletAddress,
    companyId,
    createdBy,
  });

  return emp;
};

const isExist = async (email) => {
  const user = await Emp.findOne({ where: { email: email } });
  if (user) {
    throw new AppError("890", "Employee already exists", 400);
  }
};

const isAdmin = async (loggeduser) => {
  const user = loggeduser;
  // console.log(user);

  const isAdmin = user.role === "admin";

  if (!isAdmin) {
    throw new AppError("199", "Unauthorized - not Admin", 400);
  }

  return isAdmin;
};

const doesCompanyBelongToUser = async (companyId, loggeduser) => {
  const company = await Company.findByPk(companyId);

  if (!company) {
    throw new AppError("120", "company not found", 400);
  }

  const belongsTocomp = companyId === loggeduser.companyId;

  if (!belongsTocomp) {
    throw new AppError("129", "Unauthorized to add emp. for this company", 400);
  }

  return belongsTocomp;
};

const updateEmp = async (name, phone, email, role) => {
  const emp = await Emp.findOne({ where: { email: email } });

  const isEmp = role === "employee";

  if (!isEmp) {
    throw new AppError("661", "employee not found to update details", 400);
  }
  // Update user details
  emp.name = name;
  emp.phone = phone;
  await emp.save();
  return emp;
};

module.exports = {
  createEmp,
  isAdmin,
  doesCompanyBelongToUser,
  updateEmp,
  isExist,
};
