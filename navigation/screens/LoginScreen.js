import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';
import { getAllUsers } from '../../api';
import { SignupScreen } from './SignupScreen';

export const LoginScreen = ({ setLoggedIn }) => {
  const [users, setUsers] = React.useState([
    {
      _id: '',
      username: '',
      fullName: '',
      email: '',
    },
  ]);

  const [username, setUsername] = React.useState([]);

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
            }
          });
          actions.setSubmitting(false);
        }, 1500);
      }}
      validationSchema={validation}>
      {formikProps => (
        <React.Fragment>
          <View style={styles.container}>
            <Pressable
              style={styles.createAccount}
              onPress={() => navigation.navigate(SignupScreen)}>
              <Text>Create Account</Text>
            </Pressable>

            {/* <TextInput
              placeholder="First Name"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('firstName')}
              onBlur={formikProps.handleBlur('firstName')}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.firstName && formikProps.errors.firstName}
            </Text> */}
            {/*
             Last Name 
             */}

            {/* <TextInput
              placeholder="Last Name"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('lastName')}
              onBlur={formikProps.handleBlur('lastName')}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.lastName && formikProps.errors.lastName}
            </Text> */}

            {/*
             Email 
             */}
            <Text>Login</Text>
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

  createAccount: {
    backgroundColor: '#C4C4C470',
    marginVertical: 25,
    marginHorizontal: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    marginHorizontal: 30,
  },
});
