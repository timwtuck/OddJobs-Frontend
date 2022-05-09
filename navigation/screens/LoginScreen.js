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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useContext } from 'react';
import { setAuthContext } from '../../App';

import { Formik } from 'formik';
import * as yup from 'yup';
import { getAllUsers } from '../../api';
import { SignupScreen } from './SignupScreen';

export const LoginScreen = ({ navigation }) => {
  // global user context
  const setLoggedIn = useContext(setAuthContext);
  // global user context

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
        fullName: '',
        username: '',
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
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View>
              {/* <Pressable
                style={styles.createAccount}
                onPress={() => navigation.navigate(SignupScreen)}>
                <Text>Create Account</Text>
              </Pressable> */}
              <Text style={{ textAlign: 'center', fontSize: 38 }}>Login</Text>
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
            {/* Test */}
            <Text style={styles.signIn}>
              Not Registered?
              <Text
                style={styles.signInClickable}
                onPress={() => navigation.navigate('SignupScreen')}>
                {' '}
                Sign Up
              </Text>
            </Text>
          </KeyboardAwareScrollView>
        </React.Fragment>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',

    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 34,
    backgroundColor: '#fff',
  },
  innerContainer: {
    marginVertical: 100,
  },

  formInput: {
    borderWidth: 2,
    borderColor: '#000',

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
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginHorizontal: 30,
  },
  signIn: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
  },
  signInClickable: {
    color: '#1b7ced',
  },
});
