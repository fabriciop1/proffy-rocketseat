import React, { useState } from "react";
import { Image, View, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import api from "../../services/api";

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorite: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorite }) => {
  const [isFavorite, setFavorite] = useState(favorite);

  function linkToWhatsapp() {
    api.post("connections", {
      user_id: teacher.id,
    });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function toggleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");

    let favArray = [];

    if (favorites) {
      favArray = JSON.parse(favorites);
    }

    if (isFavorite) {
      const favIndex = favArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });

      favArray.splice(favIndex, 1);

      setFavorite(false);
    } else {
      favArray.push(teacher);

      setFavorite(true);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorite ? styles.favorite : {}]}
            onPress={toggleFavorite}
          >
            {isFavorite ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton onPress={linkToWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
