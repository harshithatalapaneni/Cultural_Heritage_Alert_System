import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Import local images
import image1 from '../images/arti1.jpg';
import image2 from '../images/arti2.jpeg';
import image3 from '../images/arti3.webp';
import image4 from '../images/arti4.webp';
import image5 from '../images/arti5.jpg';
import image6 from '../images/arti6.jpg';
// import image8 from '../images/arti8.avif';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const artifacts = [
    // Local Monuments
    {
      id: '1',
      name: 'Historical Fortress',
      image: image1, // Use the imported local image
      description: 'A stone fortress built in the 12th century to protect against invasions.',
    },
    {
      id: '2',
      name: 'Ancient Temple',
      image: image2, // Use the imported local image
      description: 'A temple dedicated to a local deity, showcasing intricate carvings and architecture.',
    },
    // Cultural Symbols
    {
      id: '3',
      name: 'Traditional Musical Instrument',
      image: image3, // Use the imported local image
      description: 'A handmade instrument used in local festivals and rituals.',
    },
    {
      id: '4',
      name: 'Folklore Masks',
      image: image4, // Use the imported local image
      description: 'Masks used in traditional dances that represent different characters from local legends.',
    },
    // Craftsmanship
    {
      id: '5',
      name: 'Handwoven Tapestry',
      image: image5, // Use the imported local image
      description: 'A tapestry that tells a story through its designs, woven by local artisans.',
    },
    {
      id: '6',
      name: 'Ceramic Pottery',
      image: image6, // Use the imported local image
      description: 'Pottery that reflects the unique styles and techniques of the region’s artisans.',
    },
    // Restoration Tools
 
    // Historic Documents
    // {
    //   id: '8',
    //   name: 'Ancient Scrolls',
    //   image: image8, // Use the imported local image
    //   description: 'Manuscripts that contain historical records or significant events in the region\'s history.',
    // },
  ];

  const funFacts = [
    "Did you know that the Great Wall of China is not a single continuous wall but a series of walls built by different dynasties over centuries?",
    "The Pyramids of Giza were originally covered in casing stones made of highly polished Tura limestone, making them shine like a 'gem' in the desert sun.",
    "According to local legend, the ancient fortress was built by a king who wanted to protect his kingdom from dragon attacks!",
    "Many heritage sites are at risk due to climate change, which is causing rising sea levels and increased weathering.",
    "In many cultures, local communities play a crucial role in the preservation of heritage sites by participating in restoration and conservation efforts.",
    "The Colosseum in Rome could hold up to 80,000 spectators and hosted gladiatorial contests, mock sea battles, and even animal hunts.",
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % funFacts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={{
              uri: '',
            }}
          />
          <Text style={styles.userName}>Cultural Heritage Explorer</Text>
        </View>

        <Text style={styles.sectionTitle}>Cultural Artifacts</Text>
        <View style={styles.artifactContainer}>
          {artifacts.map((artifact) => (
            <View key={artifact.id} style={styles.artifactCard}>
              <Image style={styles.artifactImage} source={artifact.image} />
              <Text style={styles.artifactName}>{artifact.name}</Text>
              <Text style={styles.artifactDescription}>{artifact.description}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Fun Facts</Text>
        <View style={styles.funFactContainer}>
          <Text style={styles.funFact}>- {funFacts[currentFactIndex]}</Text>
        </View>

        <Pressable style={styles.button} onPress={() => navigation.navigate('User')}>
          <Text style={styles.buttonText}>Report a Monument</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  artifactContainer: {
    width: '100%',
    marginBottom: 20,
  },
  artifactCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
    width: '100%',
  },
  artifactImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  artifactName: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  artifactDescription: {
    color: 'gray',
  },
  funFactContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#D3D5FD',
    borderRadius: 5,
  },
  funFact: {
    marginVertical: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6D67E4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
