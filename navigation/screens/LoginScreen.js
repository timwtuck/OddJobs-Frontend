import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import { getAllUsers } from '../../api';

export const LoginScreen = () => {
  const [users, setUsers] = React.useState([
    {
      _id: '',
      username: '',
      fullName: '',
      email: '',
    },
  ]);

  const [username, setUsername] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState([]);

  React.useEffect(() => {
    getAllUsers().then(usersFromApi => {
      const list = usersFromApi.map(user => ({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      }));

      setUsername(list.map(user => user.username));
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formInput}>
        <RNPickerSelect
          placeholder={{ label: 'Select a user' }}
          items={{ username }}
          onValueChange={value => setLoggedIn(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formInput: {
    borderWidth: 2,
    borderColor: '#000',
    width: '80%',
    marginVertical: 15,
    padding: 10,
    borderRadius: 15,
  },
});
