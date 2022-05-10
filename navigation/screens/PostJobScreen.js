import * as React from 'react';
import {
  Button,
  Image,
  Keyboard,
  Text,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import * as yup from 'yup';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
// import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { postJob } from '../../api';
import { REACT_APP_API_KEY } from '@env';
import { JobScreen } from './JobScreen';

const postcodeRegex = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/i;

const validation = yup.object().shape({
  title: yup
    .string()
    .required()
    .label('title')
    .min(5, 'Must contain at least 5 letters.')
    .max(40, 'Max length 50 characters.'),
  postcode: yup
    .string()
    .required()
    .label('postcode')
    .matches(postcodeRegex, 'Must be a valid UK postcode'),
  category: yup
    .string()
    .required()
    .label('category')
    .min(1, 'Please select a category'),
  description: yup
    .string()
    .required()
    .label('description')
    .min(25, 'Must contain at least 25 letters.')
    .max(350, 'Max length 350 characters.'),
});

export const PostJobScreen = ({ navigation }) => {
  const [categories, setCategories] = React.useState([
    { label: 'Cleaning', value: 'Cleaning' },
    { label: 'Delivery', value: 'Delivery' },
    { label: 'DIY', value: 'DIY' },
    { label: 'Garden', value: 'Garden' },
    { label: 'Pets', value: 'Pets' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Other', value: 'Other' },
  ]);
  const [currentJob, setCurrentJob] = React.useState([]);
  // global user context
  const user = useContext(AuthContext);
  // global user context

  //image function currently not working on backend

  // async function pickImage(handleChange) {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //   });
  //   if (!result.cancelled) {
  //     handleChange(result.uri);
  //   }
  // }

  return (
    <Formik
      initialValues={{
        title: '',
        postcode: '',
        category: '',
        description: '',
        // image: '',
        price: 0,
      }}
      onSubmit={async (values, actions) => {
        const res = await axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${values.postcode}&key=${REACT_APP_API_KEY}`,
          )
          .catch(err => {
            console.log(err);
          });

        const newValues = { ...values };
        newValues.postcode = res.data.results[0].geometry.location;
        newValues.price = Number.parseInt(newValues.price).toFixed(2);

        const postRequestObject = { ...newValues, user_id: user._id };

        const postedJob = await postJob(postRequestObject);

        setCurrentJob(postedJob);

        navigation.navigate('JobScreen', { job_id: postedJob._id });

        Keyboard.dismiss();

        // setTimeout(() => {
        //   // actions.setSubmitting(false);
        //   // navigation.navigate('JobScreen', { job_id: currentJob._id });
        // }, 1000);
      }}
      // onSubmit={(values, actions) => {
      //   axios
      //     .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      //       params: {
      //         address: values.postcode,
      //         key: REACT_APP_API_KEY,
      //       },
      //     })
      //     .then(response => {
      //       const newValues = { ...values };
      //       newValues.postcode = response.data.results[0].geometry.location;
      //       newValues.price = Number.parseInt(newValues.price).toFixed(2);
      //       return newValues;
      //     })
      //     .then(newValues => {
      //       const postRequestObject = { ...newValues, user_id: user._id };
      //       postJob(postRequestObject).then(postedJob => {
      //         setCurrentJob(postedJob);
      //       });
      //     })
      //     .then(() => {
      //       navigation.navigate('JobScreen', { job_id: currentJob._id });
      //     });

      //   Keyboard.dismiss();

      //   setTimeout(() => {
      //     // actions.setSubmitting(false);
      //     // navigation.navigate('JobScreen', { job_id: currentJob._id });
      //   }, 1000);
      // }}
      validationSchema={validation}>
      {formikProps => (
        <React.Fragment>
          <KeyboardAwareScrollView
            style={{ backgroundColor: '#FFFFFF' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}>
            <TextInput
              placeholder="Job title"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('title')}
              autoFocus
              onBlur={formikProps.handleBlur('title')}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.title && formikProps.errors.title}
            </Text>
            <TextInput
              placeholder="Postcode"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('postcode')}
              onBlur={formikProps.handleBlur('postcode')}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.postcode && formikProps.errors.postcode}
            </Text>
            <View style={styles.formInput}>
              <RNPickerSelect
                placeholder={{ label: 'Select a category' }}
                selectedValue={formikProps.values.category}
                onValueChange={itemValue =>
                  formikProps.setFieldValue('category', itemValue)
                }
                items={categories}
              />
            </View>
            <TextInput
              multiline
              maxLength={350}
              placeholder="Enter a brief description"
              style={styles.textInput}
              onChangeText={formikProps.handleChange('description')}
              onBlur={formikProps.handleBlur('description')}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.description &&
                formikProps.errors.description}
            </Text>

            {/* <View style={styles.buttonContainer}>
              <Button
                title="Upload photo"
                mode="contained"
                style={styles.button}
                onPress={() => {
                  pickImage(formikProps.handleChange('image'));
                }}>
                Pick an image from camera roll
              </Button>
              {formikProps.values.image &&
              formikProps.values.image.length > 0 ? (
                <Image
                  source={{ uri: formikProps.values.image }}
                  style={{ width: 100, height: 100 }}
                />
              ) : null}
            </View> */}
            <View style={styles.gesture}>
              <View style={styles.tokenContainer}>
                <Text>Token Gesture</Text>
                <TextInput
                  placeholder="£10.00"
                  style={styles.tokenForm}
                  keyboardType="numeric"
                  onChangeText={formikProps.handleChange('price')}
                />
              </View>

              <Text style={styles.tokenInfo}>
                Token gesture is not required but will generate more interest in
                your post.
              </Text>
            </View>
            <Button
              style={styles.submit}
              title="submit"
              onPress={formikProps.handleSubmit}
            />
          </KeyboardAwareScrollView>
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
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
});
