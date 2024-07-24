import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { BG_Color, TEXT_Color } from '../../utils/Colors'
import { scale, verticalScale } from 'react-native-size-matters'
import MyJob from './Tabs/MyJob'
import SearchCandidate from './Tabs/SearchCandidate'
import Chats from './Tabs/Chats'
import Profile1 from './Tabs/Profile1'
import { useNavigation } from '@react-navigation/native'

const DashboardForCompany = () => {
    const navigation=useNavigation()

    const [selectedTab,setSelectedTab]=useState(0)
  return (
    <SafeAreaView style={styles.container}>
    {selectedTab==0?(
        <MyJob/>
    ): selectedTab==1?(
        <SearchCandidate/>
    ): selectedTab==2?(
        <Chats/>
    ):(
        <Profile1 onJobClick={()=>{
            setSelectedTab(0);
        }}/>
    )}
        <View style={styles.bottomView}>
            <TouchableOpacity style={[styles.bottomTab,{borderTopWidth:selectedTab==0?3:0, borderTopColor:'red'}]} onPress={()=>{ setSelectedTab(0)}}>
                <Image source={require('../../images/home.png')} style={[styles.tabIcon,{tintColor:selectedTab==0?'grey':'black'}]}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomTab,{borderTopWidth:selectedTab==1?3:0, borderTopColor:'red'}]} onPress={()=>{ setSelectedTab(1)}}>
                <Image source={require('../../images/user-avatar.png')} style={[styles.tabIcon,{tintColor:selectedTab==1?'grey':'black'}]}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomTab} onPress={()=>{ navigation.navigate('AddJob') }}>
                <Image source={require('../../images/more.png')} style={styles.tabIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomTab,{borderTopWidth:selectedTab==2?3:0, borderTopColor:'red'}]} onPress={()=>{ setSelectedTab(2)}}>
                <Image source={require('../../images/chat.png')} style={[styles.tabIcon,{tintColor:selectedTab==2?'grey':'black'}]}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomTab,{borderTopWidth:selectedTab==3?3:0, borderTopColor:'red'}]} onPress={()=>{ setSelectedTab(3)}}>
                <Image source={require('../../images/account.png')} style={[styles.tabIcon,{tintColor:selectedTab==3?'grey':'black'}]} />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
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

 
   
export default DashboardForCompany