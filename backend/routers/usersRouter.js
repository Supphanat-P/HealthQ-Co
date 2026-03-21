import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from '../config/db.js';

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
import { createUser, getRoleNamebyUserId, getUserByEmail } from "../controllers/usersControllers.js";

const usersRouter = Router()

//register 
usersRouter.post('/register', async (req, res) => {
    const { email, password, role_id } = req.body
    try {
        const result = await createUser({ email, password, role_id })
        return res.status(200).json({ message: 'Success' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})


//login 
usersRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await getUserByEmail(email)
    // console.log(user)
    if (user === undefined)
        return res.status(404).json({ message: 'Not found' })
    const result = await bcrypt.compare(password, user.password)
    // console.log(result)
    if (!result)
        return res.status(403).json({ message: 'Unauthorized' })

    const token = jwt.sign({ id: user.user_id }, JWT_SECRET, { expiresIn: '1h' })

    return res.status(200).json({ message: 'Success', token })
})


//middleware
const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    // console.log(token)

    //verify token
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            req.jwtexpired = true
            req.user_id = null
        } else {
            req.jwtexpired = false
            req.user_id = payload.id
        }
        // console.log(err)
        // console.log(payload)
    })
    next()
}


//verify
usersRouter.get('/verify', jwtMiddleware, async (req, res) => {
    if (req.jwtexpired)
        return res.status(403).json({ message: 'Unauthorized' })

    //get role name by user_id
    const result = await getRoleNamebyUserId(req.user_id)
    console.log(result)

    res.status(200).json({ message: 'Success', role: result[0].role })
})




export default usersRouter