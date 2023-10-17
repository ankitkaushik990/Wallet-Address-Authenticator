const companyService = require("../service/companyService");
const { tryCatch } = require("../utils/tryCatch");
const AppError = require("../middleware/appError");

const createCompany = tryCatch(async (req, res) => {
  const { name, description } = req.body;
  const user = req.user;

  // Check if the user is superAdmin
  if (user.role !== "superAdmin") {
    throw new AppError(
      "890",
      "Unauthorized - only superAdmins are allowed to create company",
      400
    );
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
