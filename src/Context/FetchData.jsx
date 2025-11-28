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

export async function sendOtpForRegistration(to, otp) {
  try {
    const res = await fetch("http://localhost:578/send-otp-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, text: otp })
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Server error" };
    }

    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
}


export const sendEmailForApprove = async ({
  to,
  subject,
  patientName,
  doctorName,
  hospitalName,
  date,
  time
}) => {
  try {
    const res = await fetch("http://localhost:578/send-approve-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to,
        subject,
        details: {
          title: subject,
          patientName,
          doctorName,
          hospitalName,
          date,
          time,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Server error" };
    }

    return { success: data.success };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const sendEmailForCancel = async ({ to, subject }) => {
  try {
    const res = await fetch("http://localhost:578/send-cancel-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to,
        details: {
          title: subject,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Server error" };
    }

    return { success: data.success };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const createUserAccount = async (identifier, password, fName, lName) => {

  try {
    if (!identifier || !password || !fName || !lName) {
      return { success: false, message: "Email, password, and name are required" };
    }

    const { data: existing, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("email", identifier)
      .maybeSingle();

    if (checkError) {
      return { success: false, message: checkError.message };
    }

    if (existing) {
      return { success: false, message: "Email already registered" };
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
      return { success: false, message: userError.message };
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
      return { success: false, message: infoError.message };
    }

    return {
      success: true,
      user: userData,
      info: infoData,
    };

  } catch (err) {
    return { success: false, message: err.message };
  }
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
