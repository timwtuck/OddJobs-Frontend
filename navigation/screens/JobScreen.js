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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const JobScreen = ({ route, navigation: { goBack } }) => {
  // global user context
  const user = useContext(AuthContext);
  // global user context

  const [currentJob, setCurrentJob] = useState({});
  const [currentCategory, setCurrentCategory] = useState('');
  const { job_id } = route.params;
  const categories = {
    Cleaning: {
      icon: (
        <MaterialIcons
          style={styles.icon}
          name={'cleaning-services'}
          size={18}
        />
      ),
    },
    Delivery: {
      icon: (
        <MaterialCommunityIcons
          style={styles.icon}
          name={'truck-delivery-outline'}
          size={18}
        />
      ),
    },
    DIY: {
      icon: (
        <MaterialCommunityIcons style={styles.icon} name={'tools'} size={18} />
      ),
    },
    Garden: {
      icon: <MaterialIcons style={styles.icon} name={'grass'} size={18} />,
    },
    Pets: {
      icon: <MaterialIcons style={styles.icon} name={'pets'} size={18} />,
    },
    Shopping: {
      icon: (
        <MaterialCommunityIcons
          style={styles.icon}
          name={'shopping-outline'}
          size={18}
        />
      ),
    },
    Other: {
      icon: (
        <MaterialCommunityIcons
          style={styles.icon}
          name={'dots-horizontal'}
          size={18}
        />
      ),
    },
  };

  useEffect(async () => {
    const jobFromApi = await getSingleJob(job_id);

    setCurrentJob(jobFromApi);
    setCurrentCategory(jobFromApi.category);
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

  if (currentCategory === '') return <Text>...loading</Text>;

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
          <Text>{categories[currentCategory].icon}</Text>
        </View>
        <View style={styles.statusCards}>
          <Text>Status - in progress or complete</Text>
        </View>
        <View style={styles.statusCards}>
          <Text>£{currentJob.price.toFixed(2)}</Text>
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
