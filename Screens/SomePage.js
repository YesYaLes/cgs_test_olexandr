import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const SomePage = () => {
  const sheetRef = useRef();

  const snapPoints = ["10%", "80%"];

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const offset = useSharedValue(140);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 1750 }),
      -1,
      true
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          handleClosePress();
        }}
      >
        <Text style={styles.text}>Close Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          handleSnapPress(1);
        }}
      >
        <Text style={styles.text}>Open Sheet</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={{ position: "absolute", top: 10, color: "white" }}>
            Snap me!
          </Text>
          <Animated.View style={[styles.box, animatedStyles]}>
            <Text style={styles.text}>I`m moooving!</Text>
          </Animated.View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
  },
  btn: {
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#b58df1",
  },
  text: { color: "white" },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
    backgroundColor: "grey",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
  },
});

export default SomePage;
