const companyService = require("../service/companyService");
const logger = require("../config/logger.config");

const createCompany = async (req, res) => {
  try {
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
    res.status(201).send(newCompany);
  } catch (err) {
    logger.error(err);
    res.status(401).send(err.message); // Use 401 Unauthorized status code for unauthorized access
  }
};

module.exports = {
  createCompany,
};
