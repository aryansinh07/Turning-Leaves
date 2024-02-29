
const jwt = require("jsonwebtoken");

const generateToken = id => {
  return jwt.sign({ id }, "onlineBookThriftStore", { expiresIn: "10d" });
};

module.exports = generateToken;