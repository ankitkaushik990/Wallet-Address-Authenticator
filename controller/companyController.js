const companyService = require("../service/companyService");

const createCompany = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user.id; // Assuming user ID is stored in req.user after authentication
    console.log(req.user.role)
    // Check if the user is superAdmin (you should have a middleware to ensure this)
    if (req.user.role !== "superAdmin") {
      throw new Error("Only superAdmins can create companies.");
    }

    // Call the service to create the company
    const newCompany = await companyService.createCompany(
      name,
      description,
      createdBy
    );

    // Return success response with the created company object
    res.status(201).json(newCompany);
  } catch (err) {
    console.error(err);
    res.status(401).send(err.message); // Use 401 Unauthorized status code for unauthorized access
  }
};

module.exports = {
  createCompany,
};
