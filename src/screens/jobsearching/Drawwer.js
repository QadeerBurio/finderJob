import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { BG_Color, TEXT_Color } from '../../utils/Colors'
import {scale, verticalScale } from 'react-native-size-matters'
import Home from './tabs/Home'
import Applies from './tabs/Applies'
import Inbox from './tabs/Inbox'
import Proffile from './tabs/Proffile'
const Drawwer = () => {

    const [selectedTab,setSelectedTab]=useState(0)
    
  return (
    <View style={styles.container}>
    {selectedTab==0?(
        <Home/>
    ): selectedTab==1?(
        <Applies/>
    ): selectedTab==2?(
        <Inbox/>
    ):(
        <Proffile/>
    )}
      <View style={styles.bottomView}>
            <TouchableOpacity style={[styles.bottomTab,{borderTopWidth:selectedTab==0?3:0, borderTopColor:'red'}]}
             onPress={()=>{ setSelectedTab(0)}}>
                <Image source={selectedTab==0?require('../../images/home.png'):require('../../images/homee.png')}
                 style={styles.tabIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomTab,{borderTopWidth:selectedTab==1?3:0, borderTopColor:'red'}]}
             onPress={()=>{ setSelectedTab(1)}}>
                <Image source={selectedTab==1?require('../../images/send1.png'):require('../../images/send.png')}
                 style={styles.tabIcon}/>
            </TouchableOpacity>
            <TouchableOpacity title='Chat' style={[styles.bottomTab,{borderTopWidth:selectedTab==2?3:0, borderTopColor:'red'}]} 
            onPress={()=>{ setSelectedTab(2)}}>
                <Image source={selectedTab==2?require('../../images/chat11.png'):require('../../images/chat22.png')} 
                style={styles.tabIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomTab,{borderTopWidth:selectedTab==3?3:0, borderTopColor:'red'}]} 
            onPress={()=>{ setSelectedTab(3)}}>
                <Image source={selectedTab==3?require('../../images/useer1.png'):require('../../images/useer.png')} 
                style={styles.tabIcon} />
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:BG_Color
        
    },
    bottomView:{
        width:'100%',
        height:verticalScale(70),
        backgroundColor:BG_Color,
        shadowColor:'rgba(0,0,0,.5)',
        shadowOpacity:.2,
        shadowOffset:{x:0,y:1},
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        borderTopWidth:.2
        
    },
    bottomTab:{
        width:'20%',
        height:"100%",
        justifyContent:'center',
        alignItems:'center'
    },
    tabIcon:{
        width:scale(24),
        height:scale(24)
    }

})
export default Drawwer