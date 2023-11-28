const jwt = require("jsonwebtoken");
const { jwtSecret } = process.env;

exports.adminAuth = (req, res, next) => {
  const token = req.headers.cookie.substring(5, req.headers.cookie.length);
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized", valami: err });
      } else {
        if (decodedToken.role !== "admin") {
          return res.status(401).json({ message: "Not admin" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

exports.userAuth = (req, res, next) => {
  const token = req.headers.cookie.substring(5, req.headers.cookie.length);
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "Basic") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};
