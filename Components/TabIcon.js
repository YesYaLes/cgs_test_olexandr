import { View, Image } from "react-native";
import React from "react";

const TabIcon = (props) => {
  return (
    <View>
      <Image source={props.img} style={{ width: 30, height: 30 }} />
    </View>
  );
};

export default TabIcon;
