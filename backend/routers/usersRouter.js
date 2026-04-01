import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
import {
  createUser,
  getRoleNamebyUserId,
  getUserByEmail,
} from "../controllers/usersControllers.js";

const usersRouter = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: สร้างบัญชีผู้ใช้ใหม่
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
usersRouter.post("/register", async (req, res) => {
  const { email, password, role_id, full_name } = req.body;
  try {
    await createUser({ email, password, role_id, full_name });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: error.code,
    });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: เข้าสู่ระบบ
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Success พร้อมกับ JWT Token
 *       403:
 *         description: Unauthorized (รหัสผ่านผิด)
 *       404:
 *         description: Not found (ไม่พบผู้ใช้)
 */
usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) return res.status(404).json({ message: "Not found" });

  const result = await bcrypt.compare(password, user.password);

  if (!result) return res.status(403).json({ message: "Unauthorized" });

  const token = jwt.sign({ id: user.user_id }, JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({ message: "Success", token });
});

// middleware
const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    req.jwtexpired = true;
    req.user_id = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      req.jwtexpired = true;
      req.user_id = null;
    } else {
      req.jwtexpired = false;
      req.user_id = payload.id;
    }
    next();
  });
};

/**
 * @swagger
 * /users/verify:
 *   get:
 *     summary: ตรวจสอบ Token และดึงข้อมูล Role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized (Token หมดอายุหรือไม่ถูกต้อง)
 */
usersRouter.get("/verify", jwtMiddleware, async (req, res) => {
  if (req.jwtexpired) return res.status(403).json({ message: "Unauthorized" });

  const result = await getRoleNamebyUserId(req.user_id);

  res.status(200).json({
    message: "Success",
    role: result[0].role,
  });
});

export default usersRouter;
