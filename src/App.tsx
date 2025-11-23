import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import JobsPage from './pages/JobsPage';
import { AuthProvider } from './context/authContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
      </AuthProvider>
  )
}

export default App
