import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';

import { FindAJobScreen } from './FindAJobScreen';
import { JobScreen } from './JobScreen';
import { JobLogScreen } from './JobLogScreen';
import { ChatLogScreen } from './ChatLogScreen';
import { JobChatScreen } from './JobChatScreen';
import { MyAccountScreen } from './MyAccountScreen';
import { EditNameScreen } from './EditNameScreen';
import { PostJobScreen } from './PostJobScreen';
import { LoginScreen } from './LoginScreen';
import { SignupScreen } from './SignupScreen';
import { EditUsernameScreen } from './EditUsernameScreen';
import { EditPostcodeScreen } from './EditPostcodeScreen';

export const EndPointsScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <>
          <Pressable
            style={styles.doingEndpoints}
            onPressOut={() => navigation.navigate(EditNameScreen)}>
            <Text style={styles.cardHeader}>Edit My Name Screen</Text>
            <Text style={styles.cardSubText}>Go to Page</Text>
          </Pressable>
        </>
        <>
          <Pressable
            style={styles.doingEndpoints}
            onPressOut={() => navigation.navigate(EditUsernameScreen)}>
            <Text style={styles.cardHeader}>Edit Username Screen</Text>
            <Text style={styles.cardSubText}>Go to Page</Text>
          </Pressable>
        </>
        <>
          <Pressable
            style={styles.doingEndpoints}
            onPressOut={() => navigation.navigate(EditPostcodeScreen)}>
            <Text style={styles.cardHeader}>Edit Postcode Screen</Text>
            <Text style={styles.cardSubText}>Go to Page</Text>
          </Pressable>
        </>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 20,
  },
  endpoints: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    width: '90%',
    height: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  doingEndpoints: {
    justifyContent: 'center',
    backgroundColor: '#e9c46a',
    borderRadius: 15,
    width: '90%',
    height: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  doneEndpoints: {
    justifyContent: 'center',
    backgroundColor: '#c7f9cc',
    borderRadius: 15,
    width: '90%',
    height: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  cardHeader: {
    fontStyle: 'normal',
    fontSize: 16,
  },
  cardSubText: {
    fontSize: 12,
  },
});
