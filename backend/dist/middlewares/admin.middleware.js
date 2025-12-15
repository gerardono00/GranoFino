"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminMiddleware;
function adminMiddleware(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
}
