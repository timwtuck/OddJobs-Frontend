import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import {
  Button,
  Dimensions,
  Image,
  Text,
  View,
  StyleSheet,
  Alert,
  Pressable,
  Switch,
  Systrace,
} from 'react-native';
import { getSingleJob } from '../../api';
import { deleteJob } from '../../api';
import {
  Cleaning,
  Delivery,
  DIY,
  Garden,
  Pets,
  Shopping,
} from '../../components/categoryImages';

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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const JobScreen = ({ route, navigation: { goBack } }) => {
  // global user context
  const user = useContext(AuthContext);
  // global user context

  const [currentJob, setCurrentJob] = useState({});
  const [currentCategory, setCurrentCategory] = useState('');
  const [jobStatus, setJobStatus] = useState(false);
  const { job_id } = route.params;
  const categories = {
    Cleaning: {
      icon: (
        <MaterialIcons
          style={styles.icon}
          name={'cleaning-services'}
          size={40}
        />
      ),
    },
    Delivery: {
      icon: (
        <MaterialCommunityIcons
          style={styles.icon}
          name={'truck-delivery-outline'}
          size={40}
        />
      ),
    },
    DIY: {
      icon: (
        <MaterialCommunityIcons style={styles.icon} name={'tools'} size={40} />
      ),
    },
    Garden: {
      icon: <MaterialIcons style={styles.icon} name={'grass'} size={40} />,
    },
    Pets: {
      icon: <MaterialIcons style={styles.icon} name={'pets'} size={40} />,
    },
    Shopping: {
      icon: (
        <MaterialCommunityIcons
          style={styles.icon}
          name={'shopping-outline'}
          size={40}
        />
      ),
    },
    Other: {
      icon: (
        <MaterialCommunityIcons
          style={styles.icon}
          name={'dots-horizontal'}
          size={40}
        />
      ),
    },
  };

  useEffect(async () => {
    const jobFromApi = await getSingleJob(job_id);

    setCurrentJob(jobFromApi);
    setCurrentCategory(jobFromApi.category);
    setJobStatus(jobFromApi.status);
  }, [job_id]);

  const showConfirmDialog = () => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to delete this job?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            deleteJob(job_id).then(() => goBack()); // not working as expected
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  let source = '';
  if (currentCategory === 'Cleaning')
    source = require(`../../assets/Cleaning.png`);
  if (currentCategory === 'Delivery')
    source = require(`../../assets/Delivery.png`);
  if (currentCategory === 'DIY') source = require(`../../assets/DIY.png`);
  if (currentCategory === 'Garden') source = require(`../../assets/Garden.png`);
  if (currentCategory === 'Pets') source = require(`../../assets/Pets.png`);
  if (currentCategory === 'Shopping')
    source = require(`../../assets/Shopping.png`);
  if (currentCategory === 'Other') source = require(`../../assets/logo.png`);

  let iconName;
  let statusText;

  if (jobStatus) {
    iconName = <Ionicons name="lock-closed-outline" size={40} />;
    statusText = 'Open job';
  }

  if (!jobStatus) {
    iconName = <Ionicons name="lock-open-outline" size={40} />;
    statusText = 'Close job';
  }

  if (currentCategory === '' || currentCategory === undefined)
    return <Text>...loading</Text>;

  const toggleSwitch = () => setJobStatus(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.categoryImage} source={source} />
      </View>
      <View style={styles.jobHeadingRow}>
        <Text style={styles.jobHeading}>{currentJob.title}</Text>
        <View style={styles.editStyling}>
          <Text>edit</Text>
        </View>
      </View>
      <Text style={styles.jobDescription}>{currentJob.description}</Text>
      <View style={styles.jobStatusRow}>
        <View style={styles.statusCards}>
          {categories[currentCategory].icon}
        </View>
        <View style={styles.statusCards}>{iconName}</View>
        <View style={styles.statusCards}>
          <Text style={{ fontSize: 20 }}>£{currentJob.price.toFixed(2)}</Text>
        </View>
        <View style={styles.statusCards}>
          <Ionicons name={'chatbubbles-outline'} size={40} />
        </View>
      </View>
      <View style={styles.deleteButtonRow}>
        {currentJob.user_id === user._id && (
          <>
            <View style={styles.toggleStatus}>
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  color: '#000000',
                  fontSize: 16,
                  padding: 5,
                }}>
                {statusText}
              </Text>
              <Switch
                trackColor={{ false: '#767577', true: '#FFEDDF' }}
                thumbColor={jobStatus ? '#FEC899' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={jobStatus}
              />
            </View>
            <Pressable
              style={styles.deleteJob}
              onPress={() => showConfirmDialog()}>
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  color: '#fff',
                  fontSize: 16,
                }}>
                Delete this Job
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //---- SCREEN BASE STYLING ----//
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },

  //---- CONTAINER STYLING ----//
  imageContainer: {
    // backgroundColor: 'grey',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    marginVertical: 10,
    padding: 10,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  categoryImage: {
    flex: 0.85,
    width: Dimensions.get('window').height * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    width: '95%',
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 10,
  },

  statusCards: {
    backgroundColor: '#FEC899',
    marginVertical: 10,
    marginHorizontal: 5,
    flexBasis: 80,
    height: 80,
    flexShrink: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //---- ROW STYLING ----//
  jobHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobStatusRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },

  deleteButtonRow: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },

  //---- TEXT STYLING ----//
  jobHeading: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 30,
    margin: 20,
  },
  jobCategory: {
    fontSize: 15,
    width: '80%',
    padding: 10,
  },
  jobDescription: {
    fontSize: 20,
    fontFamily: 'Inter_300Light',
    width: Dimensions.get('window').width * 0.8,
    marginHorizontal: 20,
  },

  jobPrice: {
    fontSize: 12,
    width: '80%',
    padding: 10,
  },

  //---- BUTTON STYLING ----//
  editStyling: {
    width: 70,
    height: 40,
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 17,
  },

  deleteJob: {
    width: '70%',
    height: 40,
    borderWidth: 3,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 17,
  },

  toggleStatus: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
  },
});
