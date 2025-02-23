import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import 'core-js/stable/atob';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
 import Chat from '../components/Chat';

const ChatsScreen = () => {
  const [options, setOptions] = useState(['Chats']);
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);
  // const {token, setToken, setUserId, userId} = useContext(AuthContext);
  const { token, setToken, setUserId, userId, handleLogout } = useContext(AuthContext); 
  const chooseOption = option => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };
  const navigation = useNavigation();
  // const logout = () => {
  //   clearAuthToken();
  // };
  const logout = async () => {
    try {
      await handleLogout(); // Use the provided handleLogout function
      navigation.replace('Login');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken('');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      setToken(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  useEffect(() => {
    if (userId) {
      getrequests();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getrequests = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:4000/getrequests/${userId}`,
      );

      setRequests(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log(requests);
  const acceptRequest = async requestId => {
    try {
      const response = await axios.post('http://10.0.2.2:4000/acceptrequest', {
        userId: userId,
        requestId: requestId,
      });

      if (response.status == 200) {
        await getrequests();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const getUser = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:4000/user/${userId}`);
      setChats(response.data);
    } catch (error) {
      console.log('Error fetching user', error);
      throw error;
    }
  };

  console.log('users', chats);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          justifyContent: 'space-between',
        }}>
        <Pressable onPress={logout}>
          <Image
            style={{width: 30, height: 30, borderRadius: 15}}
            source={{
              uri: 'https://images.unsplash.com/photo-1530092285049-1c42085fd395?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
            }}
          />
        </Pressable>

        <Text style={{fontSize: 15, fontWeight: '500'}}>Alert Screen</Text>

        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialIcons
              onPress={() => navigation.navigate('People')}
              name="person-outline"
              size={26}
              color="black"
            />
          </View>
        </View>
      </View>

      <View style={{padding: 10}}>
        <Pressable
          onPress={() => chooseOption('Chats')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>Check the Alerts</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </Pressable>

        <View>
          {options?.includes('Chats') &&
            (chats?.length > 0 ? (
              <View>
                {chats?.map((item, index) => (
                  <Chat item={item} key={item?._id} />
                ))}
              </View>
            ) : (
              <View
                style={{
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{textAlign: 'center', color: 'gray'}}>
                  No Alerts sent yet
                  </Text>
                  <Text style={{marginTop: 4, color: 'gray'}}>
                  Get started by Sending a request to our "Heritage Support Team"
                  </Text>
                </View>
              </View>
            ))}
        </View>

        <Pressable
          onPress={() => chooseOption('Requests')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>Requests</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </Pressable>

        <View style={{marginVertical: 12}}>
          {options?.includes('Requests') && (
            <View>
              <Text style={{fontSize: 15, fontWeight: '500'}}>
                Checkout all the requests
              </Text>

              {requests?.map((item, index) => (
                <Pressable style={{marginVertical: 12}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Pressable>
                      <Image
                        source={{uri: item?.from?.image}}
                        style={{width: 40, height: 40, borderRadius: 20}}
                      />
                    </Pressable>

                    <View style={{flex: 1}}>
                      <Text style={{fontSize: 15, fontWeight: '500'}}>
                        {item?.from?.name}
                      </Text>

                      <Text style={{marginTop: 4, color: 'gray'}}>
                        {item?.message}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => acceptRequest(item?.from?._id)}
                      style={{
                        padding: 8,
                        backgroundColor: '#005187',
                        width: 75,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          textAlign: 'center',
                          color: 'white',
                        }}>
                        Accept
                      </Text>
                    </Pressable>

                    <AntDesign name="delete" size={26} color="red" />
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
