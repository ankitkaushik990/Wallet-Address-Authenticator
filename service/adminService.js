const  Admin = require("../model/admin");
const superAdmin = require("../model/superAdmin");
const Company= require("../model/company")
const AppError = require("../middleware/appError");
const Emp = require("../model/employee");

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

const isAdmin = async (loggeduser) => {
  const email = loggeduser.email;
  const user = await superAdmin.findOne({ where: { email: email } });

  if (!user) {
    throw new AppError("1294", "Admin not found", 400);
  }

  // Check if the user has the super admin role
  const isAdmin = user.role === "admin";

  if (!isAdmin) {
    throw new AppError(
      "1294",
      "Unauthorized- only admin can view list of employees",
      400
    );
  }

  return isAdmin;
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

const allEmp = async (loggeduser) => {
  const id = loggeduser.id;
  const all = await Emp.findAll({ where: { createdBy: id } });

  if (all.length === 0) {
    throw new AppError("456", "No emplpyee found", 403);
  }

  return all;
};

module.exports = {
  createAdmin,
  isSuperAdmin,
  doesCompanyBelongToUser,
  isAdmin,
  allEmp,
};

