const jwt = require("jsonwebtoken");
const { Faculty, StudentHead, Volunteer, Participant, Event, ODrequest, BudgetRequest, VolunteerRequest } = require("./userModel");

const JWT_SECRET = process.env.JWT_SECRET || "1234";

module.exports.userCreateService = async (UserDetails) => {
  try {
    const { name, email, password, role, department, headEmail } = UserDetails;

    if (role !== "faculty" && !headEmail) {
      return { success: false, message: "Head email is required" };
    }

    if (!name || !email || !password || !role || !department) {
      return { success: false, message: "All fields are required" };
    }

    let Model;
    if (role === "faculty") Model = Faculty;
    else if (role === "student-head") Model = StudentHead;
    else if (role === "volunteer") Model = Volunteer;
    else if (role === "participant") Model = Participant;
    else if (role === "HOD(or)Advisor") Model = Advisor;
    else return { success: false, message: "Invalid role specified" };

    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return { success: false, message: "Email already in use" };
    }

    let newUser;
    if (role !== "faculty") {
      const faculty = await Faculty.findOne({ email: headEmail });
      if (!faculty) {
        return { success: false, message: "Head not found" };
      }

      if (role === "student-head") {
        faculty.student_heads.push({ student_head_id: email });
        await faculty.save();
      }
      newUser = new Model({ name, email, password, department, headEmail });
    } else {
      newUser = new Model({ name, email, password, department });
    }

    await newUser.save();
    return { success: true, message: `${role} registered successfully` };

  } catch (error) {
    console.error(error);
    return { success: false, message: "Server Error" };
  }
};
module.exports.getOdRequestService = async (userDetails) => {
  try {
    const { email, role } = userDetails;

    let Model;
    if (role === "faculty") Model = Faculty;
    else if (role === "student-head") Model = StudentHead;
    else if (role === "volunteer") Model = Volunteer;
    else if (role === "participant") Model = Participant;
    else return { success: false, message: "Invalid role specified" };

    
    const user = await Model.findOne({email});
    console.log(user);

    if (!user) return { success: false, message: "User not found" };

    
    const OdrequestIds = user.ODrequests.map(Odrequest => Odrequest.od_request_id);

    
    const Odrequests = await ODrequest.find({ _id: { $in: OdrequestIds } });
    console.log(Odrequests);
    return {
      success: true,
      message: "OD requests retrieved successfully",
      Odrequests: Odrequests || [],  
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server Error" };
  }
};

module.exports.createEventService = async (eventDetails) => {
  try {
    const { name, venue, student_head, time, faculty, date, forms } = eventDetails;

    console.log("Received Event Details:", eventDetails); // Log the incoming data

    if (!name || !venue || !student_head || !time || !faculty) {
      return { success: false, message: "All fields are required" };
    }

    const Faculty1 = await Faculty.findOne({ email: faculty });
    if (!Faculty1) {
      return { success: false, message: "Faculty not found" };
    }

    const Student1 = await StudentHead.findOne({ email: student_head });
    if (!Student1) {
      return { success: false, message: "Student head not found" };
    }

    const newEvent = new Event({ name, venue, student_head, time, faculty, date, forms });
    await newEvent.save();

    Faculty1.events.push({ event_id: newEvent._id });
    Student1.events.push({ event_id: newEvent._id });

    await Faculty1.save();
    await Student1.save();

    return { success: true, message: "Event created successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server Error" };
  }
};

module.exports.userLoginService = async (UserDetails) => {
  try {
    const { email, password, role } = UserDetails;

    let Model;
    if (role === "faculty") Model = Faculty;
    else if (role === "student-head") Model = StudentHead;
    else if (role === "volunteer") Model = Volunteer;
    else if (role === "participant") Model = Participant;
    else if (role === "HOD(or)Advisor") Model = Advisor;
    else return { success: false, message: "Invalid role specified" };

    const user = await Model.findOne({ email, password });

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return {
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role },
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server Error" };
  }
};

module.exports.getEventService = async (userDetails) => {
  try {
    const { email, role } = userDetails;

    let Model;
    if (role === "faculty") Model = Faculty;
    else if (role === "student-head") Model = StudentHead;
    else if (role === "volunteer") Model = Volunteer;
    else if (role === "participant") Model = Participant;
    else if (role === "HOD(or)Advisor") Model = Advisor;
    else return { success: false, message: "Invalid role specified" };

    const user = await Model.findOne({ email });
    if (!user) return { success: false, message: "User not found" };

    const eventIds = user.events.map(event => event.event_id);
    const events = await Event.find({ _id: { $in: eventIds } });

    return {
      success: true,
      message: "Events retrieved successfully",
      events: events || [],
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server Error" };
  }
};

module.exports.getAllEvents = async () => {
  try {
    const events = await Event.find({});
    return {
      success: true,
      message: "All events retrieved successfully",
      events: events || [],
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server Error" };
  }
};

module.exports.CreateODrequest = async (ODdetails) => {
  try {
    // Destructure details from the input object
    const { 
      student_name, 
      student_regNo, 
      student_dept, 
      date, 
      start_time, 
      end_time, 
      requested_by 
    } = ODdetails;

    console.log(ODdetails);
    
   
    const user = await Volunteer.findOne({ email: requested_by });
    
    if (!user) {
      throw new Error(`User with email ${requested_by} not found.`);
    }

    const requested_to = user.headEmail;

    // Check if an OD request with the same student name and date already exists
    const existingRequest = await ODrequest.findOne({
      student_name,
      date: new Date(date).toISOString().split('T')[0] // Ensure matching date format (YYYY-MM-DD)
    });

    if (existingRequest) {
      return {
        success: false,
        message: "OD request with this student name and date already exists."
      };
    }
    const status = "pending";
    // Creating a new document
    const newODRequest = new ODrequest({
      student_name,
      student_regNo,
      student_dept,
      date: new Date(date), // Ensure proper date format
      start_time,
      end_time,
      requested_to,
      requested_by,
      status
    });

    // Saving to the database
    const savedRequest = await newODRequest.save();

    // Find the Faculty member and push the OD request ID into their requests array
    // const faculty = await Faculty.findOne({ email: requested_to });

    const studenthead = await StudentHead.findOne({email:requested_to});
    console.log("wnefonwiefn:",studenthead);
    // if (faculty) {
    //   faculty.ODrequests.push({od_request_id:savedRequest._id});
    //   await faculty.save(); // Don't forget to save the updated Faculty document
    // }
    if (studenthead) {
      studenthead.ODrequests.push({od_request_id:savedRequest._id});
      await studenthead.save(); // Don't forget to save the updated Faculty document
    }

    console.log("OD Request Created:", savedRequest);
    return {
      success: true,
      message: "OD Request Created"
    };
  } catch (error) {
    console.error("Error creating OD Request:", error);
    throw error;
  }
};


module.exports.volunteerJoinService = async (volunteerRequestDetails) => {
  try {
    const { student_head_id, faculty_id, volunteer_id, event_name } = volunteerRequestDetails;

    if (!volunteer_id || !faculty_id || !student_head_id || !event_name) {
      return { success: false, message: "All fields are required" };
    }
    const status = "pending";
    const newRequest = await VolunteerRequest.create({
      student_head_id,
      faculty_id,
      volunteer_id,
      event_name,
      status
    });

    return { success: true, message: "Volunteer request added successfully", data: newRequest };
  } catch (error) {
    console.error("Error in volunteerJoinService:", error);
    return { success: false, message: "Server Error" };
  }
};

module.exports.getVolunteerRequestService = async (userDetails) => {
  try {
    console.log("User Details:", userDetails);

    // Find all volunteer requests for the given student head
    const volunteerRequests = await VolunteerRequest.find({ student_head_id: userDetails.email });

    // Extract unique volunteer emails
    
    const volunteerEmails = volunteerRequests.map(req => req.volunteer_id);
  
    // Fetch volunteer details based on email (not _id)
    const volunteers = await Volunteer.find({ email: { $in: volunteerEmails } });

    console.log("Volunteer Requests:", volunteerRequests);
    console.log("Volunteers:", volunteers);

    return {
      success: true,
      message: "Volunteer requests retrieved successfully",
      volunteerRequests:volunteerRequests,
      volunteers:volunteers, 
    };
  } catch (error) {
    console.error("Error in getVolunteerRequestService:", error);
    return { success: false, message: "Server Error" };
  }
};