
const Admin = require("../model/admin");
const Employee = require("../model/employee");
const SuperAdmin = require("../model/superAdmin")

async function checkEmailExistence(email) {
  const isSuperAdmin = await SuperAdmin.findOne({
    where: {
      email: email,
    },
  });

  const isExistingAdmin = await Admin.findOne({
    where: {
      email: email,
    },
  });

  const isExistingEmployee = await Employee.findOne({
    where: {
      email: email,
    },
  });

  return isSuperAdmin || isExistingAdmin || isExistingEmployee;
}

module.exports = checkEmailExistence;
