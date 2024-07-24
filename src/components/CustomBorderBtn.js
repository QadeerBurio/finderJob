import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters'
import { BG_Color, TEXT_Color } from '../utils/Colors'

const CustoBorderBtn = ({title, onClick}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={()=>{
        onClick();
    }}>
    <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}
  const styles=StyleSheet.create({
    btn:{
        width:'90%',
        height:verticalScale(45),
        borderColor:TEXT_Color,
        borderWidth:1,
        alignSelf:'center',
        marginTop:moderateVerticalScale(20),
        borderRadius:moderateScale(10),
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:TEXT_Color,
        fontSize:moderateScale(16),
        fontWeight:'500'
    }

  })
export default CustoBorderBtn