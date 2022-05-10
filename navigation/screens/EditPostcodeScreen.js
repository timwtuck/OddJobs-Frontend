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
import { getSingleUser } from '../../api';

const postcodeRegex = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/i;

const validation = yup.object().shape({
  postcode: yup
    .string()
    .required()
    .label('postcode')
    .matches(postcodeRegex, 'Must be a valid UK postcode'),
});

export const EditPostcodeScreen = ({ navigation }) => {
  // global user context
  const loginState = useContext(AuthContext);
  const setLoginState = useContext(setAuthContext);

  return (
    <Formik
      initialValues={{
        postcode: '',
      }}
      onSubmit={(values, actions) => {
        patchUser(loginState._id, { postcode: values.postcode });
        setLoginState({ ...loginState, postcode: values.postcode });
        console.log(loginState, '<<--- loginState');
        getSingleUser(loginState._id).then(data => {
          console.log(data, '<<--- user data');
        }),
          navigation.navigate('MyAccountScreen');
      }}
      validationSchema={validation}>
      {formikProps => (
        <React.Fragment>
          <View style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 38 }}>
              Edit Postcode
            </Text>
            {/*
             Postcode
             */}

            <TextInput
              placeholder="Postcode"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('postcode')}
              onBlur={formikProps.handleBlur('postcode')}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.postcode && formikProps.errors.postcode}
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
