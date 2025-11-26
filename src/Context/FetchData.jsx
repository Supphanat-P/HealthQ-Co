import { supabase } from "../config/supabaseClient";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

export const fetchDoctors = async () => {
  const { data, error } = await supabase
    .from("doctors")
    .select("*, hospital:hospitals(*)");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchHospitals = async () => {
  const { data, error } = await supabase.from("hospitals").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchSpecialties = async () => {
  const { data, error } = await supabase.from("specialties").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchAppointments = async () => {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, appointment_slots(slot_datetime)");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchUsersInfo = async () => {
  const { data, error } = await supabase
    .from("users_info")
    .select("*, users(*)");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchSymptomsList = async () => {
  const { data, error } = await supabase.from("symptoms").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const createAppointment = async (
  user_id,
  doctor_id,
  appointment_slots_data,
  note
) => {
  const { data: appointmentData, error: appointmentError } = await supabase
    .from("appointments")
    .insert([
      {
        user_id: user_id,
        doctor_id: doctor_id,
        note: note,
      },
    ])
    .select();

  if (appointmentError) {
    throw new Error(
      "Failed to create main appointment: " + appointmentError.message
    );
  }

  const app_id = appointmentData[0].app_id;
  const slotsToInsert = [];

  appointment_slots_data.forEach((slotGroup) => {
    const timesArray = Array.isArray(slotGroup.times)
      ? slotGroup.times
      : [slotGroup.times];
    timesArray.forEach((time) => {
      const slotDateTime = `${slotGroup.date}T${time}:00Z`;
      slotsToInsert.push({
        app_id: app_id,
        slot_datetime: slotDateTime,
      });
    });
  });

  if (slotsToInsert.length === 0) {
    throw new Error("No appointment slots provided.");
  }

  const { data: slotData, error: slotError } = await supabase
    .from("appointment_slots")
    .insert(slotsToInsert)
    .select();

  if (slotError) {
    await supabase.from("appointments").delete().eq("app_id", app_id);
    throw new Error("Failed to create appointment slots: " + slotError.message);
  }

  return { appointment: appointmentData[0], slots: slotData };
};

export const sendOtpForRegistration = async (identifier, otp) => {
  if (!identifier) {
    toast.error("กรุณากรอกอีเมล");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: identifier,
        subject: "Otp code for registration",
        text: "รหัส OTP ของคุณคือ " + otp,
      }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Email Sent!");
    } else {
      toast.error("Failed: " + data.error);
    }
  } catch (err) {
    toast.error("Error: " + err.message);
  }
};

export const sendEmailForApprove = async (
  identifier,
  date,
  time,
  doctor,
  hospital,
) => {
  if (!identifier) {
    toast.error("กรุณากรอกอีเมล");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/send-confirm-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: identifier,
        subject: "การจองเเพทย์ของคุณยืนยันเเล้ว",
        text: `การจองเเพทย์ของคุณยืนยันเเล้ว ไปพบ เเพทย์ ${doctor} วันที่ ${date} เวลา ${time} ที่ ${hospital}`,
      }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Email Sent!");
    } else {
      toast.error("Failed: " + data.error);
    }
  } catch (err) {
    toast.error("Error: " + err.message);
  }
};

export const createUserAccount = async (identifier, password, fName, lName) => {
  if (!identifier || !password || !fName || !lName) {
    throw new Error("Email, password, and name are required");
  }

  const { data: existing, error: checkError } = await supabase
    .from("users")
    .select("*")
    .eq("email", identifier)
    .single();

  if (existing) {
    throw new Error("Email already registered");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const fullName = `${fName} ${lName}`;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([
      {
        email: identifier,
        password: hashedPassword,
        full_name: fullName,
        role: "patient",
      },
    ])
    .select()
    .single();

  if (userError) {
    throw new Error(userError.message);
  }

  const userId = userData.user_id;

  const { data: infoData, error: infoError } = await supabase
    .from("users_info")
    .insert([
      {
        user_id: userId,
        full_name: fullName,
        first_name: fName,
        last_name: lName,
        email: identifier,
      },
    ])
    .select()
    .single();

  if (infoError) {
    throw new Error(infoError.message);
  }

  return { user: userData, info: infoData };
};

export const login = async (email, password) => {
  try {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userError || !userData) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    return userData;
  } catch (err) {
    throw err;
  }
};

export const updateUserInfo = async (user_id, data) => {
  const { data: userData, error: userError } = await supabase
    .from("users")
    .update(data)
    .eq("user_id", user_id)
    .select()
    .single();

  if (userError) {
    throw new Error(userError.message);
  }
  return userData;
};
