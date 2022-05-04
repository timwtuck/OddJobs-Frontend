import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

export const Map = () => {
  return (
    <MapView
      style={styles.map}
      region={{
        latitude: 53.8008,
        longitude: -1.5491,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
