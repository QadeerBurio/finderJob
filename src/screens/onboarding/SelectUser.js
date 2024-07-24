import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { BG_Color, TEXT_Color } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const SelectUser = () => {

    const navigation=useNavigation();
    
  return (
    <View style={styles.container}>
    <Image source={require('../../images/splash.png')} style={styles.logo} />
      <Text style={styles.title}>What you are looking for</Text>
      <TouchableOpacity style={styles.wanttohire} onPress={()=>navigation.navigate('JobPostingNavigator')}>
      <Text style={styles.btntxt}>Want To Hire Candidate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.wanttojob} onPress={()=>navigation.navigate('JobSearchingNavigator')}>
      <Text style={styles.btntxt1}>Want To Get Job</Text>
      </TouchableOpacity>
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
        height:scale(100),
        marginBottom:moderateVerticalScale(50)
    },
    title:{
        fontSize:moderateScale(20),
        fontWeight:'600',
        color:TEXT_Color
    },
    wanttohire:{
        width:'90%',
        height:verticalScale(45),
        backgroundColor:TEXT_Color,
        borderRadius:moderateScale(15),
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateVerticalScale(20)
    },
    wanttojob:{
        width:'90%',
        height:verticalScale(45),
        borderColor:TEXT_Color,
        borderWidth:1,
        borderRadius:moderateScale(15),
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateVerticalScale(20)
    },
    btntxt:{
        color:BG_Color,
        fontSize:moderateScale(16),
        fontWeight:'600'
    },
    btntxt1:{
        color:TEXT_Color,
        fontSize:moderateScale(16),
        fontWeight:'600'
    }
})
export default SelectUser