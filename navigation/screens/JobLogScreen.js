import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../../App';

import { getAllJobs } from '../../api';

export const JobLogScreen = ({ navigation }) => {
  // global user context
  const user = useContext(AuthContext);
  // global user context

  const [userJobs, setUserJobs] = useState([]);

  React.useEffect(() => {
    getAllJobs().then(data => {
      setUserJobs(
        data.filter(job => {
          if (job.user_id === user._id) {
            return job;
          }
        }),
      );
    });
  }, []);

  console.log(userJobs);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.jobCard}>
          <Text>Job Log Screen</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: '#CDDCEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
  },
  jobCard: {
    backgroundColor: '#FFEDDF',
    width: Dimensions.get('window').width - 60,
    height: 150,
    marginVertical: 15,
    padding: 10,
    borderRadius: 15,
  },
  gesture: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  tokenInfo: {
    width: '60%',
    fontSize: 12,
    color: '#00000080',
    justifyContent: 'flex-end',
  },
  tokenContainer: {
    width: '40%',
  },
  tokenForm: {
    borderWidth: 2,
    borderColor: '#000',
    width: '80%',
    marginTop: 15,
    padding: 10,
    borderRadius: 15,
  },
  submit: {
    padding: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#000',
    width: '80%',
    height: '25%',
    marginVertical: 15,
    paddingTop: 10,
    padding: 10,
    borderRadius: 15,
  },
});
