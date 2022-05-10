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

export const JobScreen = ({ route, navigation: { goBack } }) => {
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

  return (
    <View style={styles.jobContainer}>
      {currentJob.category === 'Cleaning' && <Cleaning />}
      {currentJob.category === 'Delivery' && <Delivery />}
      {currentJob.category === 'DIY' && <DIY />}
      {currentJob.category === 'Garden' && <Garden />}
      {currentJob.category === 'Pets' && <Pets />}
      {currentJob.category === 'Shopping' && <Shopping />}
      {currentJob.category === 'Other' && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.categoryImage}
            source={require('../../assets/logo.png')}
          />
        </View>
      )}
      {/* </View> */}
      <View style={styles.imageContainer}>
        <Text style={styles.jobHeading}>{currentJob.title}</Text>
        <Text style={styles.jobCategory}>{currentJob.category}</Text>
        <Text style={styles.jobDescription}>{currentJob.description}</Text>
        <Text style={styles.jobPrice}>{currentJob.price}</Text>
      </View>
      {/* {currentJob.user_id === user._id && (
        <Button title="🗒" onPress={onPressLearnMore} />
      )} */}
      {currentJob.user_id === user._id && (
        <Button title="🗑" onPress={() => showConfirmDialog()} />
      )}
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
  header: {
    fontSize: 20,
  },
  imageContainer: {
    backgroundColor: '#FFEDDF',
    width: Dimensions.get('window').width * 0.9,
    height: 220,
    marginVertical: 10,
    padding: 10,
    borderRadius: 15,
  },
  categoryImage: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    width: '95%',

    backgroundColor: 'white',
    marginTop: 5,

    marginHorizontal: 5,
    borderRadius: 10,
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
