import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { convertFromPostcode, getAllJobs, getSingleUser } from '../api';
import { useContext } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { REACT_APP_API_KEY } from '@env';

export const Map = () => {
  const [jobs, setJobs] = useState([]);
  const [postcode, setPostcode] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState([]);

  // global user context
  const user = useContext(AuthContext);
  // console.log(user);
  // global user context

  //get user postcode and convert to valid address with '%20' delimited spaces
  useEffect(() => {
    getSingleUser(user._id).then(userFromApi => {
      setPostcode(userFromApi.postCode);
    });
  }, [user._id]);

  useEffect(() => {
    getAllJobs().then(jobsFromApi => {
      setJobs(jobsFromApi);
    });
  }, []);

  console.log(REACT_APP_API_KEY);
  //request to geocodeAPI to convert postcode to lat/long
  useEffect(() => {
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: postcode,
          key: REACT_APP_API_KEY,
        },
      })
      .then(response => {
        setUserLocation(response.data.results[0].geometry.location, 'axios');
      });
  }, []);

  console.log(jobs, 'jobs');

  const locations = jobs.map(({ title, postcode, _id }) => ({
    title,
    postcode,
    _id,
  }));

  console.log(locations, 'locations');

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      <Marker
        key={'user_id'}
        coordinate={{
          latitude: userLocation.lat,
          longitude: userLocation.lng,
        }}
        title={'My location'}
      />
      {locations.map(location => {
        return (
          <Marker
            key={location._id}
            coordinate={{
              latitude: location.postcode.lat,
              longitude: location.postcode.lng,
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
