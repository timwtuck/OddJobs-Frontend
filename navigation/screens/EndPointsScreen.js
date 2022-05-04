import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { FindAJobScreen } from './FindAJobScreen';
import { JobLogScreen } from './JobLogScreen';

export const EndPointsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <>
        <Pressable
          style={styles.endpoints}
          onPressOut={() => navigation.navigate(FindAJobScreen)}>
          <Text style={styles.cardHeader}>Find a Job Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
      <>
        <Pressable
          style={styles.endpoints}
          onPressOut={() => navigation.navigate(JobLogScreen)}>
          <Text style={styles.cardHeader}>Job Log Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
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
  endpoints: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    width: '90%',
    height: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  cardHeader: {
    fontStyle: 'normal',
    fontSize: 16,
  },
  cardSubText: {
    fontSize: 12,
  },
});
