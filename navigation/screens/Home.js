import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mapBackground}>
        <Text>Map Render</Text>
      </View>
      <View style={styles.postJob}>
        <Text style={styles.cardHeader}>Post a Job</Text>
        <Text style={styles.cardSubText}>List an odd job today</Text>
      </View>
      <View style={styles.seeJobs}>
        <Text style={styles.cardHeader}>Post a Job</Text>
        <Text style={styles.cardSubText}>List an odd job today</Text>
      </View>
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
    borderRadius: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  postJob: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    width: '90%',
    height: 130,
    marginBottom: 20,
    alignItems: 'center',
  },
  seeJobs: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    width: '90%',
    height: 130,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardHeader: {
    fontStyle: 'normal',
    fontSize: 16,
    // margin: '.4rem,
  },
  cardSubText: {
    fontSize: 12,
  },
});
