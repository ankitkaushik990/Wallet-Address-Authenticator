const localStrategy = require("passport-local").Strategy;
const ethers = require("ethers");
const Admin = require("../model/admin");
const superAdmin = require("../model/user");
const Employee = require("../model/employee");

exports.initializingPassport = (passport) => {
  passport.use(
    new localStrategy(
      {
        usernameField: "email", // Specify the email field
        passwordField: "privatekey", // Specify the private key field
      },
      async (email, privatekey, done) => {
        try {
          let user =
            (await superAdmin.findOne({ where: { email } })) ||
            (await Admin.findOne({ where: { email } })) ||
            (await Employee.findOne({ where: { email } }));

          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          // Validate private key against the stored wallet address
          const wallet = new ethers.Wallet(privatekey);
          if (
            wallet.address.toLowerCase() === user.walletAddress.toLowerCase()
          ) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid private key" });
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await Admin.findByPk(id);
      const superAdminUser = await superAdmin.findByPk(id);
      const employee = await Employee.findByPk(id);

      if (admin) {
        admin.role = "admin";
        return done(null, admin);
      } else if (superAdminUser) {
        superAdminUser.role = "superAdmin";
        return done(null, superAdminUser);
      } else if (employee) {
        employee.role = "employee";
        return done(null, employee);
      } else {
        return done(null, null);
      }
    } catch (error) {
      done(error);
    }
  });
};

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("Please login first");
};
