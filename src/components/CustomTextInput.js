import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { BG_Color, TEXT_Color } from '../utils/Colors'

const CustomTextInput = ({title, placeholder, value, onChangeText, bad, keyboardType}) => {
  return (
    <View style={[styles.input,{borderColor:bad?'red':'#9e9e9e'}]}>
    <Text style={[styles.title,{color:bad?'red':'black'}]}>{title}</Text>
    <TextInput placeholder={placeholder} keyboardType={keyboardType?keyboardType:'default'} value={value} onChangeText={txt=>{onChangeText(txt)}}  />
    </View>
  )
}
    const styles=StyleSheet.create({
      input:{
        width:"90%",
        height:moderateScale(41),
        borderWidth:0.4,
        alignSelf:"center",
        justifyContent:'center',
        marginTop:moderateVerticalScale(20),
        borderRadius:moderateScale(10),
        paddingLeft:moderateScale(10),
        paddingRight:moderateScale(10),
        
      },
      title:{
        alignSelf:'flex-start',
        marginLeft:moderateScale(20),
        top:-moderateVerticalScale(8),
        position:'absolute',
        backgroundColor:BG_Color,
        paddingLeft:moderateScale(10),
        paddingRight:moderateScale(10),
        color:TEXT_Color
      }
    })
export default CustomTextInput