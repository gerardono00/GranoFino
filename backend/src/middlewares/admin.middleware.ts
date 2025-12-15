import { Response, NextFunction } from "express";

export default function adminMiddleware(
  req: Express.Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado" });
  }

  next();
}
