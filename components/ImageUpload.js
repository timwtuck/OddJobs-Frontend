import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
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
import * as ImagePicker from 'expo-image-picker';

export const ImageUpload = ({ navigation }) => {
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

  async function pickImage(handleChange) {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      handleChange(result.uri);
    }
  }

  return (
    <Formik
      initialValues={{
        name: '',
        productImage: {},
      }}
      onSubmit={async (values, actions) => {
        let formData = new FormData();
        console.log(values.productImage);
        formData.append('productImage', values.productImage);
        formData.append('name', values.name);

        const res = await fetch('http://localhost:8800/uploads/', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        console.log(data);
      }}>
      {formikProps => (
        <React.Fragment>
          <View style={styles.container}>
            {/* Name */}
            <Text
              style={{
                fontFamily: 'Inter_300Light',
                textAlign: 'center',
                fontSize: 32,
              }}>
              Name
            </Text>
            <TextInput
              placeholder="Name"
              onChangeText={formikProps.handleChange('name')}
              onBlur={formikProps.handleBlur('name')}
              style={styles.formInput}
            />
            <Text style={{ color: 'red' }}>
              {formikProps.touched.name && formikProps.errors.name}
            </Text>
            {/*
             Image 
             */}

            <View style={styles.buttonContainer}>
              <Button
                title="Upload photo"
                mode="contained"
                // style={styles.button}
                onPress={() => {
                  pickImage(formikProps.handleChange('productImage'));
                }}>
                Pick an Image from camera roll
              </Button>
              {formikProps.values.productImage &&
              formikProps.values.productImage.length > 0 ? (
                <Image
                  source={{ uri: formikProps.values.productImage }}
                  style={{ width: 100, height: 100 }}
                />
              ) : null}
            </View>
            <Text style={{ color: 'red' }}>
              {formikProps.touched.productImage &&
                formikProps.errors.productImage}
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
        </React.Fragment>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
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
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
});
