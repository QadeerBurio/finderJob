import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const ProfileItem = ({title, icon, onClick}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{
        onClick();
    }}>
      <View style={styles.View}>
      <Image source={icon} style={{width:scale(25), height:scale(25), color:'black'}} />
      <Text style={{marginLeft:moderateScale(15), color:'black', fontSize:moderateScale(18), fontWeight:'800'}}>{title}</Text>
      </View>
      <Image source={require('../images/rightside.png')} style={{width:moderateScale(10), height:moderateScale(10)}} />
    </TouchableOpacity>
  )
}

  const styles=StyleSheet.create({
    container:{
        width:'90%',
        alignSelf:'center',
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:verticalScale(20),
        

    },
    View:{
        flexDirection:'row',
        alignItems:'center',

    }
  })

export default ProfileItem