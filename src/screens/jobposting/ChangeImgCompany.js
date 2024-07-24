import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BG_Color, TEXT_Color } from '../../utils/Colors'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import CustomSolidBtn from '../../components/CustomSolidBtn'
import CustoBorderBtn from '../../components/CustomBorderBtn'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Loader from '../../components/Loader'
const ChangeImgCompany = () => {

    const navigation=useNavigation();

      const [imageData,setImageData]=useState(null);
      const [loading,setLoading]=useState(false)
    const openGallery=async()=>{
        const res=await launchImageLibrary({mediaType:'photo'})
        if(!res.didCancel){
            setImageData(res)
        }
    }
    const openCamera=async()=>{
        const res=await launchImageLibrary({mediaType:'photo'})
        if(!res.didCancel){
            setImageData(res)
        }
    }

    const uploadImg=async()=>{
        setLoading(true)
        const id=await AsyncStorage.getItem("USER_ID")
        const reference = storage().ref(imageData.assets[0].fileName);
         // path to existing file on filesystem
         const pathToFile = imageData.assets[0].uri;
         // uploads file
         await reference.putFile(pathToFile);
         const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();

         firestore().collection('job_posters').doc(id).update({
            profileImage:url
            
        }).then(async() => {
            setLoading(false)
            await AsyncStorage.setItem('PROFILE_IMAGE',url)
        navigation.goBack()
        })
        .catch(error=>{
            setLoading(false)
            console.log(error)
        })
    }


  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Image style={styles.back} source={require('../../images/back.png')} />
                </TouchableOpacity>
                
                <Text style={styles.editProfile}>Change Image</Text>
                </View>
                {imageData==null?(
                    <Image source={require('../../images/man.png')} style={styles.man} />
                ):(
                    <Image source={{uri: imageData.assets[0].uri}} style={styles.man} />
                )}
                <CustoBorderBtn title={'Choose Image From Gallery'} onClick={()=>{
                    openCamera()
                }}/>
                {imageData!=null && <CustomSolidBtn title={'Upload Profile'} onClick={()=>{
                    uploadImg();
                }}/>}
                <Loader visible={loading}/>
                
            

    </SafeAreaView>
  )
}
  
  const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:BG_Color
    },
    header: {
        width: '100%',
        height: verticalScale(45),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: moderateScale(20)
    },
    back: {
        width: scale(18),
        height: scale(18),
        color: TEXT_Color
    },
    editProfile: {
        fontSize: moderateScale(22),
        marginLeft: moderateScale(15),
        fontWeight: '700',
        color: TEXT_Color
    },
    man:{
        width:scale(150),
        height:scale(150),
        alignSelf:'center',
        borderRadius:scale(150),
        marginTop:moderateScale(50)
    },
    pick:{
        padding:moderateScale(10),
        borderWidth:1,
        width:'55%',
        alignSelf:'center',
        textAlign:'center',
        borderRadius:moderateScale(10),
        marginTop:moderateScale(50)
        
    }
  })
export default ChangeImgCompany