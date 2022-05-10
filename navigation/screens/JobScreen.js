import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { Button, Image, Text, View, StyleSheet } from 'react-native';
import { getSingleJob } from '../../api';

// // Custom Fonts
// import AppLoading from 'expo-app-loading';
// import {
//   useFonts,
//   Inter_100Thin,
//   Inter_200ExtraLight,
//   Inter_300Light,
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_600SemiBold,
//   Inter_700Bold,
//   Inter_800ExtraBold,
//   Inter_900Black,
// } from '@expo-google-fonts/inter';

export const JobScreen = ({ route, navigation }) => {
  // global user context
  const user = useContext(AuthContext);
  // global user context

  const [currentJob, setCurrentJob] = useState({});

  const { job_id } = route.params;

  useEffect(() => {
    getSingleJob(job_id).then(jobFromApi => {
      setCurrentJob(jobFromApi);
    });
  }, [job_id]);

  return (
    <View style={styles.jobContainer}>
      <View style={styles.imageContainer}>
        {currentJob.category === 'Cleaning' && (
          <Image
            style={styles.categoryImage}
            source={require('../../assets/Cleaning.png')}
          />
        )}
        {currentJob.category === 'Delivery' && (
          <Image
            style={styles.categoryImage}
            source={require('../../assets/Delivery.png')}
          />
        )}
        {currentJob.category === 'DIY' && (
          <Image
            style={styles.categoryImage}
            source={require('../../assets/DIY.png')}
          />
        )}
        {currentJob.category === 'Garden' && (
          <Image
            style={styles.categoryImage}
            source={require('../../assets/Garden.png')}
          />
        )}
        {/* {currentJob.category === 'Pets' && (
          <Image
            style={styles.categoryImage}
            source={require('../../assets/Pets.png')}
          />
        )} */}
        {currentJob.category === 'Shopping' && (
          <Image
            style={styles.categoryImage}
            source={require('../../assets/Shopping.png')}
          />
        )}
        {currentJob.category === 'Other' && (
          <Image
            style={styles.categoryImage}
            source={require('../../assets/logo.png')}
          />
        )}
      </View>

      <Text style={styles.jobHeading}>{currentJob.title}</Text>
      <Text style={styles.jobCategory}>{currentJob.category}</Text>
      <Text style={styles.jobDescription}>{currentJob.description}</Text>
      <Text style={styles.jobPrice}>{currentJob.price}</Text>
      {currentJob.user_id === user._id && <Button title="🗑" />}
    </View>
  );
};

const styles = StyleSheet.create({
  jobContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'flex-start',
    height: '20%',
  },
  header: {
    fontSize: 20,
  },
  categoryImage: {
    alignItems: 'center',
  },
  jobHeading: {
    fontSize: 30,
    width: '80%',
    padding: 10,
  },
  jobCategory: {
    fontSize: 15,
    width: '80%',
    padding: 10,
  },
  jobDescription: {
    fontSize: 15,
    width: '80%',
    padding: 10,
  },
  jobPrice: {
    fontSize: 12,
    width: '80%',
    padding: 10,
  },
});
