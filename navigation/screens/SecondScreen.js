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
});

export const SecondScreen = () => {
  return (
    <Formik
      initialValues={{ firstName: '' }}
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
            <TextInput
              style={styles.formInput}
              onChangeText={formikProps.handleChange('firstName')}
            />
            <Text style={{ color: 'red' }}>{formikProps.errors.firstName}</Text>
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
