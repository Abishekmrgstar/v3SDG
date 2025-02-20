import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Award } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50"></div>
      <div className="container mx-auto px-4 py-12 text-center relative z-10">
        <div className="mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Campus Event Hub
          </h1>
          <p className="text-xl text-white opacity-90 mb-8">
            Your one-stop platform for managing and participating in campus events
          </p>
          <button
            onClick={() => navigate('/role-selection')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Calendar className="w-14 h-14 mb-4 text-gray-50 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Upcoming Events</h3>
            <p className="opacity-80">
              Stay updated with all the exciting events happening on campus
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Users className="w-14 h-14 mb-4 text-gray-50 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Easy Registration</h3>
            <p className="opacity-80">
              Quick and simple registration process for participants
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Award className="w-14 h-14 mb-4 text-gray-50 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Event Management</h3>
            <p className="opacity-80">
              Efficient tools for organizers to manage events seamlessly
            </p>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event cards will be dynamically populated from the database */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;