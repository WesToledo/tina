import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { TopNavigation, Avatar } from "@ui-kitten/components";

var height = Dimensions.get("window").height;

const MainHeader = () => {
  return (
    <TopNavigation
      alignment="left"
      accessoryLeft={() => (
        <Avatar size="large" source={require("src/assets/LOGO.png")} />
      )}
    />
  );
};

export default MainHeader;
