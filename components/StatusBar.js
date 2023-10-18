import {
  Platform,
  StyleSheet,
  Text,
  View,
  NetInfo,
  Platform,
  StatusBar,
} from "react-native";
import { Constants } from "expo";
import React from "react";

export default class Status extends React.Component {
  state = {
    info: "none",
  };

  render() {
    const { info } = this.state;
    const isConnected = info !== "none";
    const backgroundColor = isConnected ? "white" : "red";

    if (Platform.OS === "ios") {
      return <View style={[styles.status, { backgroundColor }]}></View>;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  statu: {
    zIndex: 1,
    height: statusHeight,
  },
});
