import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import { BG_Color, TEXT_Color } from '../utils/Colors'

const CustomDropDown = ({title, placeholder,   bad, onClick}) => {
  return (
    <TouchableOpacity onPress={()=>{ onClick()}} style={[styles.input,{borderColor:bad?'red':'#9e9e9e'}]}>
    <Text style={[styles.title,{color:bad?'red':'black'}]}>{title}</Text>
    <Text style={{color: placeholder.includes('select')?'#9e9e9e':'black'}}>{placeholder}</Text>
    <Image source={require('../images/arrow.png')} style={styles.icon}/>
    </TouchableOpacity>
  )
}
    const styles=StyleSheet.create({
      input:{
        width:"90%",
        height:moderateScale(41),
        borderWidth:0.4,
        alignSelf:"center",
        marginTop:moderateVerticalScale(20),
        borderRadius:moderateScale(10),
        paddingLeft:moderateScale(20),
        paddingRight:moderateScale(20),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'

        
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
      },
      icon:{
        width:scale(10),
        height:scale(10)
      }
    })
export default CustomDropDown