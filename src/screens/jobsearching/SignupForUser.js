import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { BG_Color, TEXT_Color } from '../../utils/Colors';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import CustomTextInput from '../../components/CustomTextInput';
import CustomSolidBtn from '../../components/CustomSolidBtn';
import CustomBorderBtn from '../../components/CustomBorderBtn';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';

const SignupForUser = () => {

  // Navigation
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [badName, setBadName] = useState('');
  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [contact, setContact] = useState('');
  const [badContact, setBadContact] = useState('');
  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const validate = () => {
    let nameRegex = /^[A-Za-z]+$/;
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let contactRegex = /^\d+$/;

    let validName = true;
    let validEmail = true;
    let validContact = true;
    let validPassword = true;

    // Validate Name
    if (name === '') {
      validName = false;
      setBadName('Please Enter Name');
    } else if (name.length < 3 || !name.match(nameRegex)) {
      validName = false;
      setBadName('Please Enter Valid Name');
    } else {
      validName = true;
      setBadName('');
    }

    // Validate Email
    if (email === '') {
      validEmail = false;
      setBadEmail('Please Enter Email');
    } else if (!email.match(emailRegex)) {
      validEmail = false;
      setBadEmail('Please Enter valid Email');
    } else {
      validEmail = true;
      setBadEmail('');
    }

    // Validate Contact
    if (contact === '') {
      validContact = false;
      setBadContact('Please Enter Contact');
    } else if (contact.length < 11 || !contact.match(contactRegex)) {
      validContact = false;
      setBadContact('Please Enter Valid Contact');
    } else {
      validContact = true;
      setBadContact('');
    }

    // Validate Password
    if (password === '') {
      validPassword = false;
      setBadPassword('Please Enter Password');
    } else if (password.length < 6) {
      validPassword = false;
      setBadPassword('Please Enter Min 6 characters Password');
    } else {
      validPassword = true;
      setBadPassword('');
    }

    return validName && validEmail && validContact && validPassword;
  }

  const registerUser = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await firestore().collection('users').add({
        name,
        email,
        contact,
        password
      }).then(() => {
        setName('');
        setEmail('');
        setContact('');
        setPassword('');
        setAccountCreated(true);
        setLoading(false);
        setTimeout(() => {
          navigation.navigate('LoginForUser');
        }, 5000);
      });

      // Alert.alert("Success", "User registered successfully!");
    } catch (error) {
      setLoading(false);
      console.log('Please correct fields', error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {!accountCreated ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image source={require('../../images/splash.png')} style={styles.logo} />
          <Text style={styles.title}>Create New Account</Text>
          <CustomTextInput value={name} onChangeText={txt => { setName(txt) }} title={'Name'} placeholder={'xyz'} bad={badName !== ''} />
          {badName !== '' && <Text style={styles.msgerror}>{badName}</Text>}
          <CustomTextInput value={email} onChangeText={txt => { setEmail(txt) }} title={'Email'} placeholder={'xyz@gmail.com'} bad={badEmail !== ''} />
          {badEmail !== '' && <Text style={styles.msgerror}>{badEmail}</Text>}
          <CustomTextInput value={contact} onChangeText={txt => { setContact(txt) }} title={'Contact'} placeholder={'+923*********'} bad={badContact !== ''} />
          {badContact !== '' && <Text style={styles.msgerror}>{badContact}</Text>}
          <CustomTextInput value={password} onChangeText={txt => { setPassword(txt) }} title={'Password'} placeholder={'********'} bad={badPassword !== ''} secureTextEntry />
          {badPassword !== '' && <Text style={styles.msgerror}>{badPassword}</Text>}
          <CustomSolidBtn title={'SignUp'} onClick={registerUser} />
          <CustomBorderBtn title={'Login'} onClick={() => {
            navigation.navigate("LoginForUser");
          }} />
          <Loader visible={loading} />
        </ScrollView>
      ) : (
        <View style={styles.done}>
          <Image source={require('../../images/check.png')} style={styles.logo} />
          <Text style={styles.title}>{'Account Created'}</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_Color
  },
  logo: {
    width: scale(80),
    height: scale(80),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(50)
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(25),
    alignSelf: 'center',
    fontWeight: '500',
    marginTop: moderateVerticalScale(30),
    color: TEXT_Color
  },
  msgerror: {
    marginLeft: moderateScale(5),
    alignSelf: 'flex-start',
    color: 'red',
  },
  done: {
    width: "100%",
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SignupForUser;
