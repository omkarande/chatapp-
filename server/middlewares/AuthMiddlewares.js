import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.jwt;
  if (!token) {
    return response.status(401).json({ message: "You are not authenticated" });
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return response.status(403).send("Token is invalid");
    request.userId = payload.userId;
    next();
  });
};

export const requireAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  });
};
