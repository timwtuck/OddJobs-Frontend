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

const validation = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .label('First Name')
    .min(2, 'Must contain at least two letters.')
    .max(50, 'Max length 50 characters.'),
  lastName: yup
    .string()
    .required()
    .label('Last Name')
    .min(2, 'Must contain at least two letters.')
    .max(50, 'Max length 50 characters.'),
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

export const SecondScreen = () => {
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
        alert(JSON.stringify(values));
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 3000);
      }}
      validationSchema={validation}>
      {formikProps => (
        <React.Fragment>
          <View style={styles.container}>
            {/*
             First Name
             */}

            <TextInput
              placeholder="First Name"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('firstName')}
              autoFocus
              onBlur={formikProps.handleBlur('firstName')}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.firstName && formikProps.errors.firstName}
            </Text>
            {/*
             Last Name 
             */}

            <TextInput
              placeholder="Last Name"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('lastName')}
              onBlur={formikProps.handleBlur('lastName')}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.lastName && formikProps.errors.lastName}
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
  header: {
    fontSize: 20,
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
