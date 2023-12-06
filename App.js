import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Alert,
  BackHandler,
  ImageBackground,
} from "react-native";
import * as Location from "expo-location";

import Status from "./components/StatusBar";
import MessageList from "./components/MessageList";
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from "./utils/MessageUtils";
import Toolbar from "./components/ToolBar";

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage(
        "https://st3.depositphotos.com/1064024/14272/i/450/depositphotos_142722813-stock-photo-heart-love-tree.jpg"
      ),
      createTextMessage("I love you"),
      createTextMessage("Hello"),
      createLocationMessage({
        latitude: 14.626563646690661,
        longitude: 121.06247853455515,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
  };

  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case "text":
        Alert.alert(
          "Delete message?",
          "Are you sure you want to permanently delete this message?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => this.handleDeleteMessage(item.id),
            },
          ]
        );
        break;

      case "image":
        this.setState({ fullscreenImageId: id });
        break;

      default:
        break;
    }
  };

  handleDeleteMessage = (id) => {
    this.setState((state) => ({
      messages: state.messages.filter((message) => message.id !== id),
    }));
  };

  handlePressToolbarCamera = () => {
    // ...
  };

  handlePressToolbarLocation = () => {
    const { messages } = this.state;
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition((position) => {
      const {
        coords: { latitude, longitude },
      } = position;
      this.setState({
        messages: [
          createLocationMessage({
            latitude,
            longitude,
          }),
          ...messages,
        ],
      });
    });
  };

  handleChangeFocus = (isFocused) => {
    this.setState({ isInputFocused: isFocused });
  };

  handleSubmit = (text) => {
    const { messages } = this.state;
    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };

  renderMessageList = () => {
    return (
      <MessageList
        messages={this.state.messages}
        onPressMessage={this.handlePressMessage}
      />
    );
  };

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;
    if (!fullscreenImageId) return null;

    const image = messages.find((message) => message.id === fullscreenImageId);
    if (!image) return null;

    const { uri } = image;

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}
        underlayColor="transparent"
      >
        <Image
          style={styles.fullscreenImage}
          source={{ uri }}
          resizeMode="contain"
        />
      </TouchableHighlight>
    );
  };

  renderToolbar = () => {
    const { isInputFocused } = this.state;

    return (
      <Toolbar
        isFocused={isInputFocused}
        onSubmit={this.handleSubmit}
        onChangeFocus={this.handleChangeFocus}
        onPressCamera={this.handlePressToolbarCamera}
        onPressLocation={this.handlePressToolbarLocation}
      />
    );
  };

  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const { fullscreenImageId } = this.state;

        if (fullscreenImageId) {
          this.dismissFullscreenImage();
          return true;
        }
        return false;
      }
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    return (
      <ImageBackground
        source={{
          uri: "https://w0.peakpx.com/wallpaper/744/364/HD-wallpaper-whatsapp-message-beautiful-blue-colour-message-phone-whatsapp-messenger-whatsapp-thumbnail.jpg",
        }}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Status />
          {this.renderMessageList()}
          {this.renderFullscreenImage()}
          {this.renderToolbar()}
          {/* {this.renderInputMethodEditor()} */}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: "white",
  },
  fullscreenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    zIndex: 1000, // Ensure it covers other components
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
});
