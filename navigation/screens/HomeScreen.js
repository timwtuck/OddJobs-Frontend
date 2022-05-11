import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Map } from '../../components/Map';
import { AutoFocus } from 'expo-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [categories, setCategories] = React.useState([
    {
      label: 'Cleaning',
      value: 'Cleaning',
      icon: (
        <MaterialIcons
          style={styles.icon}
          name={'cleaning-services'}
          size={18}
        />
      ),
    },
    {
      label: 'Delivery',
      value: 'Delivery',
      icon: (
        <MaterialCommunityIcons
          style={styles.icon}
          name={'truck-delivery-outline'}
          size={18}
        />
      ),
    },
    {
      label: 'DIY',
      value: 'DIY',
      icon: (
        <MaterialCommunityIcons style={styles.icon} name={'tools'} size={18} />
      ),
    },
    {
      label: 'Garden',
      value: 'Garden',
      icon: <MaterialIcons style={styles.icon} name={'grass'} size={18} />,
    },
    {
      label: 'Pets',
      value: 'Pets',
      icon: <MaterialIcons style={styles.icon} name={'pets'} size={18} />,
    },
    {
      label: 'Shopping',
      value: 'Shopping',
      icon: (
        <MaterialCommunityIcons
          style={styles.icon}
          name={'shopping-outline'}
          size={18}
        />
      ),
    },
    {
      label: 'Other',
      value: 'Other',
      icon: (
        <MaterialCommunityIcons
          style={styles.icon}
          name={'dots-horizontal'}
          size={18}
        />
      ),
    },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.mapBackground}>
        <Map />
      </View>
      <Pressable
        style={styles.postJob}
        onPressOut={() =>
          navigation.navigate('PostJobScreen', { categories: categories })
        }>
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
        onPressOut={() =>
          navigation.navigate('SeeMoreJobsScreen', { categories: categories })
        }>
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
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-start',
    marginLeft: 15,
  },
  cardHeader: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    marginVertical: 5,
  },
  cardSubText: {
    fontSize: 12,
    flexShrink: 1,
    // flexWrap: 'wrap',
  },
});
