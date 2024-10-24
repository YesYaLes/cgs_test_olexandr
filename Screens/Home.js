import React, { useState, useEffect } from "react";
import { View, Button, Image, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserImage } from "../Hooks/useUserImage";

const Home = () => {
  const [userImage, setUserImage] = useUserImage();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setUserImage(uri);
      saveImage(uri);
    }
  };

  const saveImage = async (uri) => {
    try {
      await AsyncStorage.setItem("savedImage", uri);
    } catch (error) {
      console.log("Error saving image URI", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {userImage ? (
        <Image source={{ uri: userImage }} style={styles.image} />
      ) : (
        <Text>No image selected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default Home;
