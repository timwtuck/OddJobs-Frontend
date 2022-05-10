import * as React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useContext } from 'react';
import { AuthContext, setAuthContext } from '../../App';
import { patchUser } from '../../api';

const validation = yup.object().shape({
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
});

export const EditUsernameScreen = ({ navigation }) => {
  // global user context
  const loginState = useContext(AuthContext);
  const setLoginState = useContext(setAuthContext);

  return (
    <Formik
      initialValues={{
        username: '',
      }}
      onSubmit={(values, actions) => {
        patchUser(loginState._id, { username: values.username });
        setLoginState({ ...loginState, username: values.username });
        console.log(loginState, '<<-- new call');
        navigation.navigate('MyAccountScreen');
      }}
      validationSchema={validation}>
      {formikProps => (
        <React.Fragment>
          <View style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 38 }}>
              Edit Username
            </Text>
            {/*
             Username
             */}

            <TextInput
              placeholder="Username"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('username')}
              onBlur={formikProps.handleBlur('username')}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.username && formikProps.errors.username}
            </Text>

            {/* 
            Props
            */}
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Button title="Confirm" onPress={formikProps.handleSubmit} />
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
