import { StyleSheet, Text, View } from "react-native";
import Status from "./components/StatusBar";
import MessageList from "./components/Messagelist";
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from "./utils/MessageUtils";
import React from "react";

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage("https://unsplash.it/300/300"),
      createTextMessage("World"),
      createTextMessage("Hello"),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
  };

  handlePressMessage = () => {};

  render() {
    return (
      <View style={styles.content}>
        <MessageList
          messages={this.state.messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: "white",
  },
  toolbar: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
  },
});
