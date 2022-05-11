import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Switch,
  Image,
  Pressable,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
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
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const isFocused = useIsFocused();

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
  }, [isFocused]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionHeading}>Your Jobs</Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{ paddingRight: 5 }}>
              {isEnabled ? 'hide' : 'show'} completed
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <View style={styles.summaryList}>
          <View style={styles.topSummaryRow}>
            <View style={styles.todoBullet}></View>
            <View style={styles.BulletDetails}>
              <Text style={styles.BulletText}>Open Jobs</Text>
              <View style={styles.BulletValues}>
                <Text style={styles.BulletNumber}>{userJobs.length}</Text>
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
                <Text style={styles.BulletNumber}>16</Text>
                <Text style={styles.BulletText}>job(s)</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.jobCardRow}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {userJobs.map(job => {
              return (
                <Pressable
                  key={job._id}
                  onPressOut={() => {
                    navigation.navigate('JobScreen', { job_id: job._id });
                  }}>
                  <View style={styles.jobCard} key={job._id}>
                    <Image
                      style={styles.cardImg}
                      source={{
                        uri: `https://odd-jobs-backend.herokuapp.com/${job.productImage}`,
                      }}
                    />
                    <Text style={styles.cardHeading}>{job.title}</Text>
                    <Text style={styles.cardSubHeading}>Token</Text>
                    <Text style={styles.cardBody}>£{job.price}.00</Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
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

  sectionTitleRow: {
    // backgroundColor: 'pink',
    flexDirection: 'row',
    width: Dimensions.get('window').width - 60,
    height: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
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

  jobCardImg: {
    width: '50%',
    height: '50%',
    backgroundColor: 'white',
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 10,
  },

  cardImg: {
    // width: 50,
    // height: 200,
    resizeMode: 'stretch',
    width: '50%',
    height: '50%',
    backgroundColor: 'white',
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 10,
  },

  cardHeading: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    marginLeft: 7,
    marginTop: 10,
  },

  cardSubHeading: {
    fontFamily: 'Inter_500Medium',
    color: '#00000080',
    fontSize: 18,
    marginLeft: 7,
    marginTop: 3,
    marginBottom: 5,
  },

  cardBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    marginLeft: 7,
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
