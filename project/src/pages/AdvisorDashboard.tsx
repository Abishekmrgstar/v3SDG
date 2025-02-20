import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaCheck, FaTimes } from 'react-icons/fa';

function AdvisorDashboard() {
  const [odRequests, setodRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOd();
  }, []);

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
      if (response.ok) {
        setodRequests(data.Odrequests); // Set state with fetched data
      } else {
        throw new Error(data.message || "Failed to fetch OD requests");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  const handleApproval = async (request_id, action) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/updateId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_id, action }),
      });

      if (!response.ok) throw new Error("Failed to update OD request");

      toast.success(`OD Request ${action === "accept" ? "Accepted" : "Rejected"} Successfully`);
      getOd(); // Refresh the OD requests
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold">Advisor Dashboard</h1>
      </header>
      <main className="flex-grow p-6 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">OD Approvals</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">Pending Approvals</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-lg">
                {odRequests.length}
              </span>
            </div>

            {odRequests.length === 0 ? (
              <p className="text-gray-600">No pending approvals.</p>
            ) : (
              odRequests.map((request, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-lg">{request.student_name}</p>
                    <p className="text-gray-600">Reg No: {request.student_regNo}</p>
                    <p className="text-gray-600">Date: {new Date(request.date).toLocaleDateString()}</p>
                    <p className="text-gray-600">Dept: {request.student_dept}</p>
                    <p className="text-gray-500">Reason: Symposium</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
                      title="Accept"
                      onClick={() => handleApproval(request._id, "accept")}
                      disabled={loading}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
                      title="Reject"
                      onClick={() => handleApproval(request._id, "reject")}
                      disabled={loading}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdvisorDashboard;
