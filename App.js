import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';

//import ImagePicker to allow users to select a photo from their library or take a new photo.
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  //create state variable
  const [image, setImage] = useState(null);

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
