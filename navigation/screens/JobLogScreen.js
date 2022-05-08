import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../../App';

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

import { getAllJobs } from '../../api';

export const JobLogScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  // global user context
  const user = useContext(AuthContext);
  // global user context

  const [userJobs, setUserJobs] = useState([]);

  const array = [1, 2, 3, 4, 5];

  React.useEffect(() => {
    getAllJobs().then(data => {
      setUserJobs(
        data.filter(job => {
          if (job.user_id === user._id) {
            return job;
          }
        }),
      );
    });
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionHeading}>My Jobs</Text>
        </View>

        <View style={styles.summaryList}>
          <View style={styles.topSummaryRow}>
            <View style={styles.todoBullet}></View>
            <View style={styles.BulletDetails}>
              <Text style={styles.BulletText}>Open Jobs</Text>
              <View style={styles.BulletValues}>
                <Text style={styles.BulletNumber}>1</Text>
                <Text style={styles.BulletText}>job(s)</Text>
              </View>
            </View>
          </View>

          <View style={styles.topSummaryRow}>
            <View style={styles.todoBullet}></View>
            <View style={styles.BulletDetails}>
              <Text style={styles.BulletText}>In Progress </Text>
              <View style={styles.BulletValues}>
                <Text style={styles.BulletNumber}>1</Text>
                <Text style={styles.BulletText}>job(s)</Text>
              </View>
            </View>
          </View>

          <View style={styles.topSummaryRow}>
            <View style={styles.todoBullet}></View>
            <View style={styles.BulletDetails}>
              <Text style={styles.BulletText}>Completed</Text>
              <View style={styles.BulletValues}>
                <Text style={styles.BulletNumber}>1</Text>
                <Text style={styles.BulletText}>job(s)</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.jobCardRow}>
          {array.map(array => {
            return (
              <ScrollView horizontal={true} overflow={true}>
                <View style={styles.jobCard}>
                  <Text style={styles.cardHeading}>Job Log Screen</Text>
                </View>
              </ScrollView>
            );
          })}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: '#CDDCEE',
    alignItems: 'center',
    paddingTop: 30,
    // justifyContent: 'center',
  },

  sectionTitle: {
    // backgroundColor: 'grey',
    width: Dimensions.get('window').width - 60,
    height: 35,
    justifyContent: 'center',
    // paddingHorizontal: 10,
  },

  sectionHeading: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
  },

  jobCardRow: {
    width: Dimensions.get('window').width,
    height: 'auto',
    flexDirection: 'row',
    // backgroundColor: 'pink',
    alignSelf: 'flex-start',
  },

  jobCard: {
    backgroundColor: '#FFEDDF',
    width: Dimensions.get('window').width * 0.7,
    height: 220,
    marginVertical: 10,
    marginLeft: 30,
    padding: 10,
    borderRadius: 15,
  },

  BulletText: {
    fontFamily: 'Inter_700Bold',
    paddingLeft: 10,
  },
  BulletValues: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  BulletNumber: {
    fontFamily: 'Inter_900Black',
    fontSize: 20,
    paddingLeft: 10,
  },
  BulletDetails: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  cardHeading: {
    fontFamily: 'Inter_700Bold',
  },

  summaryList: {
    width: Dimensions.get('window').width - 60,
    height: 'auto',
    padding: 10,
    borderRadius: 15,
  },

  topSummaryRow: {
    marginVertical: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  todoBullet: {
    backgroundColor: '#FEC899',
    width: 50,
    height: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  textInput: {
    borderWidth: 2,
    borderColor: '#000',
    width: '80%',
    height: '25%',
    marginVertical: 15,
    paddingTop: 10,
    padding: 10,
    borderRadius: 15,
  },
});
