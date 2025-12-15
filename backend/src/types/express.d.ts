// En tu archivo de tipos del backend (ej. ../backend/src/types/express.d.ts)

import { Request } from "express";

// Define la estructura básica del usuario que pasa el middleware
interface IUserPayload {
    id: number;
    email: string;
    role: 'user' | 'admin';
}

declare global {
  namespace Express {
    // Extiende la interfaz Request para incluir la propiedad 'user'
    interface Request {
      user?: IUserPayload; // Ahora req.user existe y tiene los tipos correctos
    }
  }
}

// Esto también corrige el error TS1484 para 'AuthRequest' en orders.routes.ts 
// si AuthRequest era una simple copia de Request con el campo user.