import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { BG_Color, TEXT_Color } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import CustomTextInput from '../../components/CustomTextInput'
import CustomSolidBtn from '../../components/CustomSolidBtn'
import CustoBorderBtn from '../../components/CustomBorderBtn'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Loader from '../../components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
const LoginForCompany = () => {
                   
            const navigation=useNavigation();
      const [email, setEmail] = useState('');
      const [badEmail,setBadEmail]=useState('');
      const [password,setPassword]=useState('');
      const [badPassword,setBadPassword]=useState('');
      const [loading,setLoading]=useState(false);


      const validate=()=>{
        let validEmail=true
        let validPassword=true
    

        let emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
        if(email==''){
          validEmail=false
          setBadEmail('Please Enter Email')
        }
        else if(email!='' && !email.toString().match(emailRegex)){
          validEmail=false
          setBadEmail('Please Enter valid Email');
        }
        else if(email!='' && email.toString().match(emailRegex)){
          validEmail=true
          setBadEmail('');
        }
    
    
    
        
        if(password==''){
          validPassword=false
          setBadPassword('Please Enter Password')
        }
        else if(password!='' && password.length<6){
          validPassword=false
          setBadPassword('Please Enter Min 6 characters Password')
        }
        else if (password !='' && password.length>=6){
          validPassword=true
          setBadPassword('');
        }
    
        return   validEmail && validPassword
    
    
      }
      const loginUser=()=>{
        if (!validate()) {
          return;
        }
        try{
          firestore().collection('job_posters').where('email','==',email).get()
          .then(data=>{
            setLoading(false);
            console.log(data.docs);
            if(data.docs.length>0){
              let validPassword = false;
              data.docs.forEach(item=>{
                if(item.data().password==password){
                  validPassword = true;
                  setBadEmail('');
                  setBadPassword('');
                  goToNextScreen(item.id,item.data().email,item.data().name)
                }
                else{
                  setBadPassword('Wrong Password')
                }
              })
            }
            else{
             
                setBadEmail('User Does not exit')
            }
          })
        }
        catch (error) {
          setLoading(false)
          console.log(error);
        }
      }

      const goToNextScreen=async(id,email,name)=>{
        await AsyncStorage.setItem('NAME',name);
        await AsyncStorage.setItem('EMAIL',email);
        await AsyncStorage.setItem('USER_ID',id);
        await AsyncStorage.setItem('USER_TYPE','company');

        navigation.navigate('DashboardForCompany')
      }

  return (
    <SafeAreaView style={styles.container}>
       <Image source={require('../../images/splash.png')} style={styles.logo} />
       <Text style={styles.title}>Login</Text>
       <CustomTextInput value={email} onChangeText={txt=>{setEmail(txt)}} title={'Email'} placeholder={'xyz@gmail.com'} bad={badEmail!=''?true:false}/>
       {badEmail!='' && <Text style={styles.msgerror}>{badEmail}</Text>}
       <CustomTextInput value={password} onChangeText={txt=>{setPassword(txt)}} title={'Password'} placeholder={'********'} bad={badPassword!=''?true:false}/>
       {badPassword!='' && <Text style={styles.msgerror}>{badPassword}</Text>} 
       <Text style={styles.forgot}>Forgot Password</Text>
       <CustomSolidBtn title={'Login'} onClick={loginUser}/>
       <CustoBorderBtn title={'Create New Account'} onClick={()=>{
        navigation.navigate('SignUpForCompany')
       }}/>
       <Loader visible={loading}/>
    </SafeAreaView>
  )
}
 const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:BG_Color
    },
    logo:{
        width:scale(80),
        height:scale(80),
        alignSelf:'center',
        marginTop:moderateVerticalScale(50)
    },
    title:{
        fontSize:moderateScale(25),
        alignSelf:'center',
        fontWeight:'500',
        marginTop:moderateVerticalScale(30),
        color:TEXT_Color
    },
    forgot:{
      alignSelf:'flex-end',
      marginRight:moderateScale(20),
      marginTop:moderateVerticalScale(10),
      fontWeight:'500',
      fontSize:moderateScale(15),
      color:TEXT_Color
    },
    msgerror:{
      marginLeft:moderateScale(5),
      alignSelf:'flex-start',
      color:'red',

    }

 })
export default LoginForCompany