import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    flex:1,
    backgroundColor:'white',
  },
  inputMethodEditor:{
    flex:1,
    backgroundColor:'white',
  },
  toolbar:{
    backgroundColor:'white',
    borderTopWidth:1,
    borderTopColor:'rgba(0,0,0,0.04)',
  },
});
