// import {
//     Pressable,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
//     KeyboardAvoidingView,
//   } from 'react-native';
//   import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
//   import {AuthContext} from '../AuthContext';
//   import {useNavigation, useRoute} from '@react-navigation/native';
//   import Ionicons from 'react-native-vector-icons/Ionicons';
//   import Entypo from 'react-native-vector-icons/Entypo';
//   import Feather from 'react-native-vector-icons/Feather';
//   import axios from 'axios';
//   import {useSocketContext} from '../SocketContext';
  
//   const ChatRoom = () => {
//     const navigation = useNavigation();
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const {token, userId, setToken, setUserId} = useContext(AuthContext);
//     const {socket} = useSocketContext();
//     const route = useRoute();
//     useLayoutEffect(() => {
//       return navigation.setOptions({
//         headerTitle: '',
//         headerLeft: () => (
//           <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
//             <Ionicons name="arrow-back" size={24} color="black" />
//             <View>
//               <Text>{route?.params?.name}</Text>
//             </View>
//           </View>
//         ),
//       });
//     }, []);
//     const listeMessages = () => {
//       const {socket} = useSocketContext();
  
//       useEffect(() => {
//         socket?.on('newMessage', newMessage => {
//           newMessage.shouldShake = true;
//           setMessages([...messages, newMessage]);
//         });
  
//         return () => socket?.off('newMessage');
//       }, [socket, messages, setMessages]);
//     };
  
//     listeMessages();
//     const sendMessage = async (senderId, receiverId) => {
//       try {
//         await axios.post('http://10.0.2.2:4000/sendMessage', {
//           senderId,
//           receiverId,
//           message,
//         });
  
//         socket.emit('sendMessage', {senderId, receiverId, message});
  
//         setMessage('');
//         fetchMessages();
//         // setTimeout(() => {
//         //   fetchMessages();
//         // }, 10);
//       } catch (error) {
//         console.log('Error', error);
//       }
//     };
//     const fetchMessages = async () => {
//       try {
//         const senderId = userId;
//         const receiverId = route?.params?.receiverId;
  
//         const response = await axios.get('http://10.0.2.2:4000/messages', {
//           params: {senderId, receiverId},
//         }); 
  
//         setMessages(response.data);
//       } catch (error) {
//         console.log('Error', error);
//       }
//     };
//     useEffect(() => {
//       fetchMessages();
//     }, []);
//     console.log('messages', messages);
//     const formatTime = time => {
//       const options = {hour: 'numeric', minute: 'numeric'};
//       return new Date(time).toLocaleString('en-US', options);
//     };
//     return (
//       <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}}>
//         <ScrollView>
//           {messages?.map((item, index) => {
//             return (
//               <Pressable
//               style={[
//                   item?.senderId?._id === userId
//                     ? {
//                         alignSelf: 'flex-end',
//                         backgroundColor: '#DCF8C6',
//                         padding: 8,
//                         maxWidth: '60%',
//                         borderRadius: 7,
//                         margin: 10,
//                       }
//                     : {
//                         alignSelf: 'flex-start',
//                         backgroundColor: 'white',
//                         padding: 8,
//                         margin: 10,
//                         borderRadius: 7,
//                         maxWidth: '60%',
//                       },
              
//                 ]}>
//                 <Text style={{fontSize:13,textAlign:"left"}}>{item?.message}</Text>
//                 <Text style={{textAlign:"right",fontSize:9,color:"gray",marginTop:4}}>{formatTime(item?.timeStamp)}</Text>
//               </Pressable>
//             );
//           })}
//         </ScrollView>
  
//         <View
//           style={{
//             backgroundColor: 'white',
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: 10,
//             paddingVertical: 10,
//             borderTopWidth: 1,
//             borderTopColor: '#dddddd',
//             marginBottom: 20,
//           }}>
//           <Entypo name="emoji-happy" size={24} color="gray" />
  
//           <TextInput
//             placeholder="type your first alert..."
//             value={message}
//             onChangeText={setMessage}
//             style={{
//               flex: 1,
//               height: 40,
//               borderWidth: 1,
//               borderColor: '#ddddd',
//               borderRadius: 20,
//               paddingHorizontal: 10,
//               marginLeft: 10,
//             }}
//           />
  
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: 8,
//               marginHorizontal: 8,
//             }}>
//             <Entypo name="camera" size={24} color="gray" />
  
