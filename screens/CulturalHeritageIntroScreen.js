import { View, Text, Image, StyleSheet } from "react-native";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { LinearGradient } from "expo-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import { culturalHeritageData } from "../constants/constants"; // Update to your cultural heritage data
import { commonStyles } from "../styles/common/common.styles";
import { router } from "expo-router";
import { styles } from "../styles/onboarding/onbord";
import * as Font from 'expo-font';


const CulturalHeritageIntroScreen= ()=> {
  let [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null; // Render nothing until fonts are loaded
  }

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9", "#E8EEF9"]}
      style={{ flex: 1, paddingHorizontal: 16 }}
    >
      <View style={{ marginTop: 80 }}>
        <Image
          source={item.image}
          style={{ alignSelf: "center", marginBottom: 30, marginTop: 60 }}
        />
        <Text style={[commonStyles.title, { fontFamily: "Nunito_400Regular" }]}>
          {item.title}
        </Text>
        <View style={{ marginTop: 15 }}>
          <Text
            style={[
              commonStyles.description,
              { fontFamily: "Nunito_400Regular" },
            ]}
          >
            {item.description}
          </Text>
          {item.sortDescription && (
            <Text
              style={[
                commonStyles.description,
                { fontFamily: "Nunito_400Regular" },
              ]}
            >
              {item.sortDescription}
            </Text>
          )}
          {item.sortDescription2 && (
            <Text
              style={[
                commonStyles.description,
                { fontFamily: "Nunito_400Regular" },
              ]}
            >
              {item.sortDescription2}
            </Text>
          )}
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={culturalHeritageData} // Update to your cultural heritage data
      onDone={() => {
        router.push("/login"); // Navigate to login after finishing the intro
      }}
      onSkip={() => {
        router.push("/login"); // Skip to login
      }}
      renderNextButton={() => (
        <View style={[styles.welcomeButtonStyle]}>
          <Text
            style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}
          >
            Next
          </Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.welcomeButtonStyle}>
          <Text
            style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}
          >
            Done
          </Text>
        </View>
      )}
      showSkipButton={false}
      dotStyle={commonStyles.dotStyle}
      bottomButton={true}
      activeDotStyle={commonStyles.activeDotStyle}
    />
  );
}

// Styles for your component can be adjusted here
// const styles = StyleSheet.create({
//   // Add any additional styles here if needed
// });

export default CulturalHeritageIntroScreen;