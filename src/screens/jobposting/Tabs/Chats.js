import { View, Text, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoLoginUser from '../../../components/NoLoginUser'
import { BG_Color, TEXT_Color } from '../../../utils/Colors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { moderateScale, scale } from 'react-native-size-matters'
import firestore from '@react-native-firebase/firestore'
import LinearGradient from 'react-native-linear-gradient'

const Chats = () => {
  const navigation=useNavigation();
  let id=''
    const [users,setUsers]=useState([]);
    const isFocused=useIsFocused();
    useEffect(() => {
      getData();
      getUsers();
      searchUsers();
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
  
    const getUsers= async(email)=>{
      let temp=[];
      const mEmail= await AsyncStorage.getItem('EMAIL', email);
      firestore().collection('job_posters').where('email','!=',mEmail).get().then(res=>{
        if(res.docs!=[]){
          res.docs.map(item=>{
            temp.push(item.data());
          })
        }
        setUsers(temp);
        
      })
    }
    const searchUsers = async (txt) => {
      if (txt.trim() === '') {
        setUsers([]);
        return;
      }
  
      setLoading(true);
  
      try {
        const querySnapshot = await firestore()
          .collection('job_posters')
          .where('name', '>=', txt)
          .where('name', '<=', txt + '\uf8ff') // Using a range to handle partial matches
          .get();
          
        let temp = [];
        querySnapshot.docs.forEach(doc => {
          temp.push({ ...doc.data(), id: doc.id });
        });
        setUsers(temp);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
  return (
    <View style={styles.container}>
          <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>

    
       
      <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.title}>Chat</Text>
            </View>
            <FlatList data={users} renderItem={({item, index})=>{
              return(
                <TouchableOpacity style={styles.userItem} onPress={()=>{
                  navigation.navigate('NewMsg', {data:item, id:id})
                }}>
                
                <Image source={require('../../../images/man.png')} style={styles.userIcon} />
                <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
              )
            }} />
      </View>
      
      </LinearGradient>
    </View>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:BG_Color
  },
  header:{
    width:'100%',
    height:40,
    backgroundColor:TEXT_Color,
    elevation:5,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    
    fontSize:moderateScale(20),
    fontWeight:'600',
    color:'purple',
  },
  userItem:{
    width:Dimensions.get('window').width-50,
    alignSelf:'center',
    marginTop:20,
    flexDirection:'row',
    borderRadius:10,
    borderWidth:.5,
    height:60,
    alignSelf:'center',
    paddingLeft:10

  },
  userIcon:{
    width:scale(40),
    height:scale(40),
    
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  name:{
    color:'black',
    marginLeft:20,
    fontSize:25,
    alignSelf:'center'
  }
})

export default Chats

