import express from "express";
const appointmentRouter = express.Router();

// CREATE
appointmentRouter.post("/create", async (req, res) => {
  console.log(" CREATE HIT ");
  try {
    const { doctorId, patientId, date, time } = req.body;

    if (!doctorId || !patientId || !date || !time) {
      return res.status(400).json({ message: "Missing data" });
    }

    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date,
      time,
      status: "active"
    });

    const result = await newAppointment.save();

    res.json({
      message: "Success",
      appointment: result
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CANCEL
appointmentRouter.put("/cancelAppointment", async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "Missing appointmentId" });
    }

    await Appointment.findByIdAndUpdate(appointmentId, {
      status: "cancelled"
    });

    res.json({ message: "Success" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

appointmentRouter.post("/phone", async (req, res) => {
  console.log("📱 phone HIT");
  res.send("phone OK");
});

export default appointmentRouter;