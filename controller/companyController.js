const companyService = require("../service/companyService");
const { tryCatch } = require("../utils/tryCatch");

const { CompanyValidator} = require("../middleware/validator")

const createCompany = tryCatch(async (req, res) => {
  const { name, description } = req.body;
  const user = req.user;
  if (!req.file) {
    return res.status(400).send({ error: "Please choose a file to upload" });
  }
  const logo = req.file.filename;
 
  const { error } = CompanyValidator({ name, description });

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const newCompany = await companyService.createCompany(
    name,
    description,
    logo,
    user,
  );
  return res.status(201).send(newCompany);
});




module.exports = {
  createCompany,
};
