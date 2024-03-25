import { StyleSheet, Text, View } from 'react-native';

const App = () => {
  return <View style={styles.container}>Hello World!</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
