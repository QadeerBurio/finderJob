import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoLoginUser from '../../../components/NoLoginUser'
import { BG_Color, TEXT_Color } from '../../../utils/Colors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { moderateScale, scale } from 'react-native-size-matters'
import firestore from '@react-native-firebase/firestore'
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient'

const Proffile = () => {

  const navigation = useNavigation();

  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isUserName, setIsUserName] = useState(false);
  const [openUserModel, setOpenUserModel] = useState(false);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [openExpModal, setOpenExpModal] = useState(false);
  const [openEduModal, setOpenEduModal] = useState(false)
  const [skillsList, setSkillsList] = useState([]);
  const [expList, setExpList] = useState([]);
  const [eduList, setEduList] = useState([]);
  const [skill, setSkill] = useState('')

  // Experiance fields
  const [company, setCompany] = useState('');
  const [endYear, setEndYear] = useState('');
  const [startYear, setStartYear] = useState('');
  const [profile, setProfile] = useState('');
  //Education Fields
  const [college, setCollege] = useState('');
  const [endCollegeYear, setEndCollegeYear] = useState('');
  const [startCollegeYear, setStartCollegeYear] = useState('');
  const [degree, setDegree] = useState('');
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
    getProfileData();
    getSkills();
    getExp();
    getEdu();
  }, [isFocused])

  const getData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true);
      }
    }
  }

  const getProfileData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firestore().collection('users').doc(id).get().then(data => {
      console.log(data.data());
      setUserData(data.data());
    })
  }

  const addSkill = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firestore().collection('skills').add({
      skill: skill,
      userId: id
    }).then(() => {
      setSkill('');
      getSkills();
    })
  }

  const getSkills = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firestore().collection('skills').where('userId', '==', id).get().then((snapshot) => {
      let temp = [];
      snapshot.docs.forEach(item => {
        temp.push({ ...item.data(), skillId: item.id })
      })
      setSkillsList(temp)
      console.log(snapshot.docs);
    })
  }

  const deleteSkill = (id) => {
    firestore().collection('skills').doc(id).delete()
    getSkills();
  }


  ///Experiance
  const addExp = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firestore().collection('experiance').add({
      company,
      startYear,
      endYear,
      profile,
      userId: id
    }).then(() => {
      setCompany('');
      setStartYear('');
      setEndYear('');
      setProfile('');
      Alert.alert('Added Experiance')
      getExp();
    })
  }

  const getExp = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firestore().collection('experiance').where('userId', '==', id).get().then((snapshot) => {
      let temp = [];
      snapshot.docs.forEach(item => {
        temp.push({ ...item.data(), expId: item.id })
      })
      setExpList(temp)
      console.log(snapshot.docs);
    })
  }

  const deleteExp = (id) => {
    firestore().collection('experiance').doc(id).delete()
    getExp();
  }

  ///Education
  const addEdu = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firestore().collection('education').add({
      college,
      startCollegeYear,
      endCollegeYear,
      degree,
      userId: id
    }).then(() => {
      setCollege('');
      setStartCollegeYear('');
      setEndCollegeYear('');
      setDegree('');
      Alert.alert('Added Education')
      getEdu();
    })
  }

  const getEdu = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firestore().collection('education').where('userId', '==', id).get().then((snapshot) => {
      let temp = [];
      snapshot.docs.forEach(item => {
        temp.push({ ...item.data(), eduId: item.id })
      })
      setEduList(temp)
      console.log(snapshot.docs);
    })
  }

  const deleteEdu = (id) => {
    firestore().collection('education').doc(id).delete()
    getEdu();
  }


  const [profileImg,setProfileImg]=useState('');



  useEffect(() => {
   getImg();
   getBackImg();
  }, [isFocused])
  
  const getImg=async()=>{
     
     setProfileImg(await AsyncStorage.getItem('PROFILE_IMAGE'));
     if(img!=null){
      setProfileImg(img)
     }
  }

  const [backImg,setBackImg]=useState('')
  const getBackImg=async()=>{
     
    setBackImg(await AsyncStorage.getItem('BACK_IMAGE'));
    if(img!=null){
     setProfileImg(img)
    }
 }
  return (
    <ScrollView style={styles.container}>
        <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>

      <View>
        {!isLogin && <NoLoginUser
          desc={'manage your professional profile/Portfolio for attracting many jobs'}
          heading={'Easy Manage professional profile for Job'} />
        }
        <View>



        </View>
        {isLogin &&
          <View style={styles.mainView}>
            <View >
              <TouchableOpacity style={styles.usernameView} onPress={() => {
                setOpenUserModel(true);
              }}>
                <Text style={styles.username}>
                  {userData ? (userData.userName ? userData.userName : userData.name) : ''}
                </Text>
                <Image style={styles.arrw} source={require('../../../images/down.png')} />
              </TouchableOpacity>
            </View>
            <View >
            {backImg!=''?(
          <Image source={{uri:backImg}} style={{
                width: '100%',
                height: 170,
                position: 'absolute',
              }}/>
        ):(<Image source={require('../../../images/background.png')} style={{
                width: '100%',
                height: 170,
                position: 'absolute',
              }} />
        )}
              
              <View>
              <TouchableOpacity style={{ bottom: 0 }} onPress={()=>{
                navigation.navigate('ChangeBackground')
              }}>
                  <Image source={require('../../../images/camera.png')} style={{ width: scale(20), height: scale(20), justifyContent:'flex-end', flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginRight: moderateScale(10), marginBottom: moderateScale(10) }} />
                </TouchableOpacity>
                <View style={{marginTop:50, marginLeft:20}}>
                <TouchableOpacity>
        {profileImg!=''?(
          <Image source={{uri:profileImg}} style={styles.profileimg} />
        ):(<Image source={require('../../../images/man.png')} style={styles.profileimg} />
        )}
      </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: moderateScale(75), justifyContent:'flex-end', alignItems:'stretch', alignContent:'space-around' }} onPress={()=>{
                  navigation.navigate('ChangeImg')
                }}>
                  <Image source={require('../../../images/camera.png')} style={{ width: scale(30), height: scale(30), marginTop:-30 }} />
               </TouchableOpacity>
               
                </View>
              </View>
            </View>
            <Text style={styles.name}>{userData ? userData.name : ''}</Text>

            <Text style={styles.email}>
                  {userData ? (userData.bio ? userData.bio : userData.email) : ''}
                </Text>
            <TouchableOpacity style={styles.editbtn} onPress={() => {
              navigation.navigate('EditProfile')
            }}>
              <Text style={styles.edit}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={styles.headingView}>
              <Text style={styles.fields}>{'Skills'}</Text>
              <Text style={styles.fields} onPress={() => {
                setOpenSkillModal(true);
              }}>{'+'}</Text>
            </View>
            <View>
              <FlatList data={skillsList} renderItem={({ item, index }) => {
                return (
                  <View style={styles.skillItem}>
                    <Text style={styles.skillName}>{item.skill}</Text>
                    <TouchableOpacity style={styles.cross} onPress={() => {
                      deleteSkill(item.skillId);
                    }}>
                      <Image source={require('../../../images/cross-button.png')} style={[styles.closeIcon, { width: scale(16), height: scale(16) }]} />
                    </TouchableOpacity>
                  </View>
                )
              }} />
            </View>
            <View style={styles.headingView}>
              <Text style={styles.fields}>{'Experiance'}</Text>
              <Text style={styles.fields} onPress={() => {
                setOpenExpModal(true);
              }}>{'+'}</Text>
            </View>
            <View>
              <FlatList data={expList} renderItem={({ item, index }) => {
                return (
                  <View style={[styles.skillItem, { marginTop: moderateScale(15), height: scale(70) }]}>
                    <View>
                      <Text style={styles.skillName}>{item.company}</Text>
                      <Text style={styles.expYear}>{item.startYear + '-' + item.endYear}</Text>
                      <Text style={styles.skillName}>{item.profile}</Text>
                    </View>
                    <TouchableOpacity style={styles.cross} onPress={() => {
                      deleteExp(item.expId);
                    }}>
                      <Image source={require('../../../images/cross-button.png')} style={[styles.closeIcon, { width: scale(16), height: scale(16) }]} />
                    </TouchableOpacity>
                  </View>
                )
              }} />
            </View>
            <View style={styles.headingView}>
              <Text style={styles.fields}>{'Education'}</Text>
              <Text style={styles.fields} onPress={() => {
                setOpenEduModal(true);
              }}>{'+'}</Text>
            </View>
            <View>
              <FlatList contentContainerStyle={{ marginBottom: moderateScale(200) }} data={eduList} renderItem={({ item, index }) => {
                return (
                  <View style={[styles.skillItem, { marginTop: moderateScale(15), height: scale(70) }]}>
                    <View>
                      <Text style={styles.skillName}>{item.college}</Text>
                      <Text style={styles.expYear}>{item.startCollegeYear + '-' + item.endCollegeYear}</Text>
                      <Text style={styles.skillName}>{item.degree}</Text>
                    </View>
                    <TouchableOpacity style={styles.cross} onPress={() => {
                      deleteEdu(item.eduId);
                    }}>
                      <Image source={require('../../../images/cross-button.png')} style={[styles.closeIcon, { width: scale(16), height: scale(16) }]} />
                    </TouchableOpacity>
                  </View>
                )
              }} />
            </View>
          </View>
        }
        <Modal isVisible={openSkillModal} backdropOpacity={0.5} style={{ margin: 0 }}>
          <View style={styles.skillModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.title}>Add Skill</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => {
                setOpenSkillModal(false)
              }}>
                <Image source={require('../../../images/cross-button.png')} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <TextInput placeholderTextColor={'#9e9e9e'} placeholder='Enter Your Skill' style={styles.input} value={skill} onChangeText={txt => setSkill(txt)} />
            <TouchableOpacity style={styles.Btn} onPress={() => {
              setOpenSkillModal(false);
              if (skill != '') {
                addSkill();
              }
            }}>
              <Text style={styles.btnText}>Submit Skill</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={openExpModal} backdropOpacity={0.5} style={{ margin: 0 }}>
          <View style={styles.skillModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.title}>Add Experiance</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => {
                setOpenExpModal(false)
              }}>
                <Image source={require('../../../images/cross-button.png')} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <TextInput placeholderTextColor={'#9e9e9e'} placeholder='Enter Company Name' style={styles.input} value={company} onChangeText={txt => setCompany(txt)} />
            <TextInput placeholderTextColor={'#9e9e9e'} placeholder='Enter Start year' maxLength={4} keyboardType='numeric' style={styles.input} value={startYear} onChangeText={txt => setStartYear(txt)} />
            <TextInput placeholderTextColor={'#9e9e9e'} placeholder='Enter End year' maxLength={4} keyboardType='numeric' style={styles.input} value={endYear} onChangeText={txt => setEndYear(txt)} />
            <TextInput placeholderTextColor={'#9e9e9e'} placeholder='Enter Your Profile' style={styles.input} value={profile} onChangeText={txt => setProfile(txt)} />
            <TouchableOpacity style={styles.Btn} onPress={() => {
              setOpenExpModal(false);
              if (company != '' && startYear != '' && endYear != '') {
                addExp();
              }

            }}>
              <Text style={styles.btnText}>Submit Experiance</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={openEduModal} backdropOpacity={0.5} style={{ margin: 0 }}>
          <View style={styles.skillModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.title}>Add Education</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => {
                setOpenEduModal(false)
              }}>
                <Image source={require('../../../images/cross-button.png')} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <TextInput placeholderTextColor={'#9e9e9e'} placeholder='Enter College Name' style={styles.input} value={college} onChangeText={txt => setCollege(txt)} />
            <TextInput placeholderTextColor={'#9e9e9e'} placeholder='Enter Start year' maxLength={4} keyboardType='numeric' style={styles.input} value={startCollegeYear} onChangeText={txt => setStartCollegeYear(txt)} />
            <TextInput placeholderTextColor={'#9e9e9e'} placeholder='Enter End year' maxLength={4} keyboardType='numeric' style={styles.input} value={endCollegeYear} onChangeText={txt => setEndCollegeYear(txt)} />
            <TextInput placeholderTextColor={'#9e9e9e'} placeholder='Enter Degree' style={styles.input} value={degree} onChangeText={txt => setDegree(txt)} />
            <TouchableOpacity style={styles.Btn} onPress={() => {
              setOpenEduModal(false);
              if (college != '' && startCollegeYear != '' && endCollegeYear != '') {
                addEdu();
              }

            }}>
              <Text style={styles.btnText}>Submit Education</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={openUserModel} backdropOpacity={0.5} style={{ margin: 0 }}>
          <View style={styles.skillModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.title}>Add Education</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => {
                setOpenUserModel(false)
              }}>
                <Image source={require('../../../images/cross-button.png')} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.username}>{userData ? userData.userName : ''}</Text>
            <TouchableOpacity style={styles.Model}>
              <Image source={require('../../../images/more.png')} style={styles.model} />
              <Text style={styles.Textt}>Add New Account</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        
      </View>
      </LinearGradient>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,,0,0.5)'

  },
  mainView: {
    flex: 1,
  },
  profile: {
    width: 130,
    height: 130,
    paddingTop:100
    
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 7,
    color: TEXT_Color
  },
  email: {
    width:'45%',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
    color: TEXT_Color
  },
  editbtn: {
    width: '80%',
    height: 30,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 15,
    borderColor: 'black'
  },
  edit: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '900',
    fontSize: 15
  },
  headingView: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(30),
    alignSelf: 'center'
  },
  fields: {
    fontSize: moderateScale(20),
    fontWeight: '600',

    marginLeft: moderateScale(20),
    color: TEXT_Color
  },
  skillModal: {
    width: '100%',
    paddingBottom: moderateScale(20),
    backgroundColor: "white",
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
  },
  modalHeader: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: 'black',
  },
  closeIcon: {
    width: scale(24),
    height: scale(24)
  },
  input: {
    width: '90%',
    height: scale(40),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    marginTop: moderateScale(20),
    paddingLeft: moderateScale(15)
  },
  Btn: {
    width: '90%',
    height: scale(40),
    backgroundColor: TEXT_Color,
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    marginTop: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: BG_Color
  },
  skillItem: {
    width: '90%',
    alignSelf: 'center',
    height: scale(50),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: moderateScale(20)

  },
  skillName: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: TEXT_Color,
  },
  expYear: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(5)
  },
  usernameView: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 3
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,

    color: TEXT_Color
  },
  arrw: {
    width: 20,
    height: 20
  },
  Model: {
    width: '90%',
    height: 50,
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 3,
    marginLeft: 7,
    paddingLeft: 9,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 9

  },
  model: {
    width: 30,
    height: 30
  },
  Textt: {
    fontSize: 24,
    color: TEXT_Color,
    marginLeft: 8

  },
  profileimg:{
    width:scale(100),
    height:scale(100),
    borderRadius:scale(50),
    
    marginTop:moderateScale(20)
  },

})

export default Proffile