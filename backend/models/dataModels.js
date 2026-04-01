import mysql from "mysql2/promise";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
};

const query = async (sql, params) => {
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.execute(sql, params);
  connection.end();
  return rows;
};

export const getAllDoctors = async () => {
  const sql = `SELECT * FROM doctors 
    JOIN specialties ON doctors.specialty_id = specialties.specialty_id 
    JOIN hospitals ON doctors.hospital_id = hospitals.hospital_id`;
  const result = await query(sql);
  return result;
};

export const getDoctorById = async (id) => {
  const sql = `SELECT * FROM doctors 
    JOIN specialties ON doctors.specialty_id = specialties.specialty_id 
    JOIN hospitals ON doctors.hospital_id = hospitals.hospital_id
    WHERE doctor_id = ?`;
  const params = [id];
  const result = await query(sql, params);
  return result[0];
};

export const deleteDoctorById = async (id) => {
  const sql = `DELETE FROM doctors WHERE doctor_id = ?`;
  const params = [id];
  const result = await query(sql, params);
  return result;
};

export const insertDoctor = async ({
  doctor_name,
  specialty_id,
  hospital_id,
}) => {
  const sql = `INSERT INTO doctors (doctor_name, specialty_id, hospital_id) VALUES (?, ?, ?)`;
  const params = [doctor_name, specialty_id, hospital_id];
  const result = await query(sql, params);
  return result;
};
