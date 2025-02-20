import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DashboardLayout from './components/DashboardLayout';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentHeadDashboard from './pages/StudentHeadDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import ParticipantDashboard from './pages/ParticipantDashboard';
import EventsPage from './pages/EventsPage';
import AdvisorDashboard from './pages/AdvisorDashboard';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/signup/:role" element={<SignUp />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="faculty" element={<FacultyDashboard />} />
          <Route path="student-head" element={<StudentHeadDashboard />} />
          <Route path="volunteer" element={<VolunteerDashboard />} />
          <Route path="participant" element={<ParticipantDashboard />} />
          <Route path="HOD(or)Advisor" element={<AdvisorDashboard />} />

        </Route>
        <Route path="/events" element={<EventsPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;