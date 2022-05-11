import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostJobScreen } from './PostJobScreen';
import { SeeMoreJobsScreen } from './SeeMoreJobsScreen';
import { Map } from '../../components/Map';

const HomeStack = createNativeStackNavigator();

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapBackground}>
        {/* <Map /> */}
        <Text>Map Render</Text>
      </View>
      <Pressable
        style={styles.postJob}
        onPressOut={() => navigation.navigate(PostJobScreen)}>
        {/* <View style={styles.postJob}> */}
        <Text style={styles.cardHeader}>Post a Job</Text>
        <Text style={styles.cardSubText}>List an odd job today</Text>
        {/* </View> */}
      </Pressable>
      <Pressable
        style={styles.seeJobs}
        onPressOut={() => navigation.navigate(SeeMoreJobsScreen)}>
        {/* <View style={styles.seeJobs}> */}
        <Text style={styles.cardHeader}>See More Jobs</Text>
        <Text style={styles.cardSubText}>List an odd job today</Text>
        {/* </View> */}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 20,
  },

  mapBackground: {
    width: '90%',
    height: '48%',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  postJob: {
    justifyContent: 'center',
    backgroundColor: '#c7f9cc',
    borderRadius: 15,
    width: '90%',
    height: 130,
    marginBottom: 20,
    alignItems: 'center',
  },
  seeJobs: {
    justifyContent: 'center',
    backgroundColor: '#c7f9cc',
    borderRadius: 15,
    width: '90%',
    height: 130,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardHeader: {
    fontStyle: 'normal',
    fontSize: 16,
    // margin: '.4rem,
  },
  cardSubText: {
    fontSize: 12,
  },
});
