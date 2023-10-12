const Company = require("../model/company");

const createCompany = async (name, description, createdBy) => {
  try {
    const newCompany = await Company.create({
      name,
      description,
      createdBy,
    });
    return newCompany;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCompany,
};
