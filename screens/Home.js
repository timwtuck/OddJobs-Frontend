import { Text, View, StyleSheet } from 'react-native';

export const Home = () => {
  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  mapBackground: {
    width: '80%',
    height: '40%',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    textAlign: 'center',
    borderRadius: '15px',
    marginVertical: 20,
  },
  postJob: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    textAlign: 'center',
    borderRadius: 15,
    width: '80%',
    height: 130,
    marginBottom: '20px',
  },
  seeJobs: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    textAlign: 'center',
    borderRadius: 15,
    width: '80%',
    height: 130,
    marginBottom: '20px',
  },
  cardHeader: {
    fontStyle: 'bold',
    fontSize: '1.4rem',
    margin: '.4rem',
  },
  cardSubText: {
    fontSize: '.8rem',
  },
});
