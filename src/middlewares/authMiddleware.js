// import jwt from "jsonwebtoken";
// import Admin from "../models/AdminModel.js";

// export const protect = async (req, res, next) => {
//   try {
//     let token;

//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ message: "Token missing" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const admin = await Admin.findById(decoded.id).select("-password");

//     if (!admin) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     req.admin = admin;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token verification failed" });
//   }
// };

// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.admin.role)) {
//       return res.status(403).json({ message: "Forbidden: Role not allowed" });
//     }
//     next();
//   };
// };

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decoded.userId;
      req.userRole = decoded.role;

      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  return res.status(401).json({ message: "No token provided" });
};

export default authMiddleware;

