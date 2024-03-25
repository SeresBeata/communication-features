import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useState } from 'react';

//import ImagePicker to allow users to select a photo from their library or take a new photo.
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  //create state variable
  const [image, setImage] = useState(null);

  //create async function to pick an image from the library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null);
    }
  };

  //create async function to take a photo
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from the library" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} />
      {/* Use logical AND ( && ) operator to display the image as an Image element, if there is a picked image, otherwise display nothing */}
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200, borderRadius: 5 }}
        />
      )}
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
