import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { Field, Form, Formik, useFormik, setFieldValue } from 'formik';
import RNPickerSelect from 'react-native-picker-select';

export const FourthScreen = () => {
  // const formik = useFormik({
  //   initialValues: { title: '', category: '', description: '', price: '' },
  // });
  return (
    <Formik
      initialValues={{
        title: '',
        category: '',
        description: '',
        price: '',
      }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}>
      {formikProps => (
        <React.Fragment>
          <View style={styles.container}>
            <TextInput
              placeholder="Job title"
              style={styles.formInput}
              onChangeText={formikProps.handleChange('title')}
            />
            <View style={styles.formInput}>
              <RNPickerSelect
                placeholder={{ label: 'Select a category' }}
                selectedValue={formikProps.values.category}
                onValueChange={itemValue =>
                  formikProps.setFieldValue('category', itemValue)
                }
                items={[
                  { label: 'DIY', value: 'DIY' },
                  { label: 'Garden', value: 'Garden' },
                  { label: 'Pets', value: 'Pets' },
                ]}
              />
            </View>
            <TextInput
              multiline
              // numberOfLines={6}
              maxLength={250}
              placeholder="Enter a brief description"
              style={styles.textInput}
              onChangeText={formikProps.handleChange('description')}
            />
            <View style={styles.gesture}>
              <View style={styles.tokenContainer}>
                <Text>Token Gesture</Text>
                <TextInput
                  placeholder="£10.00"
                  style={styles.tokenForm}
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
