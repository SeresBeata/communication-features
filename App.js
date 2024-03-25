import { StyleSheet, Text, View, Button } from 'react-native';

const App = () => {

  return (
    <View style={styles.container}>
      <Button title="Pick an image from the library" />
      <Button title="Take a photo" />
    </View>
  );
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
