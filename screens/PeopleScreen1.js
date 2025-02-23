import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../AuthContext';
import User from '../components/User';
import axios from 'axios';

const PeopleScreen1 = () => {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const {userId} = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:4000/users/${userId}`);
      // Filter users and admins
      const filteredAdmins = response.data.filter(user => user.role === 'admin');
      const filteredUsers = response.data.filter(user => user.role === 'user');
      setAdmins(filteredAdmins);
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView>
      {/* Admins Section */}
      <View>
        <Text style={styles.title}>Admins in the System</Text>
      </View>
      <FlatList
        data={admins}
        renderItem={({item}) => (
          // Render admin with chat option
          <User item={item} key={item?._id} showChatOption={true} />
        )}
        keyExtractor={item => item._id}
      />

      {/* Users Section */}
      <View>
        <Text style={styles.title}>Users in the  Heritage Hub 📜🔔</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item}) => (
          // Render user without chat option
          <User item={item} key={item?._id} showChatOption={false} />
        )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};

export default PeopleScreen1;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 12,
  },
});
