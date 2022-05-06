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
        password: user.password,
      }));

      setUsers(list);
      console.log(users);
    });
  }, []);

  const validation = yup.object().shape({
    email: yup.string().required().label('Email').email(),
    password: yup.string().required().label('password'),
  });

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: '',
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          // filter over users array
          users.filter(user => {
            if (
              user.email === values.email &&
              user.password === values.password
            ) {
              setLoggedIn(user);
              console.log(loggedIn, '<<< logged in');
            } else if (
              user.email !== values.email ||
              user.password !== values.password
            ) {
              alert('Check username and password');
            }
          });
          actions.setSubmitting(false);
        }, 1500);
      }}
      validationSchema={validation}>
      {formikProps => (
        <React.Fragment>
          <View style={styles.container}>
            {/*
             Email 
             */}
            <TextInput
              placeholder="JohnDoe@Emample.com"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('email')}
              onBlur={formikProps.handleBlur('email')}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.email && formikProps.errors.email}
            </Text>
            {/*
             Password 
             */}

            <TextInput
              placeholder="Password"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('password')}
              onBlur={formikProps.handleBlur('password')}
              secureTextEntry
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>
            {/* 
            Props
            */}
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Button title="submit" onPress={formikProps.handleSubmit} />
            )}
          </View>
        </React.Fragment>
      )}
    </Formik>
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
