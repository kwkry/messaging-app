import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Alert,
  BackHandler,
  ImageBackground,
} from "react-native";
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
    fullscreenImageId: null,
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

  renderMessageList = () => {
    return (
      <View>
        <MessageList
          messages={this.state.messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
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
          {/* {this.renderToolbar()}
        {this.renderInputMethodEditor()} */}
          {this.renderFullscreenImage()}
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
  toolbar: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
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
