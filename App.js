import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useState } from 'react';

//import ImagePicker to allow users to select a photo from their library or take a new photo.
import * as ImagePicker from 'expo-image-picker';

//import MediaLibrary to save Photos captured using a device’s camera with the ImagePicker
import * as MediaLibrary from 'expo-media-library';

//import Location to retrieve the user’s location
import * as Location from 'expo-location';

//import MapView to display the location data in a map
import MapView from 'react-native-maps';

const App = () => {
  //create state variable
  const [image, setImage] = useState(null);
  //define a state,that will hold the location data
  const [location, setLocation] = useState(null);

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

      if (!result.canceled) {
        let mediaLibraryPermissions =
          await MediaLibrary.requestPermissionsAsync();

        if (mediaLibraryPermissions?.granted)
          await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);

        setImage(result.assets[0]);
      } else setImage(null);
    }
  };

  //create async function to get coordinates of the user’s location
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } else {
      Alert.alert("Permissions to read location aren't granted");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from the library" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} />
      <Button title="Get my location" onPress={getLocation} />
      {/* Use logical AND ( && ) operator to display the image as an Image element, if there is a picked image, otherwise display nothing */}
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200, borderRadius: 5 }}
        />
      )}
      {/* Use logical AND ( && ) operator to display the user’s current location as a MapView element, if there is a location data, otherwise display nothing */}
      {location && (
        <MapView
          style={{ width: 300, height: 200 }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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
