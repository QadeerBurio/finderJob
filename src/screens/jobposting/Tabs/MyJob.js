import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_Color, TEXT_Color } from '../../../utils/Colors'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const MyJob = () => {

  const navigation = useNavigation();

  const isFocused = useIsFocused();
  const [jobs, setJobs] = useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    getJobs();
  }, [isFocused])

  const getJobs = async () => {
    setLoading(true);
    let id = await AsyncStorage.getItem("USER_ID")
    firestore().collection('jobs').where("postedBy", '==', id).get()
      .then(async (data) => {
        setLoading(false)
        let temp = [];
        data.docs.forEach(item => {
          temp.push({ ...item.data(), id: item.id })
        })
        await AsyncStorage.setItem('JOBS', temp.length + "")
        setJobs(temp);
      })
  }


  const deleteJob = (id) => {

    firestore().collection('jobs').doc(id).delete().then(() => {
      getJobs
    })
  }




  return (
    <View style={styles.container}>
      <Text style={styles.heading}>FindMyJob</Text>

      {loading && ( <View>
        <FlatList sty data={[1,2,3]} renderItem={()=>{
          return(
            <View style={styles.loaderView}>
         <ShimmerPlaceholder style={styles.loaderTitle} />
         <ShimmerPlaceholder style={styles.loaderTitle} />
         <ShimmerPlaceholder style={styles.loaderTitle} />
         <ShimmerPlaceholder style={styles.loaderTitle} />
         <ShimmerPlaceholder style={styles.loaderTitle} />
         <View style={styles.loaderBottomView}>
         <ShimmerPlaceholder style={styles.loaderBtn} />
         <ShimmerPlaceholder style={styles.loaderBtn} />
      </View>
      </View>
          )
        }} />
      </View>)}
       {jobs.length > 0 ? (
        <FlatList data={jobs} renderItem={({ item, index }) => {

          return (
            <View style={styles.jobItem} >
              <Text style={styles.title}>{item.jobTitle}</Text>
              <Text style={styles.desc}>{item.jobDesc}</Text>
              <Text style={styles.sal}>{"Salary:" + item.salary + 'L/year'}</Text>
              <Text style={styles.sal}>{"Category:" + item.category + ""}</Text>
              <Text style={styles.sal}>{"Skill:" + item.skill}</Text>
              <View style={styles.bottomView}>
                <TouchableOpacity style={styles.editBtn}
                  onPress={() => {
                    navigation.navigate('EditJob', { data: item });
                  }}>
                  <Text>Edit Job</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn}
                  onPress={() => {
                    deleteJob(item.id);
                  }}>
                  <Text style={{ color: 'red' }}>Delete Job</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }} />
      ) : (
        <View style={styles.emptyView}>
          <Text>Empty Jobs</Text>
        </View>
       
      )} 
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_Color
  },
  heading: {
    fontSize: moderateScale(20),
    marginLeft: moderateScale(10),
    fontWeight: '600',
    color: TEXT_Color
  },
  jobItem: {
    width: '90%',
    marginTop: moderateScale(20),
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: moderateScale(20),
    padding: moderateScale(15)
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: TEXT_Color
  },
  desc: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginTop: moderateScale(5),
    color: TEXT_Color
  },
  sal: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    marginTop: moderateScale(5),
    color: TEXT_Color
  },
  bottomView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: moderateScale(20),
    alignItems: 'center',
    marginTop: moderateScale(10)
  },
  editBtn: {
    width: "40%",
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteBtn: {
    width: "40%",
    height: verticalScale(30),
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loaderView:{
    width:'90%',
    height:verticalScale(150),
    alignSelf:'center',
    marginTop:moderateScale(20),
    marginBottom:moderateScale(10)
  },
  loaderTitle:{
    width:'70%',
    height:verticalScale(20),
    borderRadius:moderateScale(10),
    marginTop:moderateScale(10)
  },
  loaderBottomView:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:moderateScale(10)
  },
  loaderBtn:{
    width:'40%',
    height:verticalScale(30),
    borderRadius:moderateScale(10),
    marginBottom:moderateScale(10)
  }


})
export default MyJob