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
import { AuthContext } from '../../App';
import { patchUser } from '../../api';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

const validation = yup.object().shape({
  fullName: yup
    .string()
    .required()
    .label('Full Name')
    .min(2, 'Must contain at least two letters.')
    .max(50, 'Max length 50 characters.'),
});

export const EditNameScreen = () => {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  // global user context
  const loginState = useContext(AuthContext);
  // global user context
  console.log(loginState);
  return (
    <Formik
      initialValues={{
        fullName: '',
      }}
      // onSubmit={(values, actions) => {
      //   patchUser(loginState._id, { fullName: values.fullName });
      // }}
      validationSchema={validation}>
      {formikProps => (
        <React.Fragment>
          <View style={styles.container}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 38,
                fontFamily: 'Inter_300Light',
              }}>
              Edit Name
            </Text>
            {/*
             full Name
             */}

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
