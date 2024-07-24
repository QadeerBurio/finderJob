import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoLoginUser from '../../../components/NoLoginUser'
import { BG_Color, TEXT_Color } from '../../../utils/Colors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import { moderateScale, scale } from 'react-native-size-matters'
import LinearGradient from 'react-native-linear-gradient'

const Applies = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [isLogin,setIsLogin]=useState(false)
  const isFocused=useIsFocused();
  useEffect(() => {
    getData();
    getJobs();
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


  

   

    const getJobs = async () => {
        const id = await AsyncStorage.getItem("USER_ID");
        firestore().collection('applied_jobs').where('userId', '==', id).get().then(querySnapshot => {
            console.log(querySnapshot.docs);
            let temp = [];
            querySnapshot.docs.forEach(item => {
                temp.push({ ...item.data(), savedId:item.id});
            });
            setJobs(temp);
        })
    };
    const removeSavedJob=(id)=>{
        firestore().collection('applied_jobs').doc(id).delete().then(()=>{
            getJobs();
            
        })
    }

  return (
    <View style={styles.container}>
          <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>

    {!isLogin && <NoLoginUser
      desc={'track your all jobs which you applied but for that you need to create account'}
       heading={'One place to track all your application'}/> }

       {isLogin && jobs.length>0 ? <FlatList 
                data={jobs} 
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity 
                            style={styles.jobItem} 
                            onPress={() => {
                                navigation.navigate('JobDetails', { data: item });
                            }}
                        >
                            <View style={styles.topView}>
                                <Text style={styles.item}>{item.jobTitle}</Text>
                                <TouchableOpacity onPress={()=>{
                                    removeSavedJob(item.savedId);
                                }}>
                                    <Image
                                     source={require('../../../images/lover.png')} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.subTitle}>{"Job Category: " + item.category}</Text>
                            <Text style={styles.subTitle}>{"Posted By: " + item.posterName}</Text>
                        </TouchableOpacity>
                    )
                }} 
            />:null}
            {isLogin && jobs.length<1?( <View style={styles.emptyView}>
                <Text style={styles.empty}>No Saved Jobs</Text>
                </View>):null}
      </LinearGradient>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:BG_Color
  },
  icon: {
    width: scale(16),
    height: scale(16),
    
},
jobItem: {
    width: '90%',
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    padding: moderateScale(10),
    borderRadius: moderateScale(10)
},
item: {
    fontSize: moderateScale(22),
    width: '90%',
    fontWeight: '600',
    color: TEXT_Color
},
subTitle: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: TEXT_Color,
    marginTop: moderateScale(5),
},
topView: {
    flexDirection: "row",
    alignItems: 'center',
    width: '100%'
},
emptyView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    empty:{
        fontSize:30,
        fontWeight:'600'
    }
})

export default Applies