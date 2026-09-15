const jwt = require("jsonwebtoken");

function signAccessToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.sign(
    { sub: user._id.toString(), username: user.username },
    secret,
    { expiresIn: "1h" }
  );
}

module.exports = { signAccessToken };
