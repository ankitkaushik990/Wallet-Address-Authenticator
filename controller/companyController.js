const companyService = require("../service/companyService");
const { tryCatch } = require("../utils/tryCatch");

const createCompany = tryCatch(async (req, res) => {
  const { name, description } = req.body;
  const user = req.user;

  // Call the service to create the company
  const newCompany = await companyService.createCompany(
    name,
    description,
    user
  );

  // Return success response with the created company object
  return res.status(201).send(newCompany);
});

module.exports = {
  createCompany,
};
