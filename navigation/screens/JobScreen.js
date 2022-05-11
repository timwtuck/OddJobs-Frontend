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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          style={styles.categoryImage}
          source={require('../../assets/logo.png')}
        /> */}
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
          <Text>Category</Text>
        </View>
        <View style={styles.statusCards}>
          <Text>Status - in progress or complete</Text>
        </View>
        <View style={styles.statusCards}>
          <Text>Token - can edit</Text>
        </View>
        <View style={styles.statusCards}>
          <Text>Chat - toggle visibility</Text>
        </View>
      </View>
      <View style={styles.deleteButtonRow}>
        {currentJob.user_id === user._id && (
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
        )}
      </View>
    </View>

    // <View style={styles.jobContainer}>
    //   {currentJob.category === 'Cleaning' && <Cleaning />}
    //   {currentJob.category === 'Delivery' && <Delivery />}
    //   {currentJob.category === 'DIY' && <DIY />}
    //   {currentJob.category === 'Garden' && <Garden />}
    //   {currentJob.category === 'Pets' && <Pets />}
    //   {currentJob.category === 'Shopping' && <Shopping />}
    //   {currentJob.category === 'Other' && (
    //     <View style={styles.imageContainer}>
    //       <Image
    //         style={styles.categoryImage}
    //         source={require('../../assets/logo.png')}
    //       />
    //     </View>
    //   )}
    //   {/* </View> */}
    //   <View style={styles.imageContainer}>
    //     <Text style={styles.jobHeading}>{currentJob.title}</Text>
    //     <Text style={styles.jobCategory}>{currentJob.category}</Text>
    //     <Text style={styles.jobDescription}>{currentJob.description}</Text>
    //     <Text style={styles.jobPrice}>{currentJob.price}</Text>
    //   </View>
    //   {/* {currentJob.user_id === user._id && (
    //     <Button title="🗒" onPress={onPressLearnMore} />
    //   )} */}
    //   {currentJob.user_id === user._id && (
    //     <Button title="🗑" onPress={() => showConfirmDialog()} />
    //   )}
    // </View>
  );
};

const styles = StyleSheet.create({
  //---- SCREEN BASE STYLING ----//
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },

  //---- CONTAINER STYLING ----//
  imageContainer: {
    backgroundColor: 'grey',
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
    // marginTop: 5,
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
  },

  //---- ROW STYLING ----//
  jobHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  jobStatusRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
    alignItems: 'center',
    height: 100,
  },

  deleteButtonRow: {
    flexDirection: 'row',
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
});
