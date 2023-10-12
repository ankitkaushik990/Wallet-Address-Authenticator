const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");
const SuperAdmin = require("./user"); // Import the SuperAdmin model
const Company = require("./company")

const Admin = sequelize.define(
  "admin_tables",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isLowercase: true,
        customValidator(value) {
          if (value !== value.toLowerCase()) {
            throw new Error("email must be in lowercase");
          }
        },
      },
    },
    phone: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "admin", // Default role for admins
    },
  },
  {
    timestamps: true,
  }
);

// Define the association between Admin and SuperAdmin models
Admin.belongsTo(SuperAdmin, {
  foreignKey: "createdBy",
  as: "creator", // Alias for the SuperAdmin model
});

Admin.belongsTo(Company, {
  foreignKey: "companyId",
  as: "company", // Alias for the Company model
});


module.exports = Admin;
