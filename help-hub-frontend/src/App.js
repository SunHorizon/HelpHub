import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import OrganizerDashboard from './pages/OrganizerDashboard'

function App() {

  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='organizer-dashboard' element={<OrganizerDashboard />} />
    </Routes>
  );
}

export default App;
