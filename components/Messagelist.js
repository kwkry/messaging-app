import React from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MessageShape } from "../utils/MessageUtils";

const keyExtractor = (item) => item.id.toString();

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
  };

  static defaultProps = {
    onPressMessage: () => {},
  };

  renderMessageItem = ({ item }) => {
    const { onPressMessage } = this.props;
    return (
      <View key={item.id} style={styles.messageRow}>
        <TouchableOpacity onPress={() => onPressMessage(item)}>
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  renderMessageBody = ({ type, text, uri, coordinate }) => {
    switch (type) {
      case "text":
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );
      case "image":
        return <Image style={styles.image} source={{ uri }} />;
      case "location":
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinate,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04,
            }}
          >
            <Marker coordinate={coordinate} />
          </MapView>
        );
      default:
        return null;
    }
  };

  render() {
    const { messages } = this.props;
    return (
      <FlatList
        style={styles.container}
        inverted
        data={messages}
        renderItem={this.renderMessageItem}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps={"handled"}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible", //Prevents clipping on resize!
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 100,
    marginBottom: 10,
  },
  messageBubble: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  map: {
    width: 200,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
