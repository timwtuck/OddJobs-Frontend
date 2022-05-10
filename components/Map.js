import MapView from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { getAllJobs, getSingleUser } from '../api';
import { useContext } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { REACT_APP_API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';

export const Map = () => {
  const [jobInfo, setJobInfo] = useState([]);
  const [userLocation, setUserLocation] = useState('');
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const navigation = useNavigation();
  // global user context
  const user = useContext(AuthContext);
  // global user context

  //get user postcode and convert to valid address with '%20' delimited spaces
  useEffect(() => {
    Promise.all([getSingleUser(user._id), getAllJobs()]).then(async values => {
      // [userValues, [array of all jobs]]
      setJobInfo(
        values[1].map(({ title, postcode, _id, category }) => ({
          title,
          postcode,
          _id,
          category,
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
            <Callout tooltip>
              <View style={styles.bubble}>
                <Text style={styles.name}>🎩</Text>
                <Text style={styles.title}>{job.title}</Text>
                <Text style={styles.category}>{job.category}</Text>
                <Button
                  title="more info"
                  onPress={() =>
                    navigation.navigate('JobScreen', {
                      job_id: job._id,
                    })
                  }
                />
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </Callout>
          </Marker>
        ))}
      </MapView>
    );
  }
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.4,
  },
  bubble: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
});
