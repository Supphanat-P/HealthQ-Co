import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA
}

const query = async (sql, params) => {
    const connection = await mysql.createConnection(config)
    const [rows] = await connection.execute(sql, params)
    connection.end()
    return rows
}

export const createUser = async ({ email, password, role_id }) => {
    const hashPassword = await bcrypt.hash(password, 10)
    const sql = 'INSERT INTO users (email,password,role_id) VALUES (?, ?, ?)'
    const params = [email, hashPassword, role_id]
    const result = await query(sql, params)
    return result
}

export const getUserByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    const params = [email]
    const result = await query(sql, params)
    return result[0]
}

export const getRoleNamebyUserId = async (id) => {
    const sql = 'SELECT users.user_id AS id, users.email, roles.name AS role FROM users RIGHT JOIN roles ON users.role_id = roles.id WHERE users.user_id = ?'
    const params = [id]
    const result = await query(sql, params)
    return result
}

// // roles

//  SELECT role_id AS id, roles.name AS role
// FROM users RIGHT JOIN roles ON users.role_id = roles.id
// WHERE role_id = 1;

//users
// SELECT users.user_id AS id, roles.name AS role
// FROM users RIGHT JOIN roles ON users.role_id = roles.id
// WHERE users.user_id = 1;
