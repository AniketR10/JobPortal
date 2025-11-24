import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import JobsPage from './pages/JobsPage';
import { AuthProvider } from './context/authContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CandidateDashboard from './pages/CandidateDashboard';
import JobDetailsPage from './pages/JobDetailspage';
import EmployerDashboard from './pages/EmployerDashboard';
import CreateJobPage from './pages/CreateJobPage';
import EmployerJobs from './pages/EmployerJobs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/dashboard" element={<CandidateDashboard />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/jobs/new" element={<CreateJobPage />} />
          <Route path="/employer/jobs" element={<EmployerJobs />} />
        </Routes>
      </Router>
      </AuthProvider>
  )
}

export default App
