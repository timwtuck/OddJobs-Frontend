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
import { Formik } from 'formik';
import * as yup from 'yup';
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

  const validation = yup.object().shape({
    email: yup.string().required().label('Email').email(),
    password: yup.string().required().label('password'),
  });

  return (
    <View style={styles.container}>
      <View style={styles.formInput}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values));
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={validation}>
          {formikProps => (
            <React.Fragment>
              <View style={styles.container}>
                <TextInput
                  placeholder="email"
                  style={styles.formInput}
                  onChangeText={formikProps.handleChange('email')}
                  autoFocus
                  onBlur={formikProps.handleBlur('email')}
                />
                <Text style={{ color: 'red' }}>
                  {formikProps.touched.title && formikProps.errors.email}
                </Text>
                <TextInput
                  placeholder="Password"
                  style={styles.formInput}
                  onChangeText={formikProps.handleChange('password')}
                  onBlur={formikProps.handleBlur('password')}
                  secureTextEntry
                />

                <Button
                  style={styles.submit}
                  title="submit"
                  onPress={formikProps.handleSubmit}
                />
              </View>
            </React.Fragment>
          )}
        </Formik>
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
