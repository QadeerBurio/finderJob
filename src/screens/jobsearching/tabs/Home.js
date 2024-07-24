import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { BG_Color, TEXT_Color } from '../../../utils/Colors';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import CustomSolidBtn from '../../../components/CustomSolidBtn';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(false);
  const isFocused = useIsFocused();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    getJobs();
  }, [isFocused]);

  const getData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    if (id != null && type != null) {
      if (type === 'user') {
        setIsLogin(true);
      }
    }
  };

  const getJobs = async () => {
    setLoading(true);
    try {
      const data = await firestore().collection('jobs').get();
      let temp = [];
      data.docs.forEach(item => {
        temp.push({ ...item.data(), id: item.id });
      });
      await AsyncStorage.setItem('JOBS', temp.length.toString());
      setJobs(temp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Text style={styles.title}>{item.jobTitle}</Text>
      <Text style={styles.desc}>{item.jobDesc}</Text>
      <Text style={styles.sal}>{"Salary: " + item.salary + ' L/year'}</Text>
      <Text style={styles.sal}>{"Category: " + item.category}</Text>
      <Text style={styles.sal}>{"Skill: " + item.skill}</Text>
      <View style={styles.bottomView}>
                <TouchableOpacity style={styles.editBtn}
                  onPress={() => {
                    navigation.navigate('JobDetails',{ data: item });
                  }}>
                  <Text style={{color:'black'}}>Check It</Text>
                </TouchableOpacity>
                
                </View>
                </View>

  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.searchBox} 
            onPress={() => navigation.navigate('SearchJob')}
          >
            <Image source={require('../../../images/search.png')} style={styles.icon} />
            <Text style={styles.placeholder}>Search Job Here...</Text>
          </TouchableOpacity>

          {!isLogin && (
            <View>
              <Text style={styles.heading}>You are one step away from getting a good job..</Text>
              <View style={styles.notes}>
                <Image source={require('../../../images/star.png')} style={styles.icon} />
                <Text style={styles.note}>Get Jobs after Creating Account</Text>
              </View>
              <View style={styles.notes}>
                <Image source={require('../../../images/star.png')} style={styles.icon} />
                <Text style={styles.note}>Chat with recruiter directly</Text>
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity 
                  style={styles.loginBtn} 
                  onPress={() => navigation.navigate('LoginForUser')}
                >
                  <Text style={[styles.btnText, { color: BG_Color }]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.SignupBtn} 
                  onPress={() => navigation.navigate('SignupForUser')}
                >
                  <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          { loading ? (
            <ActivityIndicator size="large" color={TEXT_Color} style={styles.loader} />
          ) : (
            jobs.length > 0 && isLogin ? (
              <FlatList 
                data={jobs} 
                renderItem={renderJobItem} 
                
                keyExtractor={item => item.id} 
                contentContainerStyle={styles.jobList}
              />
            ) :  (
              <View style={styles.emptyView}>
                <Text>Empty Jobs</Text>
              </View>
            )
          )}

          <View style={styles.jobSearchCard}>
            <Image source={require('../../../images/animation.gif')} style={styles.gif} />
            <TextInput style={styles.input} placeholder='Enter Job Title' />
            <TextInput style={[styles.input, { marginTop: moderateScale(10) }]} placeholder='Enter Job Category' />
            <CustomSolidBtn title={'Search Jobs'} onClick={() => { }} />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_Color,
  },
  scrollViewContent: {
    paddingBottom: moderateScale(20),
  },
  searchBox: {
    width: '90%',
    height: verticalScale(40),
    borderWidth: 0.8,
    alignSelf: "center",
    marginTop: moderateScale(20),
    borderRadius: moderateScale(30),
    borderColor: 'white',
    flexDirection: 'row',
    paddingLeft: moderateScale(15),
    alignItems: 'center',
  },
  icon: {
    width: scale(16),
    height: scale(16),
    tintColor: 'white',
  },
  placeholder: {
    marginLeft: moderateScale(10),
    color: 'white',
  },
  heading: {
    color: TEXT_Color,
    fontWeight: '700',
    fontSize: moderateScale(22),
    alignSelf: 'center',
    width: '90%',
    marginTop: moderateScale(10),
  },
  notes: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  note: {
    marginLeft: moderateScale(10),
  },
  btnView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  loginBtn: {
    width: '45%',
    height: verticalScale(30),
    backgroundColor: TEXT_Color,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignupBtn: {
    width: '45%',
    height: verticalScale(30),
    borderColor: TEXT_Color,
    borderWidth: 1,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '600',
    fontSize: moderateScale(15),
  },
  jobItem: {
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  desc: {
    fontSize: moderateScale(14),
    marginVertical: moderateScale(5),
  },
  sal: {
    fontSize: moderateScale(14),
    marginVertical: moderateScale(2),
  },
  emptyView: {
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  jobSearchCard: {
    width: '90%',
    paddingBottom: moderateScale(20),
    alignSelf: 'center',
    marginTop: moderateScale(10),
    backgroundColor: '#f2f2f2',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(70),
  },
  gif: {
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    height: verticalScale(35),
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    paddingLeft: moderateScale(10),
  },
  loader: {
    marginTop: moderateScale(20),
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
  editBtn: {
    width: "30%",
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  bottomView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: moderateScale(10)
  },
});

export default Home;
