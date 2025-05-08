import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {

  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
  );
}

export default App;
