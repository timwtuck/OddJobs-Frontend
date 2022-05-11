import * as React from 'react';
import { useContext } from 'react';
import { AuthContext, setAuthContext } from '../../App';
import { Text, FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getAllJobs } from '../../api';
import { Map } from '../../components/Map';
import { JobScreen } from './JobScreen';

export const SeeMoreJobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = React.useState([]);

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
});
