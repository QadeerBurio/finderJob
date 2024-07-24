import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, Modal, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BG_Color } from '../../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CustomDropDown from '../../../components/CustomDropDown';
import CustomSolidBtn from '../../../components/CustomSolidBtn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { profiles } from '../../../utils/Profiles';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../../components/CustomTextInput';

const EditJob = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [jobTitle, setJobTitle] = useState(route.params.data.jobTitle);
  const [jobDesc, setJobDesc] = useState(route.params.data.jobDesc);
  const [experiance, setExperiance] = useState(route.params.data.experiance);
  const [salary, setSalary] = useState(route.params.data.salary);
  const [company, setCompany] = useState(route.params.data.company);
  const [openCategoryModal, setCategoryModal] = useState(false);
  const [openSkillModal, setSkillModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [loading, setLoading] = useState(false);

  // for validation
  const [badJobTitle, setBadJobTitle] = useState('');
  const [badJobDesc, setBadJobDesc] = useState('');
  const [badExperiance, setBadExperiance] = useState('');
  const [badSalary, setBadSalary] = useState('');
  const [badCompany, setBadCompany] = useState('');
  const [badJobCategory, setBadJobCategory] = useState('');
  const [badJobSkill, setBadJobSkill] = useState('');

  useEffect(() => {
    profiles.map((item, index) => {
      if (item.category == route.params.data.category) {
        setSelectedCategory(index);
        item.keywords.map((x) => {
          if (x[0] == route.params.data.skill) {
            setSelectedSkill(x[0]);
          }
        });
      }
    });
  }, []);

  const postJob = async () => {
    let id = await AsyncStorage.getItem('USER_ID');
    let name = await AsyncStorage.getItem('NAME');
    setLoading(true);
    firestore()
      .collection('jobs')
      .doc(route.params.data.id)
      .update({
        postedBy: id,
        posterName: name,
        jobTitle: jobTitle,
        jobDesc,
        experiance,
        salary,
        company,
        skill: selectedSkill,
        category: selectedCategory !== null ? profiles[selectedCategory].category : '',
      })
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

      
  };


  const validate = () => {

    let validJobTitle = true;
    let validJobDesc = true;
    let validExperiance = true;
    let validSalary = true;
    let validCompany = true;
    let validCategory = true;
    let validSkill = true;

    if (jobTitle == '') {
      validJobTitle = false;
      setBadJobTitle('Please Enter Job Title');
    } else if (jobTitle != '') {
      validJobTitle = true;
      setBadJobTitle('');
    }

    if (jobDesc == '') {
      validJobDesc = false;
      setBadJobDesc('Please Enter Job Description');
    } else if (jobDesc != '' && jobDesc.length < 20) {
      validJobDesc = false;
      setBadJobDesc(' Please Enter Job Description min: 20 character');
    } else if (jobDesc != '' && jobDesc.length > 50) {
      validJobDesc = true;
      setBadJobDesc('')
    }

    let expRegex = /^\d+$/;

    if (experiance == '') {
      validExperiance = false;
      setBadExperiance('Please Enter Experiance');
    } else if (experiance != '' && experiance.length > 1) {
      validExperiance = false;
      setBadExperiance('Please Enter Valid Experiance');
    } else if (experiance != '' && experiance.length < 3 && !experiance.match(expRegex)) {
      validExperiance = false;
      setBadExperiance('Please Enter Valid Experiance');
    } else if (experiance != '' && experiance.length < 3 && experiance.match(expRegex)) {
      validExperiance = true;
      setBadExperiance('');
    }

    if (salary == '') {
      validSalary = false;
      setBadSalary('Please Enter  Salary');
    } else if (salary != '' && !salary.match(expRegex)) {
      validSalary = false;
      setBadSalary('Please Enter valid Salary');
    } else if (salary != '' && salary.match(expRegex)) {
      validSalary = true;
      setBadSalary('');
    }

    if (company == '') {
      validCompany = false;
      setBadCompany('Please Enter Company');
    } else if (company != '') {
      validCompany = true;
      setBadCompany('');
    }

    if (selectedCategory === null) {
      validCategory = false;
      setBadJobCategory('Please Select Category');
    } else if (selectedCategory != 'Select Category') {
      validCategory = true;
      setBadJobCategory('');
    }

    if (selectedSkill === '') {
      validSkill = false;
      setBadJobSkill('Please Enter Job skill');
    } else if (selectedSkill != 'Select Skill') {
      validSkill = true;
      setBadJobSkill('');
    }

    return validJobTitle && validJobDesc && validCategory && validCompany && validExperiance && validSalary && validSkill

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image style={styles.back} source={require('../../../images/left-arrow.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Job</Text>
      </View>
      <CustomTextInput value={jobTitle} onChangeText={txt => { setJobTitle(txt) }} title={'Job Title'} placeholder={'ex. web developer'} bad={badJobTitle != '' ? true : false} />
      {badJobTitle != '' && <Text style={styles.msgerror}>{badJobTitle}</Text>}
      <CustomTextInput value={jobDesc} onChangeText={txt => { setJobDesc(txt) }} title={'Job Description'} placeholder={'ex: This is full Stack Developer'} bad={badJobDesc != '' ? true : false} />
      {badJobDesc != '' && <Text style={styles.msgerror}>{badJobDesc}</Text>}
      <CustomDropDown value={jobDesc} onChangeText={txt => { setJobDesc(txt) }} title={'Category'} placeholder={selectedCategory !== null ? profiles[selectedCategory].category : 'Select Category'}
        onClick={() => {
          setCategoryModal(true);
        }} bad={badJobCategory != '' ? true : false} />
      {badJobCategory != '' && <Text style={styles.msgerror}>{badJobCategory}</Text>}
      <CustomDropDown value={jobDesc} onChangeText={txt => { setJobDesc(txt) }} title={'Skills'}
        placeholder={selectedSkill}
        onClick={() => {
          setSkillModal(true);
        }} bad={badJobSkill != '' ? true : false}/>
      {badJobSkill != '' && <Text style={styles.msgerror}>{badJobSkill}</Text>}
      <CustomTextInput value={experiance} onChangeText={txt => { setExperiance(txt) }} keyboardType={'number-pad'} title={'Experiance'} placeholder={'ex: required experiance 2years'} bad={badExperiance != '' ? true : false} />
      {badExperiance != '' && <Text style={styles.msgerror}>{badExperiance}</Text>}
      <CustomTextInput value={salary} onChangeText={txt => { setSalary(txt) }} title={'Salary'} keyboardType={'number-pad'} placeholder={'ex: 100000'} bad={badSalary != '' ? true : false} />
      {badSalary != '' && <Text style={styles.msgerror}>{badSalary}</Text>}
      <CustomTextInput value={company} onChangeText={txt => { setCompany(txt) }} title={'Company'} placeholder={'ex: Google'} bad={badCompany != '' ? true : false} />
      {badCompany != '' && <Text style={styles.msgerror}>{badCompany}</Text>}
      <CustomSolidBtn title={'Update Job'} onClick={() => {
        if (validate()) {
          postJob();
        }
      }} />

      <Modal visible={openCategoryModal} transparent style={{ flex: 1 }}>
        <View style={styles.mainView}>
          <View style={styles.listingView}>
            <Text style={[styles.title, { marginTop: moderateScale(20) }]}>Select Category</Text>
            <FlatList
              data={profiles}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    setSelectedCategory(index);
                    setCategoryModal(false);
                  }}
                >
                  <Text>{item.category}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={openSkillModal} transparent style={{ flex: 1 }}>
        <View style={styles.mainView}>
          <View style={styles.listingView}>
            <Text style={[styles.title, { marginTop: moderateScale(20) }]}>Select Skill</Text>
            <FlatList
              data={selectedCategory !== null ? profiles[selectedCategory].keywords : []}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.profileItem}
                  onPress={() => {
                    setSelectedSkill(item[0]);
                    setSkillModal(false);
                  }}
                >
                  <Text>{item[0]}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>

      <Loader visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_Color,
  },
  header: {
    width: '100%',
    height: verticalScale(45),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(20),
  },
  back: {
    width: scale(16),
    height: scale(16),
  },
  title: {
    fontSize: moderateScale(20),
    marginLeft: moderateScale(20),
    fontWeight: '600',
  },
  mainView: {
    backgroundColor: 'rgba(0,0,0,.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listingView: {
    width: '90%',
    height: '80%',
    borderRadius: moderateScale(10),
    backgroundColor: BG_Color,
  },
  profileItem: {
    width: '90%',
    height: moderateScale(40),
    justifyContent: 'center',
    paddingLeft: moderateScale(20),
    alignSelf: 'center',
    borderBottomWidth: 0.4,
  },
  msgerror: {
    marginLeft: moderateScale(5),
    alignSelf: 'flex-start',
    color: 'red',
  },
});

export default EditJob;
