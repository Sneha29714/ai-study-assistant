const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1. Get token from request header
    const authHeader = req.headers.authorization;

    console.log("Authorization header exists:", !!authHeader);
    console.log("Bearer format:", authHeader?.startsWith("Bearer ") ?? false);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Please login."
      });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    console.log("Token exists:", !!token);

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Store user ID for future routes
    req.userId = decoded.userId;

    // 5. Allow request to continue
    next();

  } catch (error) {
    console.error("JWT verification error:", error.name, error.message);
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = authMiddleware;