//             <Feather name="mic" size={24} color="gray" />
//           </View>
  
//           <Pressable
//             onPress={() => sendMessage(userId, route?.params?.receiverId)}
//             style={{
//               backgroundColor: '#6D67E4',
//               borderColor:'#6643B5',
//               borderWidth:3,
//               paddingHorizontal: 12,
//               paddingVertical: 8,
//               borderRadius: 20,
//             }}>
//             <Text style={{textAlign: 'center', color: 'white'}}>Send Alert</Text>
//           </Pressable>
//         </View>
//       </KeyboardAvoidingView>
//     );
//   };
  
//   export default ChatRoom;
  
//   const styles = StyleSheet.create({});
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { useSocketContext } from '../SocketContext';

const ChatRoom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { token, userId } = useContext(AuthContext);
  const { socket } = useSocketContext();
  const route = useRoute();
  const emojiList = ['😊', '😂', '😢', '😡', '😍', '👍', '🎉', '❤️'];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <View>
            <Text>{route?.params?.name}</Text>
          </View>
        </View>
      ),
    });
  }, [navigation, route]);

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => socket?.off('newMessage');
  }, [socket]);

  const sendMessage = async () => {
    try {
      const senderId = userId;
      const receiverId = route?.params?.receiverId;
      await axios.post('http://10.0.2.2:4000/sendMessage', {
        senderId,
        receiverId,
        message,
      });

      socket.emit('sendMessage', { senderId, receiverId, message });
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.log('Error', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = route?.params?.receiverId;

      const response = await axios.get('http://10.0.2.2:4000/messages', {
        params: { senderId, receiverId },
      });

      setMessages(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId, route]);

  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(time).toLocaleString('en-US', options);
  };

  const toggleEmojiPicker = () => {
    console.log('Emoji button clicked'); // Debugging statement
    setShowEmojiPicker(!showEmojiPicker);
  };

  const addEmoji = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        {messages?.map((item, index) => (
          <Pressable
            key={index}
            style={[
              item?.senderId?._id === userId
                ? {
                    alignSelf: 'flex-end',
                    backgroundColor: '#DCF8C6',
                    padding: 8,
                    maxWidth: '60%',
                    borderRadius: 7,
                    margin: 10,
                  }
                : {
                    alignSelf: 'flex-start',
                    backgroundColor: 'white',
                    padding: 8,
                    margin: 10,
                    borderRadius: 7,
                    maxWidth: '60%',
                  },
            ]}
          >
            <Text style={{ fontSize: 13, textAlign: 'left' }}>{item?.message}</Text>
            <Text style={{ textAlign: 'right', fontSize: 9, color: 'gray', marginTop: 4 }}>
              {formatTime(item?.timeStamp)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {showEmojiPicker && ( // Move emoji picker outside of ScrollView
        <View style={styles.emojiPicker}>
          {emojiList.length === 0 ? (
            <Text>No emojis available</Text>
          ) : (
            emojiList.map((emoji, index) => (
              <Pressable key={index} onPress={() => addEmoji(emoji)}>
                <Text style={styles.emoji}>{emoji}</Text>
              </Pressable>
            ))
          )}
        </View>
      )}

      <View style={styles.inputContainer}>
        <Entypo name="emoji-happy" size={24} color="gray" onPress={toggleEmojiPicker} />

        <TextInput
          placeholder="type your first alert..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <View style={styles.iconContainer}>
          <Entypo name="camera" size={24} color="gray" />
          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable onPress={sendMessage} style={styles.sendButton}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Send Alert</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#6D67E4',
    borderColor: '#6643B5',
    borderWidth: 3,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  emojiPicker: {
    position: 'absolute',
    bottom: 80, // Adjust this to position it properly above the keyboard
    left: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    zIndex: 1000, // Ensure it's above other elements
  },
  emoji: {
    fontSize: 24,
    padding: 5,
  },
});
