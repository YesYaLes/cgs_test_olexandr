import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserImage = () => {
  const [imageUri, setImageUri] = useState(null);

  const loadImage = async () => {
    try {
      const savedUri = await AsyncStorage.getItem("savedImage");
      if (savedUri) {
        setImageUri(savedUri);
      }
    } catch (error) {
      console.log("Error loading image URI", error);
    }
  };

  useEffect(() => {
    loadImage();
  }, []);

  return [imageUri, setImageUri];
};
