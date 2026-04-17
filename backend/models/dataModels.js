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
  const sql = `
    SELECT 
      doctors.*, 
      specialties.specialty_name, 
      hospitals.hospital_name, 
      hospitals.imgPath, 
      hospitals.lat, 
      hospitals.lang 
    FROM doctors 
    LEFT JOIN specialties ON doctors.specialty_id = specialties.specialty_id 
    LEFT JOIN hospitals ON doctors.hospital_id = hospitals.hospital_id
    ORDER BY doctors.doctor_id ASC
  `;
  const result = await query(sql);
  return result;
};

export const getDoctorById = async (id) => {
  const sql = `
    SELECT 
      doctors.*, 
      specialties.specialty_name, 
      hospitals.hospital_name, 
      hospitals.imgPath, 
      hospitals.lat, 
      hospitals.lang 
    FROM doctors 
    LEFT JOIN specialties ON doctors.specialty_id = specialties.specialty_id 
    LEFT JOIN hospitals ON doctors.hospital_id = hospitals.hospital_id
    WHERE doctors.doctor_id = ?
  `;
  const params = [id];
  const result = await query(sql, params);
  return result[0];
};

export const updateDoctorById = async (id, data) => {
  let fields = [];
  let params = [];

  if (data.doctor_name !== undefined) {
    fields.push("doctor_name = ?");
    params.push(data.doctor_name);
  }
  if (data.specialty_id !== undefined) {
    fields.push("specialty_id = ?");
    params.push(data.specialty_id);
  }
  if (data.hospital_id !== undefined) {
    fields.push("hospital_id = ?");
    params.push(data.hospital_id);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  const sql = `UPDATE doctors SET ${fields.join(", ")} WHERE doctor_id = ?`;
  params.push(id);

  const result = await query(sql, params);
  return result;
};

export const deleteDoctorById = async (id) => {
  const sql = `DELETE FROM doctors WHERE doctor_id = ?`;
  const params = [id];
  const result = await query(sql, params);
  return result;
};

export const getAllHospital = async () => {
  const sql = `SELECT * FROM hospitals`;
  const result = await query(sql);
  return result;
};

export const getHospitalById = async (id) => {
  const sql = `SELECT * FROM hospitals WHERE hospital_id = ?`;
  const params = [id];

  const result = await query(sql, params);
  return result[0];
};

export const updateHospitalById = async (
  id,
  { hospital_name, imgPath, lat, lang }
) => {
  const sql = `
    UPDATE hospitals 
    SET hospital_name = ?, imgPath = ?, lat = ?, lang = ? 
    WHERE hospital_id = ?
  `;

  const params = [hospital_name, imgPath, lat, lang, id];

  const result = await query(sql, params);
  return result;
};

export const deleteHospitalById = async (id) => {
  const sql = `DELETE FROM hospitals WHERE hospital_id = ?`;
  const params = [id];
  const result = await query(sql, params);
  return result;
};

export const insertHospital = async ({
 
 hospital_name,
 imgPath,
 lat,
  lang,
}) => {
  const sql = `INSERT INTO hospitals (hospital_name,imgPath, lat,lang) VALUES (?, ?, ?, ?)`;
  const params = [hospital_name, imgPath, lat,lang];
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

export const getAllSpecialties = async () => {
  const sql = `SELECT * FROM specialties`;
  const result = await query(sql);
  return result;
};

export const getSpecialtyById = async (id) => {
  const sql = `SELECT * FROM specialties WHERE specialty_id = ?`;
  const params = [id];
  const result = await query(sql, params);
  return result[0];
};

export const updateSpecialtyById = async (
  id,
  { specialty_name },
) => {
  const sql = `UPDATE specialties SET specialty_name = ? WHERE specialty_id = ?`;
  const params = [specialty_name, id];
  const result = await query(sql, params);
  return result;
};

export const deleteSpecialtiesById = async (id) => {
  const sql = `DELETE FROM specialties WHERE specialty_id = ?`;
  const params = [id];
  const result = await query(sql, params);
  return result;
};

export const insertSpecialties = async ({
  specialty_name,
}) => {
  const sql = `INSERT INTO specialties (specialty_name) VALUES (?)`;
  const params = [specialty_name];
  const result = await query(sql, params);
  return result;
};


