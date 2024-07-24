import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

import React, { useEffect, useState } from 'react'
import { BG_Color, TEXT_Color } from '../../../utils/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ProfileItem from '../../../components/ProfileItem'
import firestore from '@react-native-firebase/firestore'
const Profile1 = ({onJobClick}) => {
     const navigation=useNavigation();

  const [name,setName]=useState('');
  const [jobs,setJobs]=useState('');
  const [profileImg,setProfileImg]=useState('');

  const isFocused=useIsFocused();

  useEffect(() => {
   getData();
  }, [isFocused])
  
  const getData=async()=>{
     setName(await AsyncStorage.getItem('NAME'));
     setJobs(await AsyncStorage.getItem('JOBS'));
     setProfileImg(await AsyncStorage.getItem('PROFILE_IMAGE'));
     if(img!=null){
      setProfileImg(img)
     }
  }

  const handleLogout = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      if (id) {
        // Update Firestore to set session as inactive
        await firestore().collection('job_posters').doc(id).update({
          sessionActive: false,
        });
      }
  
      // Clear all relevant AsyncStorage data
      await AsyncStorage.clear(); // This will clear all data in AsyncStorage
  
      // Optionally, navigate to a login or welcome screen
      navigation.replace('SelectUser');
  
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>
      <TouchableOpacity>
        {profileImg!=''?(
          <Image source={{uri:profileImg}} style={styles.profileimg} />
        ):(<Image source={require('../../../images/user.png')} style={styles.profileimg} />
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
        <View style={styles.btnview}>
        
        <TouchableOpacity style={styles.editProfile} onPress={()=>{
          navigation.navigate('UpdateProfileForCompany')
        }}>
          <Text style={{fontWeight:'700', fontSize:moderateScale(15), color:TEXT_Color}}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateProfile} onPress={()=>{
          navigation.navigate('ChangeImgCompany')
        }}>
          <Text style={{fontWeight:'700', fontSize:moderateScale(15), color:TEXT_Color}}>Change Profile</Text>
        </TouchableOpacity>
        </View>
        
        <View style={styles.optionArea}>
        <ProfileItem icon={require('../../../images/jobs.png')} title={'My Jobs ('+jobs+")"} onClick={()=>{
          onJobClick()
        }}/>
        <ProfileItem icon={require('../../../images/contactus.png')} title={'Contact US'} onClick={()=>{
          navigation.navigate('Contactus')
        }}/>
        <ProfileItem icon={require('../../../images/theme.png')} title={'Theme'} onClick={()=>{

        }}/>
        <ProfileItem icon={require('../../../images/logout.png')} title={'Logout'} onClick={()=>{
          handleLogout();
        }}/>
        </View>
    </View>
  )
}

 const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:BG_Color
  },
  heading: {
    fontSize: moderateScale(25),
    marginLeft: moderateScale(10),
    fontWeight: '600',
    color: TEXT_Color,
    marginTop:verticalScale(10)
  },
  profileimg:{
    width:scale(100),
    height:scale(100),
    borderRadius:scale(50),
    alignSelf:'center',
    marginTop:moderateScale(20)
  },
  chngProfleImg:{
    textDecorationLine:'underline',
    alignSelf:"center",
    marginTop:moderateScale(10),
    color:TEXT_Color,
    fontSize:moderateScale(16)
  },
  name:{
    fontSize:moderateScale(25),
    fontWeight:'600',
    alignSelf:'center',
    color:TEXT_Color,
    marginTop:moderateScale(10)
  },
  optionArea:{
    marginTop:verticalScale(70)
  },
  btnview:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: moderateScale(20),
    alignItems: 'center',
    marginTop:moderateScale(20),
    
  },
  editProfile:{
    width:"45%",
    height:verticalScale(40),
    borderWidth:2,
    borderRadius:moderateScale(10),
    justifyContent:'center',
    alignItems:'center',
    fontWeight:'800'
  },
  updateProfile:{
    width:"45%",
    height:verticalScale(40),
    borderWidth:2,
    borderRadius:moderateScale(10),
    justifyContent:'center',
    alignItems:'center',
    fontWeight:'800'
  }
 })

export default Profile1