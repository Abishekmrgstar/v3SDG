const mongoose = require("mongoose");

// Define the Advisor schema
const advisorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  department: { type: String, required: true }
});

// Create the Advisor model
const Advisor = mongoose.model("Advisor", advisorSchema);

// Define the Volunteer ID schema
const volunteerIdSchema = new mongoose.Schema({
  volunteer_id: { type: String }
});

// Define the Student Head ID schema
const studentHeadIdSchema = new mongoose.Schema({
  student_head_id: { type: String }
});

// Define the Event ID schema
const EventIdSchema = new mongoose.Schema({
  event_id: { type: String }
});

// Define the OD Request ID schema
const ODrequestIdSchema = new mongoose.Schema({
  od_request_id: { type: String }
});

// Define the Budget ID schema
const BudgetIdSchema = new mongoose.Schema({
  budget_id: { type: String }
});

// Define the Faculty schema
const facultySchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String,
  student_heads: [studentHeadIdSchema],
  events: [EventIdSchema],
  ODrequests: [ODrequestIdSchema],
  Budgets: [BudgetIdSchema],
  volunteers: [volunteerIdSchema] // Added reference to volunteers
});

const Faculty = mongoose.model("Faculty", facultySchema);

// Define the Student Head schema
const studentHeadSchema = new mongoose.Schema({
  headEmail: String,
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String,
  volunteers: [volunteerIdSchema], // Added reference to volunteers
  events: [EventIdSchema],
  ODrequests: [ODrequestIdSchema]
});

const StudentHead = mongoose.model("StudentHead", studentHeadSchema);

// Define the Volunteer schema
const volunteerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

// Define the Participant schema
const participantSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String
});

const Participant = mongoose.model("Participant", participantSchema);

// Define the Event schema
const EventSchema = new mongoose.Schema({
  name: String,
  venue: String,
  date: Date,
  student_head: String,
  time: String,
  forms: String // Single string field for forms URL or information
});

// Define the OD Request schema
const ODrequestSchema = new mongoose.Schema({
  student_name: String,
  student_regNo: String,
  student_dept: String,
  date: Date,
  start_time: String,
  end_time: String,
  requested_to: String,
  requested_by: String,
  status: String
});

// Define the Volunteer Request schema
const volunteerRequestSchema = new mongoose.Schema({
  student_head_id: String,
  faculty_id: String,
  volunteer_id: String,
  event_name: String,
  status: String
});

const VolunteerRequest = mongoose.model("VolunteerRequest", volunteerRequestSchema);

// Define the Budget Request schema
const budgetRequestSchema = new mongoose.Schema({
  event_name: String,
  total_budget: String,
  description: String,
  requested_to: String,
  requested_by: String
});

const BudgetRequest = mongoose.model("BudgetRequest", budgetRequestSchema);

const ODrequest = mongoose.model("Odrequest", ODrequestSchema);

const Event = mongoose.model("Event", EventSchema);

// Export all models, including Advisor and VolunteerRequest
module.exports = {
  Faculty,
  StudentHead,
  Volunteer,
  Participant,
  Event,
  ODrequest,
  BudgetRequest,
  Advisor,
  VolunteerRequest
};
  