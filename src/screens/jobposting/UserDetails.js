import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BG_Color, TEXT_Color } from '../../utils/Colors';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const UserDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [details,setDetails]=useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
    getImg();
    getUsers();
  }, [isFocused]);

  const getData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true);
      }
    }
  };

  const getImg = async () => {
    const img = await AsyncStorage.getItem('PROFILE_IMAGE');
    if (img != null) {
      setProfileImg(img);
    }
  };
  const getUsers = async () => {
    setLoading(true);
    let id = await AsyncStorage.getItem("USER_ID");

    firestore().collection('users').where("email", '==', id).get()
      .then(async (data) => {
        setLoading(false)
        let temp = [];
        data.docs.forEach(item => {
          temp.push({ ...item.data(), id: item.id })
        })
        await AsyncStorage.setItem('Users', temp.length + "")
        setDetails(temp);
      })
  }

  const sendConnectionRequest = async () => {
    const currentUser = await AsyncStorage.getItem('USER_ID'); 
    if (currentUser) {
      firestore()
        .collection('users')
        .doc(route.params.data.userId)
        .update({
          connectionRequests: firestore.FieldValue.arrayUnion(currentUser),
        })
        .then(() => {
          console.log('Connection request sent');
        })
        .catch(error => {
          console.error('Error sending connection request: ', error);
        });
    }
  };

  const sendMessage = () => {
    navigation.navigate('ChatScreen', { userId: route.params.data.id });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <View style={styles.profileContainer}>
          {profileImg!=='' ? (
            <Image source={{ uri:profileImg }} style={styles.Profile} />
          ) : (
            <Image source={require('../../images/user.png')} style={styles.Profile} />
          )}
          <Text style={styles.title}>{route.params.data.name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.subTitle}>Email: {route.params.data.email}</Text>
          <Text style={styles.subTitle}>Experienced: {route.params.data.expList} years</Text>
          <Text style={styles.subTitle}>Category: {route.params.data.category}</Text>
          <Text style={styles.subTitle}>Skills: {route.params.data.skill}</Text>
          <Text style={styles.subTitle}>Education: {route.params.data.eduList}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={sendConnectionRequest} style={styles.connectButton}>
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessage} style={styles.messageButton}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_Color
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: moderateScale(40),
  },
  Profile: {
    width: scale(100),
    height: scale(100),
    borderRadius: 50,
    marginBottom: moderateScale(10),
  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: '600',
    color: TEXT_Color,
  },
  detailsContainer: {
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  subTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: moderateScale(10),
    color: TEXT_Color,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(30),
  },
  connectButton: {
    width: '40%',
    height: verticalScale(40),
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
  },
  messageButton: {
    width: '40%',
    height: verticalScale(40),
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(16),
  },
});

export default UserDetails;
