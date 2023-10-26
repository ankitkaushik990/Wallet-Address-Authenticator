"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Login_history extends Model {
    static associate(models) {
       Login_history.belongsTo(models.SuperAdmin, { foreignKey: "userId" });
       Login_history.belongsTo(models.Admin, { foreignKey: "userId" });
       Login_history.belongsTo(models.Employee, { foreignKey: "userId" });
    }
  }

  Login_history.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      loginTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      logoutTime: {
        type: DataTypes.DATE,
        allowNull: true, // Allow null for cases where logout time is not available
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Login_history",
    }
  );
  return Login_history;
};
