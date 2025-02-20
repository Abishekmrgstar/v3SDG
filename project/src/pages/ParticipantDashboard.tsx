import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

function ParticipantDashboard() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/getAllEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch all events");
      }

      setEvents(data.events);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollEvents = (direction) => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < events.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Participant Dashboard</h1>

      {/* All Events Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold mb-4">All Events</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollEvents('left')}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => scrollEvents('right')}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              disabled={currentIndex >= events.length - 4}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex overflow-x-hidden gap-6 pb-4">
          {events.slice(currentIndex, currentIndex + 4).map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex-none w-[350px]"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>Date: {new Date(event.date).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>Time: {event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>Venue: {event.venue}</span>
                  </div>
                </div>
                <button
                  className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={() => window.open(event.forms, "_blank")}
                  disabled={!event.forms}
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Registrations Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-lg font-semibold mb-4">My Registrations</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Registered Events</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">2</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {/* Example Registered Event Cards */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Campus Tech Symposium</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>March 25, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>10:00 AM</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>Main Auditorium</span>
                  </div>
                </div>
                <button className="w-full bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded hover:bg-indigo-50 mt-2">
                  View Details
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Student Leadership Workshop</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>March 27, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>2:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>Conference Hall B</span>
                  </div>
                </div>
                <button className="w-full bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded hover:bg-indigo-50 mt-2">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantDashboard;
