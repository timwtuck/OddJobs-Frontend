import * as React from 'react';
import { useContext } from 'react';
import { AuthContext, setAuthContext } from '../../App';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getAllJobs } from '../../api';
import { Map } from '../../components/Map';
import { Platform } from 'expo-modules-core';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const SeeMoreJobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = React.useState([]);
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
  const isFocused = useIsFocused();

  React.useEffect(() => {
    getAllJobs().then(jobsFromApi => {
      setJobs(jobsFromApi);
    });
  }, [isFocused]);

  // global user context
  const user = useContext(AuthContext);
  const setUser = useContext(setAuthContext);
  // global user context

  return (
    <>
      <View style={styles.container}>
        <Map />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: 0,
          bottom: 20,
          right: 20,
        }}>
        {categories.map((category, index) => (
          <Pressable
            key={index}
            style={styles.filterItem}
            onPressOut={() => {
              console.log('pressed');
            }}>
            {category.icon}
            <Text>{category.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.list}>
        <FlatList
          data={jobs}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.item}
              onPressOut={() => {
                navigation.navigate('JobScreen', { job_id: item._id });
              }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.category}</Text>
              <Text>£{item.price.toFixed(2)}</Text>
            </Pressable>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    backgroundColor: 'green',
    // backgroundColor: '#c7f9cc',
    paddingTop: 30,
    paddingLeft: 30,
  },
  filterItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
  },
  item: {
    backgroundColor: '#c7f9cc',

    borderRadius: 15,
    width: '90%',
    // height: 130,
    marginBottom: 20,
    padding: 10,
    paddingLeft: 15,
  },
  title: {
    fontSize: 18,
  },
  scrollView: {
    backgroundColor: 'blue',
    position: 'absolute',
    top: Platform.os === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
});
