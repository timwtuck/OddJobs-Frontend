import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { postUser } from '../../api';
import { useContext } from 'react';
import { setAuthContext } from '../../App';
import { HomeScreen } from './HomeScreen';

const validation = yup.object().shape({
  fullName: yup
    .string()
    .required()
    .label('Full Name')
    .min(2, 'Must contain at least two letters.')
    .max(50, 'Max length 50 characters.'),
  username: yup
    .string()
    .required()
    .label('username')
    .min(3, 'Must contain at least three letters.')
    .max(30, 'Max length 30 characters.')
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9_]{2,29}$/,
      'Usernames can only contain letters, numbers and underscore(_)',
    ),
  email: yup.string().required().label('Email').email(),
  password: yup
    .string()
    .required()
    .label('password')
    .matches(
      /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/,
      'Must contain 1 letter and number and contain at least 6 chars',
    ),
  confirmPass: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const SignupScreen = ({ navigation }) => {
  // global user context
  const setLoggedIn = useContext(setAuthContext);
  // global user context

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
        const { email, password, username, fullName } = values;
        alert(JSON.stringify({ email, password, username, fullName }));
        setTimeout(() => {
          postUser(fullName, username, email, password).then(newUser => {
            console.log(newUser, '<<< newuser app side');
            setLoggedIn({
              _id: newUser._id,
              username: newUser.username,
              fullName: newUser.fullName,
              email: newUser.email,
              password: newUser.password,
            });
          });
          // if response okay, setLoggedIn with data from response
          actions.setSubmitting(false);
        }, 1000);
        () => navigation.navigate(HomeScreen);
      }}
      validationSchema={validation}>
      {formikProps => (
        <React.Fragment>
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View>
              {/*
             full Name
             */}
              <Text style={{ textAlign: 'center', fontSize: 38 }}>Sign Up</Text>
              <TextInput
                placeholder="Full Name"
                style={styles.formInput}
                onChangeText={formikProps.handleChange('fullName')}
                onBlur={formikProps.handleBlur('fullName')}
              />
              <Text style={{ color: 'red' }}>
                {formikProps.touched.fullName && formikProps.errors.fullName}
              </Text>
              {/*
             username 
             */}

              <TextInput
                placeholder="username"
                style={styles.formInput}
                onChangeText={formikProps.handleChange('username')}
                onBlur={formikProps.handleBlur('username')}
              />
              <Text style={{ color: 'red' }}>
                {formikProps.touched.username && formikProps.errors.username}
              </Text>
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
              <TextInput
                placeholder="Confirm Password"
                style={styles.formInput}
                onChangeText={formikProps.handleChange('confirmPass')}
                onBlur={formikProps.handleBlur('confirmPass')}
                secureTextEntry
              />
              <Text style={{ color: 'red' }}>
                {formikProps.touched.confirmPass &&
                  formikProps.errors.confirmPass}
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
              Already Registered?
              <Text
                style={styles.signInClickable}
                onPress={() => navigation.navigate('loginScreen')}>
                {' '}
                Sign In
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
  header: {
    fontSize: 20,
  },

  formInput: {
    borderWidth: 2,
    borderColor: '#000',
    marginVertical: 15,
    padding: 10,
    borderRadius: 15,
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
