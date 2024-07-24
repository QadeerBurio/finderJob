import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_Color, TEXT_Color } from '../../utils/Colors'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import LinearGradient from 'react-native-linear-gradient'

const JobDetails = () => {
    const route = useRoute();
    const navigation=useNavigation()
    const [isLogin,setIsLogin]=useState(false)
    const [isJobSaved,setIsJobsSaved]=useState(false);
    const [savedJobId,setSavedJobId]=useState('');
    const [savedAppliedJobs,setSavedAppliedJobs]=useState('');
    const [appliedJobId,setAppliedJobId]=useState('');

    const isFocused=useIsFocused();
    useEffect(() => {
      getData();
      getSavedJobs();
      getAppliedJobs();
    }, [isFocused])
    
     const getData=async()=>{
      const id= await AsyncStorage.getItem("USER_ID");
      const type= await AsyncStorage.getItem("USER_TYPE");
      if(id!=null && type!=null){
        if(type=='user'){
          setIsLogin(true)
        }
      }
    }

    const saveJobs=async()=>{
        const id= await AsyncStorage.getItem("USER_ID");
        firestore().collection('saved_jobs').add({
            ...route.params.data,
            userId: id
        }).then(()=>{
            console.log('jobs saved');
            getSavedJobs()
        })
    }
    const applyJobs=async()=>{
        const id= await AsyncStorage.getItem("USER_ID");
        firestore().collection('applied_jobs').add({
            ...route.params.data,
            userId: id
        }).then(()=>{
            console.log('jobs applied Successfully');
            getAppliedJobs()
        })
    }

    const getSavedJobs=async()=>{
        const id= await AsyncStorage.getItem("USER_ID");
        firestore().collection('saved_jobs').where('userId','==', id).get().then(querySnapshot=>{
            console.log(querySnapshot.docs)
            if(querySnapshot.docs.length>0){
                querySnapshot.docs.forEach(item => {
                    if(item.data().id==route.params.data.id){
                        setIsJobsSaved(true);
                        setSavedJobId(item.id)
                    }
                    
                });
            }else{
                setIsJobsSaved(false);
                setSavedJobId('');
            }
            
        })
    }
    const getAppliedJobs=async()=>{
        const id= await AsyncStorage.getItem("USER_ID");
        firestore().collection('applied_jobs').where('userId','==', id).get().then(querySnapshot=>{
            console.log(querySnapshot.docs)
            if(querySnapshot.docs.length>0){
                querySnapshot.docs.forEach(item => {
                    if(item.data().id==route.params.data.id){
                        setSavedAppliedJobs(true);
                        setAppliedJobId(item.id)
                    }
                    
                });
            }else{
                setSavedAppliedJobs(false);
                setAppliedJobId('');
            }
            
        })
    }

    const removeSavedJob=()=>{
        firestore().collection('saved_jobs').doc(savedJobId).delete().then(()=>{
            getSavedJobs();
            
        })
    }

    const cancelAppliedJobs=()=>{
        firestore().collection('applied_jobs').doc(appliedJobId).delete().then(()=>{
            getAppliedJobs();
            
        })
    }

    return (
        <View style={styles.container}>
              <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>

            <Text style={styles.title}>{route.params.data.jobTitle}</Text>
            <View style={styles.View}>
                <Text>{"Posted By : "+route.params.data.posterName}</Text>
                <Text></Text>
            </View>
            <Text style={styles.desc}>{route.params.data.jobDesc}</Text>
            <Text style={styles.sub_Title}>{"Experiance Required :  " + route.params.data.experiance + "years"}</Text>
            <Text style={styles.subTitle}>{"Category :  " + route.params.data.category}</Text>
            <Text style={styles.subTitle}>{"Skill Required:  " + route.params.data.skill}</Text>
            <Text style={styles.subTitle}>{"Salary :  " + route.params.data.salary + ' LPA'}</Text>
            <Text style={styles.subTitle}>{"Company : "+route.params.data.company}</Text>
            <TouchableOpacity style={styles.contactus} onPress={()=>{
                navigation.navigate('ContactUs')
            }}>
                <Text>Contact Us</Text>
            </TouchableOpacity>
            <View style={styles.bottomView}>
            <TouchableOpacity style={styles.saveBtn} disabled={isLogin? false:true} onPress={()=>{
                if(isJobSaved){
                    removeSavedJob();
                }else{
                    saveJobs();
                }
                
            }}>
            <Image source={isJobSaved? require('../../images/lover.png'):require('../../images/heart.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity disabled={isLogin? false:true} style={[styles.appliesBtn,{backgroundColor:isLogin?'red':'#9e9e9e'}]}
            onPress={()=>{
                if(!savedAppliedJobs){
                    applyJobs();
                }else{
                    cancelAppliedJobs();
                }
            }}
            >
            <Text>{savedAppliedJobs?'Applied':'Apply'}</Text>
            </TouchableOpacity>
            </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_Color
    },
    title: {
        fontSize: moderateScale(30),
        alignSelf: 'center',
        fontWeight: '600',
        width: '90%',
        marginTop: moderateScale(20),
        color: TEXT_Color,

    },
    desc: {
        width: '90%',
        marginTop: moderateScale(20),
        fontSize: moderateScale(16),
        fontWeight: '600',
        alignSelf: 'center'
    },
    subTitle: {
        marginTop: moderateScale(10),
        fontWeight: '600',
        fontSize: moderateScale(16),
        marginLeft: moderateScale(20)
    },
    sub_Title: {
        marginTop: moderateScale(20),
        fontWeight: '600',
        fontSize: moderateScale(16),
        marginLeft: moderateScale(20)
    },
    View: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(10)
    },
    bottomView:{
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center',
        alignItems:'center',
        position:'absolute',
        bottom:moderateScale(40),
        
    },
    saveBtn:{
        width:'25%',
        height:verticalScale(35),
        borderWidth:0.5,
        borderRadius:moderateScale(10),
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center'
    },
    icon:{
        width:scale(24),
        height:scale(24)
    },
    appliesBtn:{
        width:'70%',
        height:verticalScale(40),
        backgroundColor:TEXT_Color,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:moderateScale(10)
    },
    btnText:{
        color:BG_Color,
        fontSize:moderateScale(16)
    },
    contactus: {
    width: "80%",
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginTop:40,
    
  },
})
export default JobDetails