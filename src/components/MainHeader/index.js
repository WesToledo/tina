import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { TopNavigation, Avatar } from "@ui-kitten/components";

var height = Dimensions.get("window").height;

const MainHeader = () => {
  return (
    <TopNavigation
      title="TINA"
      alignment="left"
      accessoryRight={() => (
        <Avatar size="large" source={require("src/assets/tina.jpeg")} />
      )}
    />
  );
};

export default MainHeader;
