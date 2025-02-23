import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const User = ({item, showChatOption}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Pressable>
          <Image
            source={{uri: item?.image}}
            style={styles.userImage}
          />
        </Pressable>

        <View style={styles.userDetails}>
          <Text>{item?.name}</Text>
          <Text>{item?.email}</Text>
        </View>

        {/* Only show Chat button if showChatOption is true */}
        {showChatOption && (
          <Pressable
            onPress={() =>
              navigation.navigate('Request', {
                name: item?.name,
                receiverId: item?._id,
              })
            }
            style={styles.chatButton}>
            <Text style={styles.chatButtonText}>Alert Request</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    flex: 1,
  },
  chatButton: {
    padding: 10,
    width: 100,
    backgroundColor: '#6D67E4',
    borderRadius: 4,
  },
  chatButtonText: {
    textAlign: 'center',
    color: 'white',
  },
});
