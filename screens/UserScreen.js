import {
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Chat from '../components/Chat';
import AppIntroSlider from 'react-native-app-intro-slider';
import image1 from '../images/slide1.webp';
import image2 from '../images/slide2.png';

import image3 from '../images/slidef.jpg';

const culturalHeritageImages = [
    {
        key: '1',
        image: image1,
    },
    { key: '2', image: image2 },
    { key: '3', image: image3 },
];

const hardcodedFacts = [
    { key: '1', text: 'The Great Wall of China stretches over 13,000 miles!' },
    { key: '2', text: 'The Pyramids of Giza were built over 4,500 years ago.' },
    { key: '3', text: 'Machu Picchu is one of the New Seven Wonders of the World.' },
    { key: '4', text: 'The Colosseum in Rome could hold up to 80,000 spectators!' },
    { key: '5', text: 'The Taj Mahal was built as a mausoleum for Mumtaz Mahal.' },
];

const UserScreen = () => {
    const [options, setOptions] = useState(['Chats']);
    const [chats, setChats] = useState([]);
    const { token, handleLogout, setUserId, userId } = useContext(AuthContext);
    const navigation = useNavigation();

    const chooseOption = option => {
        if (options.includes(option)) {
            setOptions(options.filter(c => c !== option));
        } else {
            setOptions([...options, option]);
        }
    };

    const logout = async () => {
        await handleLogout();
        navigation.replace('Login');
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

    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('authToken');
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.userId);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (userId) {
            getUser();
        }
    }, [userId]);

    const renderItem = ({ item }) => (
        <View style={styles.sliderItem}>
            <Image source={item.image} style={styles.sliderImage} />
        </View>
    );

    const renderFactItem = ({ item }) => (
        <View style={styles.factItem}>
            <Text style={styles.factText}>{item.text}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={logout}>
                    <Image
                        style={styles.profileImage}
                        source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFVTYn7rHyFhzG_P0J9gOHT_C80OhNOBtGA&s',
                        }}
                    />
                </Pressable>
                <Text style={styles.headerText}>Alert Screen</Text>
                <View style={styles.iconContainer}>
                    
                    <MaterialIcons
                        onPress={() => navigation.navigate('People')}
                        name="person-outline"
                        size={26}
                        color="black"
                    />
                </View>
            </View>

            {/* Slider Component for Cultural Heritage Images */}
            <View style={styles.sliderContainer}>
                <AppIntroSlider
                    renderItem={renderItem}
                    data={culturalHeritageImages}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}
                    showSkipButton={false}
                    bottomButton={false}
                />
            </View>

            {/* Options and Chats */}
            <View style={styles.optionContainer}>
                <Pressable onPress={() => chooseOption('Chats')} style={styles.option}>
                    <Text>Report a New Issue/Alert</Text>
                    <Entypo name="chevron-small-down" size={26} color="black" />
                </Pressable>

                <View>
                    {options.includes('Chats') &&
                        (chats.length > 0 ? (
                            <View>
                                {chats.map(item => (
                                    <Chat item={item} key={item._id} />
                                ))}
                            </View>
                        ) : (
                            <View style={styles.noChatsContainer}>
                                <Text style={styles.noChatsText}>No Alerts sent yet</Text>
                                <Text style={styles.noChatsSubText}>
                                    Get started by Sending a request to our "Heritage Support Team"
                                </Text>
                            </View>
                        ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-between',
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    headerText: {
        fontSize: 15,
        fontWeight: '500',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    sliderContainer: {
        height: 350,
    },
    sliderItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    optionContainer: {
        padding: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    noChatsContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noChatsText: {
        textAlign: 'center',
        color: 'gray',
    },
    noChatsSubText: {
        marginTop: 4,
        color: 'gray',
    },
    dotStyle: {
        backgroundColor: 'gray',
    },
    activeDotStyle: {
        backgroundColor: 'black',
    },
    factItem: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    factText: {
        textAlign: 'center',
        color: 'black',
    },
});

export default UserScreen;
