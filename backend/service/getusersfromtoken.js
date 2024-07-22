const jwt = require("jsonwebtoken");
const { jwtSecret } = process.env;
const User = require("../model/user");

exports.getUserFromToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, async (err, decodedToken) => {
      if (err) {
        return reject({ status: 401, message: "Not authorized" });
      } else {
        try {
          const user = await User.findById(decodedToken.id);
          if (!user) {
            return reject({ status: 404, message: "User not found" });
          } else {
            resolve(user);
          }
        } catch (error) {
          reject({ status: 500, message: error.message });
        }
      }
    });
  });
};
