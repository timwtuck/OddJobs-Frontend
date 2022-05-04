import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { getAllJobs } from '../api';

export const Map = () => {
  const [jobs, setJobs] = useState([]);

  const userLocation = { latitude: 53.8008, longitude: -1.5491 };

  useEffect(() => {
    getAllJobs().then(jobsFromApi => {
      setJobs(jobsFromApi);
    });
  }, []);

  const locations = jobs.map(({ title, location, _id }) => ({
    title,
    location,
    _id,
  }));

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      <Marker
        key={'user_id'}
        coordinate={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        title={'My location'}
      />
      {locations.map(location => {
        return (
          <Marker
            key={location._id}
            coordinate={{
              latitude: location.location.latitude,
              longitude: location.location.longitude,
            }}
            title={location.title}>
            <Text>🎩</Text>
          </Marker>
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
