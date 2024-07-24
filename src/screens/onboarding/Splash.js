import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BG_Color, TEXT_Color } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = () => {

    const navigation=useNavigation();

    useEffect(() => {
      setTimeout(()=>{
        getData();
      }, 3000)
    
    }, [])
    
    const getData=async()=>{
      let type= await AsyncStorage.getItem('USER_TYPE')
      if(type!=null){
        if(type=='company'){
          navigation.navigate('DashboardForCompany')
        }else{
          navigation.navigate('JobSearchingNavigator')
        }
        
      } else{
        navigation.navigate('SelectUser')
      }
    }

  return (
    <View style={styles.container}>
    <Image source={require('../../images/splash.png')} style={styles.logo} />
    <Text style={styles.name}>Find My Job</Text>
    <Text style={styles.slogan}>Post & Find Job in one Place</Text>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:BG_Color
    },
    logo:{
        width:scale(100),
        height:verticalScale(100)
    },
    name:{
        fontSize:moderateScale(40),
        fontWeight:'600',
        marginTop:moderateVerticalScale(10),
        color:TEXT_Color
    },
    slogan:{
        fontSize:moderateScale(16),
        fontStyle:'italic',
        position:'absolute',
        bottom:moderateVerticalScale(80),
        textDecorationLine:'underline',
        fontWeight:'600',
        color:TEXT_Color,
        }
})
export default Splash