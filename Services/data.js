import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveImage = async (uri) => {
  try {
    await AsyncStorage.setItem("savedImage", uri);
  } catch (error) {
    console.log("Error saving image URI", error);
  }
};
