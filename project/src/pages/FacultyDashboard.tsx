import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { formToJSON } from "axios";

function FacultyDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudentHeadModalOpen, setIsStudentHeadModalOpen] = useState(false);
  const userEmail = localStorage.getItem("userEmail");

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    venue: "",
    time: "",
    student_head: "",
    faculty: userEmail,
    forms: "" // New state for event forms link
  });
  const [studentHeadData, setStudentHeadData] = useState({
    name: "",
    email: "",
    eventName: "",
    facultyEmail: userEmail
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleStudentHeadChange = (e) => {
    setStudentHeadData({ ...studentHeadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/createEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Event creation failed");

      toast.success("Event Created Successfully");
      setIsModalOpen(false);forms
      setEventData({ name: "", date: "", venue: "", time: "", student_head: "", forms: "" });
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStudentHeadSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/createStudentHead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentHeadData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Student Head creation failed");

      toast.success("Student Head Created Successfully");
      setIsStudentHeadModalOpen(false);
      setStudentHeadData({ name: "", email: "", eventName: "" });
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getOd();
  //   getBudget(); // Call getOd when the page loads
  // }, []);

  const [odRequests, setodRequests] = useState([]);

  const getOd = async () => {
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("role");
    try {
      const response = await fetch("http://localhost:3000/getODrequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();
      console.log("Fetched data:", data); // Log the raw data to confirm structure
      if (response.ok) {
        setodRequests(data.Odrequests); // Set state with fetched data
      } else {
        throw new Error(data.message || "Failed to fetch OD requests");
      }

    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  const [budgetRequests, setBudgetRequests] = useState([]);
  const getBudget = async () => {
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("role");
    try {
      const response = await fetch("http://localhost:3000/getBudgetRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();
      console.log("Fetched data:", data); // Log the raw data to confirm structure
      if (response.ok) {
        setBudgetRequests(data.budgetRequests); // Set state with fetched data
      } else {
        throw new Error(data.message || "Failed to fetch OD requests");
      }

    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventData({ name: "", date: "", venue: "", time: "", student_head: "", forms: "" });
  };

  const closeStudentHeadModal = () => {
    setIsStudentHeadModalOpen(false);
    setStudentHeadData({ name: "", email: "", eventName: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Faculty Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Event Management</h2>
          <div className="space-y-3">
            <button
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={() => setIsModalOpen(true)}
            >
              Create New Event
            </button>
            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setIsStudentHeadModalOpen(true)}
            >
              Create Student Head
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Budget Requests</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Pending Approvals</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                {budgetRequests.length}
              </span>
            </div>

            {budgetRequests.length === 0 ? (
              <p>No pending approvals.</p>
            ) : (
              budgetRequests.map((Budget, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{Budget.event_name}</p>
                    <p className="font-semibold">{Budget.total_budget}</p>
                    <p className="text-sm text-gray-500">{Budget.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                      title="Accept"
                      onClick={() => handle(request._id, "accept")}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      title="Reject"
                      onClick={() => handle(request._id, "reject")}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">OD Approvals</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Pending Approvals</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                {odRequests.length}
              </span>
            </div>

            {odRequests.length === 0 ? (
              <p>No pending approvals.</p>
            ) : (
              odRequests.map((request, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{request.student_name}</p>
                    <p className="text-sm text-gray-600">Reg No: {request.student_regNo}</p>
                    <p className="text-sm text-gray-600">Date: {new Date(request.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Dept: {request.student_dept}</p>
                    <p className="text-sm text-gray-500">Reason: Symposium</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                      title="Accept"
                      onClick={() => handle(request._id, "accept")}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      title="Reject"
                      onClick={() => handle(request._id, "reject")}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold">Create Event</h5>
              <button
                onClick={closeModal}
                className="text-xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="eventName" className="block font-medium">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="eventName"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter event name"
                  value={eventData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="eventDate" className="block font-medium">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="eventDate"
                  className="w-full border rounded px-3 py-2"
                  value={eventData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="eventVenue" className="block font-medium">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  id="eventVenue"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter venue"
                  value={eventData.venue}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="studentHead" className="block font-medium">
                  Student Head
                </label>
                <input
                  type="text"
                  name="student_head"
                  id="studentHead"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter student head name"
                  value={eventData.student_head}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="eventTime" className="block font-medium">
                  Timings
                </label>
                <input
                  type="time"
                  name="time"
                  id="eventTime"
                  className="w-full border rounded px-3 py-2"
                  value={eventData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="forms" className="block font-medium">
                  Event Forms Link
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="forms"
                    id="forms"
                    className="flex-grow border rounded px-3 py-2"
                    placeholder="Paste event forms link"
                    value={eventData.forms}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => window.open("https://docs.google.com/forms/u/0/?tgif=d", "_blank")}
                  >
                    Create Form
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isStudentHeadModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold">Create Student Head</h5>
              <button
                onClick={closeStudentHeadModal}
                className="text-xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleStudentHeadSubmit} className="space-y-4">
              <div>
                <label htmlFor="studentHeadName" className="block font-medium">
                  Student Head Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="studentHeadName"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter student head name"
                  value={studentHeadData.name}
                  onChange={handleStudentHeadChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="studentHeadEmail" className="block font-medium">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  id="studentHeadEmail"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter email ID"
                  value={studentHeadData.email}
                  onChange={handleStudentHeadChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="eventName" className="block font-medium">
                  Event Name
                </label>
                <input
                  type="text"
                  name="eventName"
                  id="eventName"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter event name"
                  value={studentHeadData.eventName}
                  onChange={handleStudentHeadChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="facultyEmail" className="block font-medium">
                  Faculty Email
                </label>
                <input
                  type="email"
                  name="facultyEmail"
                  id="facultyEmail"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter faculty email"
                  value={studentHeadData.facultyEmail}
                  onChange={handleStudentHeadChange}
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyDashboard;
