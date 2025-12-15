"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkout_server_sdk_1 = __importDefault(require("@paypal/checkout-server-sdk"));
const paypal_1 = require("../config/paypal");
const auth_1 = require("../middlewares/auth");
const db_1 = __importDefault(require("../db")); // Asegúrate de que estás importando el pool de PG
const router = (0, express_1.Router)();
router.post("/oxxo", auth_1.auth, async (req, res) => {
    const { total } = req.body;
    try {
        // 1. Lógica de Creación de Orden en PayPal (No requiere cambios)
        const request = new checkout_server_sdk_1.default.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "MXN",
                        value: total.toFixed(2),
                    },
                },
            ],
            payment_source: {
                oxxo: {
                    name: "El Grano Fino",
                },
            },
        });
        const order = await paypal_1.paypalClient.execute(request);
        // 2. Lógica de Inserción en PostgreSQL
        // CORRECCIÓN: Usamos placeholders $1, $2, $3, $4.
        await db_1.default.query("INSERT INTO orders (user_id, total, payment_method, payment_status) VALUES ($1, $2, $3, $4)", [req.user.id, total, "oxxo", "pendiente"]);
        res.json(order.result);
    }
    catch (error) {
        console.error("Error al procesar pago Oxxo/PayPal:", error);
        // Es buena práctica manejar errores tanto de PayPal como de DB
        res.status(500).json({ message: "Error al procesar el pago y registrar la orden." });
    }
});
exports.default = router;
