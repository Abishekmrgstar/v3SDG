import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCog, Users, UserCheck, User, Briefcase } from 'lucide-react';

function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'Faculty Head',
      icon: UserCog,
      description: 'Manage events and oversee all activities',
      path: '/login/faculty',
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: 'HOD and Advisors',
      icon: Briefcase,
      description: 'Assist in event management and administration',
      path: '/login/HOD(or)Advisor',
      color: 'from-indigo-500 to-indigo-700',
    },
    {
      title: 'Student Head',
      icon: Users,
      description: 'Coordinate events and manage volunteers',
      path: '/login/student-head',
      color: 'from-purple-500 to-purple-700',
    },
    {
      title: 'Volunteer',
      icon: UserCheck,
      description: 'Help organize and manage events',
      path: '/login/volunteer',
      color: 'from-green-500 to-green-700',
    },
    {
      title: 'Participant',
      icon: User,
      description: 'Register and participate in events',
      path: '/login/participant',
      color: 'from-pink-500 to-pink-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-16">
          Select Your Role
        </h1>

        <div className="grid grid-cols-5 gap-10">
          {roles.map((role) => (
            <div
              key={role.title}
              className="transform hover:scale-105 transition-all duration-300"
            >
              <button
                onClick={() => navigate(role.path)}
                className="w-full h-full"
              >
                <div
                  className={`bg-gradient-to-br ${role.color} rounded-xl p-8 text-white h-full`}
                >
                  <role.icon className="w-16 h-16 mb-6 mx-auto" />
                  <h2 className="text-2xl font-semibold mb-4">{role.title}</h2>
                  <p className="text-white text-opacity-90 text-lg">
                    {role.description}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
