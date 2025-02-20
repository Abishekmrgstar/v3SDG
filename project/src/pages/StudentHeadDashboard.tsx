import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

function StudentHeadDashboard() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    getVolunteerRequest();
  }, []);

  const [volunteerRequests, setVolunteerRequests] = useState([]);
  
const getVolunteerRequest = async () => {
  try {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("User email not found. Please login again.");
      return;
    }

    const response = await fetch("http://localhost:3000/getVolunteerRequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch volunteer request data");
    }

    const data = await response.json();
    console.log("Volunteer Request Data:", data);
    
    setVolunteerRequests(data.volunteerRequests);
    setVolunteers(data.volunteers);
    console.log("owbiuwebgf",data.volunteerRequests);
    console.log(volunteerRequests); // Correctly updating state
  } catch (error) {
    console.error("Error:", error);
  }
};


  const handleStatusChange = async (volunteerEmail, newStatus) => {
    try {
      const response = await fetch("http://localhost:3000/updateVolunteerStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: volunteerEmail, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      console.log("Update Response:", data);
      alert(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Student Head Dashboard</h1>

      {/* Volunteer Join Requests */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Volunteer Join Requests</h2>
        <div className="space-y-4">
          {volunteers.map((volunteer, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-sm">
              <div>
                <p className="font-semibold">{volunteer.name}</p>
                <p className="text-sm text-gray-600">{volunteer.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                  title="Accept"
                  onClick={() => handleStatusChange(volunteer.email, "accepted")}
                >
                  <FaCheck />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  title="Reject"
                  onClick={() => handleStatusChange(volunteer.email, "rejected")}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentHeadDashboard;
