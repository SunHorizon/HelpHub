import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { app } from './firebase';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';


const auth = getAuth(app);

function App() {

  const fetchData = async () => {
    try{
      const user = auth.currentUser;
      if (!user) {
        console.log('No user is logged in.');
        return;
      }

      const firebaseAuthToken = await user.getIdToken();
      const response = await axios.get("http://localhost:5000/testFirebase", {
        headers: {
          Authorization: `Bearer ${firebaseAuthToken}`,
        },
      });
      console.log(response.data);
    }catch(error){
      console.error('Error fetching data:', error)
    }
  };

  const loginUser = async (email, password) => {
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in');
      fetchData(); // call the function here
    } catch (error) {
      console.error('Login error:', error);
    }
  };


  return (
    <div className="App">
      <div>
        <button type="button" onClick={ () => loginUser("someEmail@hotmail.com", "password1234")}>SignIn</button>
      </div>
    </div>
  );
}

export default App;
