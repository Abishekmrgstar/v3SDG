import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function VolunteerDashboard() {
  const [showPopup, setShowPopup] = useState(false);
  const [showODPopup, setShowODPopup] = useState(false);
  const [studentHead, setStudentHead] = useState('');
  const [facultyHead, setFacultyHead] = useState('');
  const [eventName, setEventName] = useState('');
  const [odName, setODName] = useState('');
  const [odRegNum, setODRegNum] = useState('');
  const [odDate, setODDate] = useState('');
  const [odStartTime, setODStartTime] = useState('');
  const [odEndTime, setODEndTime] = useState('');
  const [odDept, setODDept] = useState('');
  const [odReason, setODReason] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', event: 'Event 1', completed: false },
    { id: 2, text: 'Task 2', event: 'Event 2', completed: false },
    { id: 3, text: 'Task 3', event: 'Event 3', completed: false },
  ]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleODPopup = () => {
    setShowODPopup(!showODPopup);
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    try {
      const volunteer_id = localStorage.getItem("userEmail");
      const student_head_id = studentHead;
      const faculty_id = facultyHead;
      const event_name = eventName;

      const response = await fetch("http://localhost:3000/createVolunteerRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_head_id, faculty_id, event_name, volunteer_id }),
      });

      if (response.ok) {
        toast.success("Volunteer Request Submitted Successfully!");
        setShowPopup(false);
      } else {
        toast.error("Failed to submit volunteer request");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting request");
    }
  };

  const handleODSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        student_name: odName,
        student_regNo: odRegNum,
        student_dept: odDept,
        date: odDate,
        start_time: odStartTime,
        end_time: odEndTime,
        requested_by: localStorage.getItem('userEmail'),
        reason: odReason
      };

      const response = await fetch("http://localhost:3000/createODrequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("OD Request Submitted Successfully!");
        setShowODPopup(false);
      } else {
        toast.error("Failed to submit OD request");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting request");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const requested_by = localStorage.getItem('userEmail');

  if (!requested_by) {
    alert("User email not found. Please login again.");
    return;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Volunteer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Assigned Tasks Card */}
        <div className="bg-white p-6 rounded-lg shadow-md h-80 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">My Tasks</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="mr-2"
                      />
                      <span
                        className={`${
                          task.completed ? 'line-through text-gray-500' : 'text-blue-600'
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-gray-500">{task.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Participation Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Event Participation</h2>
            <button
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={togglePopup}
            >
              Join New Event
            </button>
          </div>
        </div>

        {/* OD Request Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-4">OD Requests</h2>
          <div className="space-y-3 w-full">
            <button
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={toggleODPopup}
            >
              Make OD Request
            </button>
          </div>
        </div>
      </div>

      {/* Popup for Join New Event */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md relative w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={togglePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold mb-4">Join New Event</h2>
            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Student Head</label>
                <input
                  type="text"
                  value={studentHead}
                  onChange={(e) => setStudentHead(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter Student Head"
                />
              </div>
              <div>
                <label className="block text-gray-700">Faculty Head</label>
                <input
                  type="text"
                  value={facultyHead}
                  onChange={(e) => setFacultyHead(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter Faculty Head"
                />
              </div>
              <div>
                <label className="block text-gray-700">Event Name</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter Event Name"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Popup for Make OD Request */}
      {showODPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md relative w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleODPopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold mb-4">Make OD Request</h2>
            <form onSubmit={handleODSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={odName}
                  onChange={(e) => setODName(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Registration Number</label>
                <input
                  type="text"
                  value={odRegNum}
                  onChange={(e) => setODRegNum(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your registration number"
                />
              </div>
              <div>
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  value={odDate}
                  onChange={(e) => setODDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={odStartTime}
                  onChange={(e) => setODStartTime(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">End Time</label>
                <input
                  type="time"
                  value={odEndTime}
                  onChange={(e) => setODEndTime(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Department</label>
                <input
                  type="text"
                  value={odDept}
                  onChange={(e) => setODDept(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your department"
                />
              </div>
              <div>
                <label className="block text-gray-700">Reason</label>
                <input
                  type="text"
                  value={odReason}
                  onChange={(e) => setODReason(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter reason"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VolunteerDashboard;
