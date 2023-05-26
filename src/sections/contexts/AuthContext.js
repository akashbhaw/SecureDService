/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useContext, useState, useEffect } from 'react';

import { auth } from '../firebase/firebase'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading]=useState(true)

  const signup = (email, password, firstName, lastName) => auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const {user} = userCredential;
        return user.updateProfile({
          displayName: `${firstName} ${lastName}`
        });
      });
  

  const login=(email,password)=>{

    auth.signInWithEmailAndPassword(email,password)
  }

  const logout=()=>{
    auth.signOut()
  }

  const resetpass=(email)=>auth.sendPasswordResetEmail(email)
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetpass
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setLoading(false)
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
