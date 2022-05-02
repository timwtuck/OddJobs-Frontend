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
    width: '80%',
    height: '40%',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    textAlign: 'center',
    borderRadius: 15,
    marginVertical: 20,
  },
  postJob: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    textAlign: 'center',
    borderRadius: 15,
    width: '80%',
    height: 130,
    marginBottom: 20,
  },
  seeJobs: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    textAlign: 'center',
    borderRadius: 15,
    width: '80%',
    height: 130,
    marginBottom: 20,
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
