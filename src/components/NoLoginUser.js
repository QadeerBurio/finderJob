import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BG_Color, TEXT_Color } from '../utils/Colors'
import { moderateScale } from 'react-native-size-matters'
import CustomSolidBtn from './CustomSolidBtn'

const NoLoginUser = ({heading, desc}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading?heading:''}</Text>
      <Text style={styles.desc}>{desc?desc:''}</Text>
      <CustomSolidBtn title={'Login'} onClick={()=>{

      }} />
      <View style={styles.SignupView}>
      <Text style={styles.text1}>{"Don't have an account?"}</Text>
      <Text style={styles.text2}>{"Create Account"}</Text>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:BG_Color
    },
    heading:{
        fontSize:moderateScale(25),
        alignSelf:'center',
        width:'90%',
        marginTop:moderateScale(100),
        fontWeight:'700',
        textAlign:'center',
        color:TEXT_Color
    },
    desc:{
        width:'80%',
        alignSelf:'center',
        fontSize:moderateScale(13),
        textAlign:'center',
        marginTop:moderateScale(10)
    },
    SignupView:{
        flexDirection:'row',
        alignSelf:'center',
        width:'90%',
        marginTop:moderateScale(50),
        justifyContent:'center'
    },
    text1:{
        fontWeight:'500',
        fontSize:moderateScale(16)
    },
    text2:{
        fontWeight:'700',
        fontSize:moderateScale(16),
        textDecorationLine:'underline',
        marginLeft:moderateScale(10),
        color:TEXT_Color
    }
})

export default NoLoginUser