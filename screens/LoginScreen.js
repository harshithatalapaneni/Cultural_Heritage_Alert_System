// import {
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TextInput,
//   Pressable,
//   Image,
//   ScrollView,
// } from 'react-native';
// import React, {useContext, useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AuthContext} from '../AuthContext';
// import axios from 'axios';
// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();
//   const {token, setToken} = useContext(AuthContext);
//   useEffect(() => {
//     if (token) {
//       navigation.replace('MainStack', {screen: 'Main'});
//     }
//   }, [token, navigation]);
//   const handleLogin = () => {
//     const user = {
//       email: email,
//       password: password,
//     };

//     axios.post('http://10.0.2.2:4000/login', user).then(response => {
//       const token = response.data.token;
//       console.log("token",token)
//       AsyncStorage.setItem('authToken', token);
//       setToken(token);
//     });
//   };
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
//       <View style={{padding: 10, alignItems: 'center'}}>
//         <KeyboardAvoidingView>
//           <View
//             style={{
//               marginTop: 50,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Text style={{fontSize: 20, fontWeight: '500'}}>
//               Login to your account
//             </Text>
//           </View>

//           <View style={{marginTop: 50}}>
//             <View>
//               <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
//                 Email
//               </Text>
//               <View>
//                 <TextInput
//                   value={email}
//                   onChangeText={setEmail}
//                   placeholderTextColor="#BEBEBE"
//                   style={{
//                     width: 340,
//                     marginTop: 15,
//                     borderBottomColor: '#BEBEBE',
//                     borderBottomWidth: 1,
//                     paddingBottom: 10,
//                     fontFamily: 'GeezaPro-Bold',
//                     fontSize: email ? 15 : 15,
//                   }}
//                   placeholder="Enter your email"
//                 />
//               </View>

//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: '600',
//                   color: 'gray',
//                   marginTop: 25,
//                 }}>
//                 Password
//               </Text>
//               <View>
//                 <TextInput
//                   secureTextEntry={true}
//                   value={password}
//                   onChangeText={setPassword}
//                   placeholderTextColor="#BEBEBE"
//                   style={{
//                     width: 340,
//                     marginTop: 15,
//                     borderBottomColor: '#BEBEBE',
//                     borderBottomWidth: 1,
//                     paddingBottom: 10,
//                     fontFamily: 'GeezaPro-Bold',
//                     fontSize: email ? 15 : 15,
//                   }}
//                   placeholder="Enter your password"
//                 />
//               </View>
//             </View>

//             <Pressable
//             onPress={handleLogin}
//               style={{
//                 width: 200,
//                 backgroundColor: '#4A55A2',
//                 padding: 15,
//                 marginTop: 50,
//                 marginLeft: 'auto',
//                 marginRight: 'auto',
//                 borderRadius: 6,
//               }}>
//               <Text
//                 style={{
//                   color: 'white',
//                   fontSize: 16,
//                   fontWeight: 'bold',
//                   textAlign: 'center',
//                 }}>
//                 Login
//               </Text>
//             </Pressable>

//             <Pressable onPress={() => navigation.navigate('Register')}>
//               <Text
//                 style={{
//                   textAlign: 'center',
//                   color: 'gray',
//                   fontSize: 16,
//                   margin: 12,
//                 }}>
//                 Don't have an account? Sign Up
//               </Text>
//             </Pressable>
//           </View>

//           <View
//             style={{
//               marginTop: 0,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Image
//               style={{width: 300, height: 290}}
//                 source={require('../images/login1.jpg')}   
              
//             />
//           </View>
//         </KeyboardAvoidingView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({});

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setUserRole] = useState(''); // New state for role
  const navigation = useNavigation();
  // const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', { screen: 'Main' });
    }
  }, [token, navigation]);

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('http://10.0.2.2:4000/login', { email, password });
  //     console.log("Response Data:", response.data);
  //     const { token } = response.data;
  
  //     // Store token
  //     await AsyncStorage.setItem('authToken', token);
  //     setToken(token); // This will trigger the useEffect in AuthContext to decode the token and set userRole
  
  //     console.log("Logged in successfully");
  //   } catch (error) {
  //     console.log('Login Error:', error);
  //   }
  // };
  const { token, setToken, handleLogin } = useContext(AuthContext);
  const login = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:4000/login', { email, password });
      console.log("Response Data:", response.data);
      const { token } = response.data;

      // Use the handleLogin from AuthContext
      await handleLogin(token); // This will store the token and fetch user data

      console.log("Logged in successfully");
    } catch (error) {
      console.log('Login Error:', error);
      setError('Login failed. Please check your credentials.'); // Update the error state to show feedback to the user
    }
  };
  
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 10, alignItems: 'center' }}>
        <KeyboardAvoidingView>
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '500' }}>
              Login to your account
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>
                Email
              </Text>
              <View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 340,
                    marginTop: 5,
                    borderBottomColor: '#BEBEBE',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontFamily: 'GeezaPro-Bold',
                    fontSize: email ? 15 : 15,
                  }}
                  placeholder="Enter your email"
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'gray',
                  marginTop: 25,
                }}
              >
                Password
              </Text>
              <View>
                <TextInput
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 340,
                    marginTop: 5,
                    borderBottomColor: '#BEBEBE',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontFamily: 'GeezaPro-Bold',
                    fontSize: email ? 15 : 15,
                  }}
                  placeholder="Enter your password"
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'gray',
                  marginTop: 25,
                }}
              >
                Choose your role
              </Text>
              <View>
                <TextInput
                  value={role}
                  onChangeText={setUserRole}
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 340,
                    marginTop: 5,
                    borderBottomColor: '#BEBEBE',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontFamily: 'GeezaPro-Bold',
                    fontSize: role ? 15 : 15,
                  }}
                  placeholder="user/admin"
                />
              </View>
            </View>

            <Pressable
              onPress={login}
              style={{
                width: 200,
                backgroundColor: '#6D67E4',
                padding: 15,
                marginTop: 30,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Login
              </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'gray',
                  fontSize: 16,
                  margin: 12,
                }}
              >
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{ width: 300, height: 290 }}
              source={require('../images/login1.jpg')}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
