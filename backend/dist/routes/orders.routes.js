"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.auth, async (req, res) => {
    const { items, total, payment_method } = req.body;
    await db_1.db.query("INSERT INTO orders (user_id, total, payment_method, payment_status) VALUES (?, ?, ?, ?)", [req.user.id, total, payment_method, "pagado"]);
    res.json({ message: "Orden creada" });
});
exports.default = router;
