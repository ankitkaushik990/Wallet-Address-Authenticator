const localStrategy = require("passport-local").Strategy;
const ethers = require("ethers");
const db = require("../models");
const Admin = db.Admin;
const SuperAdmin = db.SuperAdmin;
const Employee = db.Employee;


exports.initializingPassport = (passport) => {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "privatekey",
      },
      async (email, privatekey, done) => {
        try {
          let user =
            (await SuperAdmin.findOne({ where: { email } })) ||
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
          console.log(error.message)
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    // Serialize user based on their email
    done(null, user.email);
  });
  passport.deserializeUser(async (email, done) => {
    try {
      const admin = await Admin.findOne({ where: { email } });
      const superAdminUser = await SuperAdmin.findOne({ where: { email } });
      const employee = await Employee.findOne({ where: { email } });

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
       console.log(error.message);
      done(error);
    }
  });
}

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("Please login first");
};
