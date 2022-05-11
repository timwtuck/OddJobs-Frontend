import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
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
import { getAllJobs, getJobsByCategory } from '../../api';
import { Map } from '../../components/Map';
import { Platform } from 'expo-modules-core';

export const SeeMoreJobsScreen = ({ route, navigation }) => {
  const [jobs, setJobs] = useState([]);

  const { categories } = route.params;

  const isFocused = useIsFocused();

  useEffect(() => {
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
        <Pressable
          key={'all'}
          style={styles.filterItem}
          onPressOut={() => {
            getAllJobs().then(jobsFromApi => {
              setJobs(jobsFromApi);
            });
          }}>
          <Text>Show all</Text>
        </Pressable>
        {categories.map((category, index) => (
          <Pressable
            key={index}
            style={styles.filterItem}
            onPressOut={() => {
              getJobsByCategory(category.label).then(jobsFromApi => {
                setJobs(jobsFromApi);
              });
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
    // backgroundColor: '#c7f9cc',
    paddingTop: 30,
    paddingLeft: 30,
  },

  filterItem: {
    flexDirection: 'row',
    backgroundColor: '#FFEDDF',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 0,
    height: 35,
    borderColor: '#FEC899',
    borderWidth: 1,
  },
  item: {
    backgroundColor: '#FFEDDF',
    borderRadius: 15,
    width: '90%',
    marginBottom: 20,
    padding: 10,
    paddingLeft: 15,
    borderColor: '#FEC899',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
  },
  scrollView: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 36,
    padding: 0,
    paddingHorizontal: 10,
  },
});
