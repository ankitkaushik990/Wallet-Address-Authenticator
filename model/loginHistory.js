const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

const LoginHistory = sequelize.define("login_history", {
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
});

module.exports = LoginHistory;
