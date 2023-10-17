const companyService = require("../service/companyService");
const logger = require("../config/logger.config");
const { tryCatch } = require("../utils/tryCatch");

const createCompany = tryCatch(async (req, res, ) => {
  const { name, description } = req.body;
  const user = req.user;

  // Check if the user is superAdmin
  if (user.role !== "superAdmin") {
    throw new Error("Only superAdmins can create companies.");
  }

  // Call the service to create the company
  const newCompany = await companyService.createCompany(
    name,
    description,
    user.id
  );

  // Return success response with the created company object
  return res.status(201).send(newCompany);
});

module.exports = {
  createCompany,
};
