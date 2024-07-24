import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_Color, TEXT_Color } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { FlatList } from 'react-native-gesture-handler'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
const CustomDrawer = ({navigation}) => {
  
  const [isLogin,setIsLogin]=useState(false)
  const [name,setName]=useState('');
  const [email,setEmail]=useState('')
  const isFocused=useIsFocused();
  useEffect(() => {
    getData()
  }, [isFocused])
  
   const getData=async()=>{
    const id= await AsyncStorage.getItem("USER_ID");
    const type= await AsyncStorage.getItem("USER_TYPE");
    const mName= await AsyncStorage.getItem("NAME");
    const mEmail= await AsyncStorage.getItem("EMAIL");
    if(id!=null && type!=null){
      if(type=='user'){
        setIsLogin(true);
        setName(mName);
        setEmail(mEmail);
      }
    }
   }



   const handleLogout = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      if (id) {
        await firestore().collection('users').doc(id).update({
          sessionActive: false,
        });
      }
      // Clear AsyncStorage to remove saved user data
      await AsyncStorage.removeItem("USER_ID");
      await AsyncStorage.removeItem("USER_TOKEN");
      
      // Navigate to the login screen
      navigation.replace('SelectUser');
    } catch (error) {
      alert(error.message);
    }
  };


  const [profileImg,setProfileImg]=useState('');



  useEffect(() => {
   getImg();
  }, [isFocused])
  
  const getImg=async()=>{
     
     setProfileImg(await AsyncStorage.getItem('PROFILE_IMAGE'));
     if(img!=null){
      setProfileImg(img)
     }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
      <TouchableOpacity>
        {profileImg!='' && isLogin?(
          <Image source={{uri:profileImg}} style={[styles.Profile,{borderRadius:50,}]} />
        ):(<Image source={require('../../images/user.png')} style={styles.Profile} />
        )}
      </TouchableOpacity>
        <View>
          <Text style={styles.heading}>{isLogin?name:'Build Your Profile'}</Text>
          <Text style={[styles.sub_heading,{width:isLogin?'100%':"60%"}]}>{isLogin?email:'Job Opportunities waiting For You At FindMyJob '}</Text>
        </View>
      </View>
      {!isLogin && <View style={styles.btnView}>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>{
          navigation.navigate('LoginForUser')
        }}>
          <Text style={[styles.btnText,{color:BG_Color}]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SignupBtn} onPress={()=>{
          navigation.navigate('SignupForUser')
        }}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>}
      <View style={styles.separator}></View>
      {isLogin? (
        <FlatList  contentContainerStyle={{marginTop:moderateScale(30)}}
        data={[
          {title:'Saved Jobs', icon: require('../../images/bookmark.png')},
        {title:'Contact Us', icon: require('../../images/add-contact.png')},
        {title:'Rate US', icon: require('../../images/rates.png')},
        {title:'Logout', icon: require('../../images/logout.png')}
        ]} 
      renderItem={({item,index})=>{
        return(
          <TouchableOpacity style={styles.menuItem} onPress={()=>{
            if(index==0){
              navigation.closeDrawer();
              navigation.navigate('SavedJobs');
            }
            else if(index==3){
              navigation.closeDrawer();
              handleLogout();
            }
            else if(index==2){
              navigation.closeDrawer();
              navigation.navigate('RateUs')
            }
            else{
              navigation.closeDrawer();
              navigation.navigate('ContactUs')
            }
            
          }}>
          <View style={styles.menuItemLeftView}>
          <Image source={item.icon} style={styles.menuItemIcon} />
          <Text style={styles.heading}>{item.title}</Text>
          </View>
          <Image source={require('../../images/rightside.png')} style={styles.side}/>
          </TouchableOpacity>
        )
      }} />
      ):(
        <View style={{flex:1, alignItems:'center',alignSelf:'center',alignContent:'center',marginTop:220  }}>
          <Text style={{fontSize:16, fontWeight:'600', textAlign:'center',justifyContent:'center',alignSelf:'center', color:TEXT_Color}}>Well Come For Visit Our App</Text>
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
  Profile: {
    width: scale(55),
    height: scale(55),

    marginLeft: moderateScale(5)
  },
  topView: {
    flexDirection: 'row',
    marginTop: verticalScale(20)
  },
  heading: {

    fontSize: 18,
    width: '70%',
    fontWeight: '800',
    color: TEXT_Color,
    marginLeft: moderateScale(5)
  },
  sub_heading: {
    fontSize: moderateScale(11),
    width: '70%',
    marginLeft: moderateScale(5),
    color: 'black',
    fontWeight: '500',
    marginTop: moderateScale(5)
  },
  btnView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20)
  },
  loginBtn:{
    width:'45%',
    height:verticalScale(30),
    backgroundColor:TEXT_Color,
    borderRadius:moderateScale(30),
    justifyContent:'center',
    alignItems:'center'
  },
  SignupBtn:{
    width:'45%',
    height:verticalScale(30),
    borderColor:TEXT_Color,
    borderWidth:1,
    borderRadius:moderateScale(30),
    justifyContent:'center',
    alignItems:'center'
  },
  btnText:{
    fontWeight:'600',
    fontSize:moderateScale(15),
  },
  separator:{
    width:'90%',
    height:verticalScale(.5),
    backgroundColor:'#9e9e9e',
    opacity:.5,
    alignSelf:'center',
    marginTop:moderateScale(20)
  },
  menuItem:{
    width:'90%',
    alignSelf:'center',
    height:verticalScale(40),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  menuItemLeftView:{
    flexDirection:'row',
    alignItems:'center'
  },
  menuItemIcon:{
    width:scale(24),
    height:scale(24)
  },
  side:{
    width:scale(20),
    height:scale(20)
  },
})

export default CustomDrawer