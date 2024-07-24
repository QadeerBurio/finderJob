import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { TEXT_Color } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import CustoBorderBtn from '../../components/CustomBorderBtn';

const Contactus = () => {
    const navigation=useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendMsg,setSendMsg]=useState(false)

  const validateEmail = (email) => {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    const userId = await AsyncStorage.getItem("USER_ID");

    firestore()
      .collection('messagecompany')
      .add({
        userId,
        name,
        email,
        message,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setLoading(false);
       
        setSendMsg(true);

        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => {
            navigation.goBack();
          }, 5000);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <>
        {!sendMsg? (
            <View style={styles.container}>
      <Text style={styles.titlee}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <CustoBorderBtn
        title={loading ? "Sending..." : "Send Message"}
        onPress={handleSubmit}
        disabled={loading}
      />
      <Loader visible={loading}/>
    </View>
        ):(
            <View style={styles.done}>
          <Image source={require('../../images/check.png')} style={styles.logo}/>
          <Text style={styles.title}>{'Send Your Message'}</Text>
          <Text style={styles.tittle}>{'Thanks For Your Response'}</Text>
        </View>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  titlee: {
    fontSize: 24,
    marginBottom: 50,
    marginTop:50,
    textAlign: 'center',
    color:TEXT_Color
  },
  input: {
        width:"90%",
        height:moderateScale(44),
        borderWidth:0.7,
        borderColor:'grey',
        alignSelf:"center",
        justifyContent:'center',
        marginTop:moderateVerticalScale(20),
        borderRadius:moderateScale(5),
        paddingLeft:moderateScale(10),
        paddingRight:moderateScale(10),
  },
  done:{
    width:"100%",
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  title: {
    fontSize: moderateScale(25),
    alignSelf: 'center',
    fontWeight: '500',
    marginTop: moderateVerticalScale(20),
    color: TEXT_Color
  },
  logo: {
    width: scale(100),
    height: scale(100),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(10)
  },
  tittle:{
    fontSize:17,
    alignSelf:'center',
    fontWeight: '500',
    marginTop: moderateVerticalScale(5),
    color: TEXT_Color
  }
});

export default Contactus;
