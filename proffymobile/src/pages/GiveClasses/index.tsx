import React from "react";
import { View, ImageBackground, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import giveClassesBgImage from "../../assets/images/give-classes-background.png";

function GiveClasses() {
  const { goBack } = useNavigation();

  function toBackScreen() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={giveClassesBgImage}
        resizeMode="contain"
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um proffy?</Text>
        <Text style={styles.description}>
          Para começar, cadastre-se como professor na nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton onPress={toBackScreen} style={styles.okButton}>
        <Text style={styles.okButtonText}>Ok</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
