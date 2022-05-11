import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostJobScreen } from './PostJobScreen';
import { SeeMoreJobsScreen } from './SeeMoreJobsScreen';
import { Map } from '../../components/Map';
import { AutoFocus } from 'expo-camera';

// Custom Fonts
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

const HomeStack = createNativeStackNavigator();

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapBackground}>
        <Map />
      </View>
      <Pressable
        style={styles.postJob}
        onPressOut={() => navigation.navigate(PostJobScreen)}>
        <View style={styles.postAccent}></View>
        <View style={styles.cardGroup}>
          <Text style={styles.cardHeader}>Post a Job</Text>
          <Text style={styles.cardSubText}>
            Getting odd jobs done has never been this easy!
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.seeJobs}
        onPressOut={() => navigation.navigate(SeeMoreJobsScreen)}>
        <View style={styles.seeAccent}></View>
        <View style={styles.cardGroup}>
          <Text style={styles.cardHeader}>See More Jobs</Text>
          <Text style={styles.cardSubText}>
            Feeling handy? Join the community and complete an OddJob.
          </Text>
        </View>
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
    marginBottom: 30,
    alignItems: 'center',
  },
  postJob: {
    flexDirection: 'row',
    backgroundColor: '#FFEDDF',
    borderRadius: 15,
    width: '90%',
    height: 130,
    marginBottom: 20,
    alignItems: 'center',
    // justifyContent: 'center',
  },

  postAccent: {
    width: 10,
    height: '100%',
    backgroundColor: '#FEC899',
    alignItems: 'flex-start',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },

  seeAccent: {
    width: 10,
    height: '100%',
    backgroundColor: '#FEC899',
    alignItems: 'flex-start',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },

  seeJobs: {
    flexDirection: 'row',
    // justifyContent: 'center',
    backgroundColor: '#FFEDDF50',
    borderRadius: 15,
    width: '90%',
    height: 130,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardGroup: {
    flex: 1,
    backgroundColor: 'pink',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    marginLeft: 15,
  },
  cardHeader: {
    backgroundColor: 'pink',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    marginVertical: 5,
    // width: '100%',
  },
  subtextWrap: {
    flex: 1,
    flexDirection: 'row',
  },

  cardSubText: {
    fontSize: 12,
    flex: 1,

    // width: 1,
    // flexWrap: 'wrap',
  },
});
