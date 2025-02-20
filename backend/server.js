const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  userCreateService,
  userLoginService,
  createEventService,
  getEventService,
  getAllEvents,
  CreateODrequest,
  getOdRequestService,
  CreateBudgetRequest,
  getBudgetRequestService,
  createStudentHeadService,
  volunteerJoinService,
  getVolunteerRequestService
} = require("./UserController/UserService");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/signupDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB Connection Error:", err));

app.post("/signup", async (req, res) => {
  const result = await userCreateService(req.body);
  res.status(result.success ? 201 : 400).json({ message: result.message });
});

app.post("/login", async (req, res) => {
  const result = await userLoginService(req.body);
  res.status(result.success ? 200 : 400).json({ message: result.message, token: result.token, user: result.user });
});

app.post("/createEvent", async (req, res) => {
  const result = await createEventService(req.body);
  res.status(result.success ? 200 : 400).json({ message: result.message });
});

app.post("/getEvents", async (req, res) => {
  const result = await getEventService(req.body);
  res.status(result.success ? 200 : 400).json({ message: result.message, events: result.events });
});

app.post("/getAllEvents", async (req, res) => {
  const result = await getAllEvents();
  res.status(result.success ? 200 : 400).json({ message: result.message, events: result.events });
});

app.post("/createODrequest", async (req, res) => {
  const result = await CreateODrequest(req.body);
  res.status(result.success ? 200 : 400).json({ message: result.message });
});

app.post("/createBudgetrequest", async (req, res) => {
  const result = await CreateBudgetRequest(req.body);
  res.status(result.success ? 200 : 400).json({ success: result.success, message: result.message });
});

app.post("/getODrequest", async (req, res) => {
  const result = await getOdRequestService(req.body);
  res.status(result.success ? 200 : 400).json({ success: result.success, message: result.message, Odrequests: result.Odrequests });
});

app.post("/getBudgetRequest", async (req, res) => {
  const result = await getBudgetRequestService(req.body);
  res.status(result.success ? 200 : 400).json({ success: result.success, message: result.message, budgetRequests: result.budgetRequests });
});

app.post("/createStudentHead", async (req, res) => {
  const result = await createStudentHeadService(req.body);
  res.status(result.success ? 200 : 400).json({ message: result.message });
});

app.post("/createVolunteerRequest", async (req, res) => {
  const result = await volunteerJoinService(req.body);
  res.status(result.success ? 200 : 400).json({ message: result.message });
});

app.post("/getVolunteerRequest", async (req, res) => {
  const result = await getVolunteerRequestService(req.body);
  res.status(result.success ? 200 : 400).json({ message: result.message, volunteerRequests: result.volunteerRequests,volunteers:result.volunteers });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
