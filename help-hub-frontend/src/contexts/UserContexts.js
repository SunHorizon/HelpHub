import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'
import axios from 'axios'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if(firebaseUser){
                const token = await firebaseUser.getIdToken();
                const response = await axios.get(`http://localhost:5000/api/users/${firebaseUser.uid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data); 
            }else{
                setUser(null)
            }
        });

        return () => unsubscribe();
    }, [])

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);