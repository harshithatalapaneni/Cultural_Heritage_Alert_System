// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {jwtDecode} from 'jwt-decode';
// import {createContext, useState, useEffect} from 'react';
// import 'core-js/stable/atob';

// const AuthContext = createContext();

// const AuthProvider = ({children}) => {
//   const [token, setToken] = useState('');
//   const [userId, setUserId] = useState('');
//   const [authUser, setAuthUser] = useState(
//     AsyncStorage.getItem('authToken') || null,
//   );
//   // console.log("BABE AU",authUser)
//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = await AsyncStorage.getItem('authToken');
//       const decodedToken = jwtDecode(token);
//       setToken(token);
//       const userId = decodedToken.userId;
//       setUserId(userId);
//     };

//     fetchUser();
//   }, []);
//   return (
//     <AuthContext.Provider value={{token, userId, setToken, setUserId,authUser,setAuthUser}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export {AuthContext, AuthProvider};

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// const decodeJWT = (token) => {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );
//     return JSON.parse(jsonPayload);
//   } catch (e) {
//     console.error('Failed to decode JWT:', e);
//     return null;
//   }
// };

// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [userId, setUserId] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     setLoading(true);
//     const storedToken = await AsyncStorage.getItem('authToken');
//     if (storedToken) {
//       const decodedToken = decodeJWT(storedToken);
//       setToken(storedToken);
//       setUserId(decodedToken?.userId || '');
//       setUserRole(decodedToken?.role || '');
//     }
//     setLoading(false);
//   };

//   const handleLogin = async (newToken) => {
//     await AsyncStorage.setItem('authToken', newToken);
//     await fetchUser(); // Refetch user data with new token
//   };

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('authToken');
//     setToken(null);
//     setUserId('');
//     setUserRole('');
//   };

//   useEffect(() => {
//     fetchUser(); // Fetch user data on initial load
//   }, []);

//   if (loading) return null; // or render a loading screen

//   return (
//     <AuthContext.Provider
//       value={{ token, userId, userRole, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to decode JWT:', e);
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    const storedToken = await AsyncStorage.getItem('authToken');
    if (storedToken) {
      const decodedToken = decodeJWT(storedToken);
      setToken(storedToken);
      setUserId(decodedToken?.userId || '');
      setUserRole(decodedToken?.role || '');
    }
    setLoading(false);
  };

  const handleLogin = async (newToken) => {
    await AsyncStorage.setItem('authToken', newToken);
    await fetchUser(); // Refetch user data with new token
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    setToken(null);
    setUserId('');
    setUserRole('');
  };

  useEffect(() => {
    fetchUser(); // Fetch user data on initial load
  }, []);

  if (loading) return null; // or render a loading screen

  return (
    <AuthContext.Provider
      value={{ token, setToken, userId, userRole, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
