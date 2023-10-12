const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

const User = sequelize.define(
  "superadmin_tables",
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
    publicKeywallet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING, // You can also use ENUM type for specific roles
      allowNull: false,
      defaultValue: "employee", // Default role can be 'employee'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
