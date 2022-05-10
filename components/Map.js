import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { getAllJobs, getSingleUser } from '../api';
import { useContext } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { REACT_APP_API_KEY } from '@env';

export const Map = () => {
  const [jobs, setJobs] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);
  const [userLocation, setUserLocation] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState([]);
  // const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);

  // global user context
  const user = useContext(AuthContext);
  // global user context

  //get user postcode and convert to valid address with '%20' delimited spaces
  useEffect(() => {
    Promise.all([getSingleUser(user._id), getAllJobs()]).then(async values => {
      // [userValues, [array of all jobs]]
      setJobInfo(
        values[1].map(({ title, postcode, _id }) => ({
          title,
          postcode,
          _id,
        })),
      );
      const userPin = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${values[0].postCode
          .split(' ')
          .join('%20')}&key=${REACT_APP_API_KEY}`,
      );
      setUserLocation(userPin.data.results[0].geometry.location);
    });
  }, []);

  // useEffect(() => {
  //   getSingleUser(user._id) // done
  //     .then(userFromApi => {
  //       const userPostcode = userFromApi.postCode.split(' ').join('%20');
  //       return userPostcode;
  //     })
  //     .then(userPostcode => {
  //       axios
  //         .get(
  //           `https://maps.googleapis.com/maps/api/geocode/json?address=${userPostcode}&key=${REACT_APP_API_KEY}`,
  //         )
  //         .then(response => {
  //           setUserLocation(response.data.results[0].geometry.location);
  //         });
  //     });
  // }, [jobInfo]);

  //get jobs from database and extract minimal info required to render markers
  // useEffect(() => {
  //   getAllJobs() // done
  //     .then(jobsFromApi => {
  //       setJobs(jobsFromApi);
  //     })
  //     .then(
  //       setJobInfo(
  //         jobs.map(({ title, postcode, _id }) => ({
  //           title,
  //           postcode,
  //           _id,
  //         })),
  //       ),
  //       // setIsLoadingJobs(false),
  //     );
  // }, [jobInfo]);

  if (jobInfo.length === 0) {
    return <Text>...loading</Text>;
  } else if (jobInfo.length > 0) {
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
        {jobInfo.map(job => (
          <Marker
            key={job._id}
            coordinate={{
              latitude: job.postcode.lat,
              longitude: job.postcode.lng,
            }}
            title={job.title}>
            <Text>🎩</Text>
          </Marker>
        ))}
      </MapView>
    );
  }
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
