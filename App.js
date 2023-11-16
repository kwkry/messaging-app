import { StyleSheet, Text, View } from "react-native";
import Status from "./components/StatusBar";

export default function App() {
  return (
    <View style={styles.container}>
      <Status />
      <Text>I am Vince Kurt</Text>
    </View>
  );
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
