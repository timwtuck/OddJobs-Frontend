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
      {currentJob.category === 'DIY' && <Image />}
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
    backgroundColor: 'pink',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
  },
  jobHeading: {
    backgroundColor: 'blue',
    fontSize: 20,
    width: '80%',
  },
  jobCategory: {
    backgroundColor: 'yellow',
    fontSize: 15,
    width: '80%',
  },
  jobDescription: {
    backgroundColor: 'green',
    fontSize: 15,
    width: '80%',
  },
  jobPrice: {
    backgroundColor: 'red',
    fontSize: 12,
    width: '80%',
  },
});
