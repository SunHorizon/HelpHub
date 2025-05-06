import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {

  // const fetchData = async () => {
  //   try{
  //     const user = auth.currentUser;
  //     if (!user) {
  //       console.log('No user is logged in.');
  //       return;
  //     }

  //     const firebaseAuthToken = await user.getIdToken();
  //     const response = await axios.get("http://localhost:5000/testFirebase", {
  //       headers: {
  //         Authorization: `Bearer ${firebaseAuthToken}`,
  //       },
  //     });
  //     console.log(response.data);
  //   }catch(error){
  //     console.error('Error fetching data:', error)
  //   }
  // };

  // const loginUser = async (email, password) => {
    
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     console.log('User signed in');
  //     fetchData(); // call the function here
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // };

  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
  );
}

export default App;
