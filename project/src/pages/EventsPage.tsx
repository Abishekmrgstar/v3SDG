import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // Import date formatting library

function EventsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    retrieveEvents();
  }, []);

  const retrieveEvents = async () => {
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("role");

    if (!email || !role) {
      toast.error("User email or role missing");
      return;
    }

    const userData = { email, role };
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/getEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch events");
      }
      
      setEvents(data.events);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-600">No events available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600">
                Date: {format(new Date(event.date), "dd-MM-yyyy")}
              </p>
              <p className="text-gray-600">Time: {event.time}</p>
              <p className="text-gray-600">Venue: {event.venue}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventsPage;
