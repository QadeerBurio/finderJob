import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BG_Color, TEXT_Color } from '../../utils/Colors';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import CustomTextInput from '../../components/CustomTextInput';
import CustomSolidBtn from '../../components/CustomSolidBtn';
import CustomBorderBtn from '../../components/CustomBorderBtn';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UpdateProfileForCompany = () => {
    // Navigation
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [badName, setBadName] = useState('');
    const [email, setEmail] = useState('');
    const [badEmail, setBadEmail] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);
    const [contact, setContact] = useState('');
    const [badContact, setBadContact] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [badCompanyName, setBadCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [badAddress, setBadAddress] = useState('');
    const [password, setPassword] = useState('');

    const validate = () => {
        let nameRegex = /^[A-Za-z]+$/;
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let contactRegex = /^\d+$/;

        let validName = true;
        let validEmail = true;
        let validContact = true;
        let validCompanyName = true;
        let validAddress = true;

        // Validate Name
        if (name == '') {
            validName = false;
            setBadName('Please Enter Name');
        } else if (name.length < 3 || !name.match(nameRegex)) {
            validName = false;
            setBadName('Please Enter Valid Name');
        } else {
            validName = true;
            setBadName('');
        }

        // Validate Email
        if (email == '') {
            validEmail = false;
            setBadEmail('Please Enter Email');
        } else if (!email.match(emailRegex)) {
            validEmail = false;
            setBadEmail('Please Enter valid Email');
        } else {
            validEmail = true;
            setBadEmail('');
        }

        // Validate Contact
        if (contact == '') {
            validContact = false;
            setBadContact('Please Enter Contact');
        } else if (contact.length < 10 || !contact.match(contactRegex)) {
            validContact = false;
            setBadContact('Please Enter Valid Contact');
        } else {
            validContact = true;
            setBadContact('');
        }

        // Validate Company Name
        if (companyName == '') {
            validCompanyName = false;
            setBadCompanyName('Please Enter Company Name');
        } else if (companyName.length < 5) {
            validCompanyName = false;
            setBadCompanyName('Please Enter Valid Company Name');
        } else {
            validCompanyName = true;
            setBadCompanyName('');
        }

        // Validate Address
        if (address == '') {
            validAddress = false;
            setBadAddress('Please Enter Address');
        } else if (address.length < 5) {
            validAddress = false;
            setBadAddress('Please Enter Valid Address');
        } else {
            validAddress = true;
            setBadAddress('');
        }

        

        return validName && validEmail && validContact && validCompanyName && validAddress;
    }

    const updateUser = async () => {
        if (!validate()) {
            return;
        }
        const id=await AsyncStorage.getItem("USER_ID")
        setLoading(true);
        try {
            await firestore().collection('job_posters').doc(id).update({
                name,
                email,
                contact,
                companyName,
                address,
                
            }).then(async() => {
                await AsyncStorage.setItem('NAME',name)
            navigation.goBack()
            })

            // Alert.alert("Success", "User registered successfully!");
        } catch (error) {
            setLoading(false);
            console.log('Please correct fields', error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
      getData()
    }, [])
    
 
    const getData= async()=>{
        const mEmail=await AsyncStorage.getItem("EMAIL");
        firestore().collection('job_posters').where("email",'==',mEmail)
        .get().then(res=>{
            res.docs.forEach(item=>{
                setName(item.data().name);
                setEmail(item.data().email);
                setContact(item.data().contact);
                setCompanyName(item.data().companyName);
                setAddress(item.data().address);
            })
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Image style={styles.back} source={require('../../images/left-arrow.png')} />
                </TouchableOpacity>
                <Text style={styles.editProfile}>Edit Profile</Text>
            </View>
            <CustomTextInput value={name} onChangeText={txt => { setName(txt) }} title={'Name'} placeholder={'xyz'}
                bad={badName != '' ? true : false} />
            {badName != '' && <Text style={styles.msgerror}>{badName}</Text>}
            <CustomTextInput value={email} onChangeText={txt => { setEmail(txt) }} title={'Email'} placeholder={'xyz@gmail.com'}
                bad={badEmail != '' ? true : false} />
            {badEmail != '' && <Text style={styles.msgerror}>{badEmail}</Text>}
            <CustomTextInput value={contact} onChangeText={txt => { setContact(txt) }} title={'Contact'} placeholder={'+923*********'}
                bad={badContact != '' ? true : false} />
            {badContact != '' && <Text style={styles.msgerror}>{badContact}</Text>}
            <CustomTextInput value={companyName} onChangeText={txt => { setCompanyName(txt) }}
                title={'CompanyName'} placeholder={'ex.. TechForFuture'}
                bad={badCompanyName != '' ? true : false} />
            {badCompanyName != '' && <Text style={styles.msgerror}>{badCompanyName}</Text>}
            <CustomTextInput value={address} onChangeText={txt => { setAddress(txt) }}
                title={'Address'} placeholder={'Jamshoro'}
                bad={badAddress != '' ? true : false} />
            {badAddress != '' && <Text style={styles.msgerror}>{badAddress}</Text>}

            <CustomSolidBtn title={'Update'} onClick={updateUser} />

            <Loader visible={loading} />



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_Color
    },
    logo: {
        width: scale(80),
        height: scale(80),
        alignSelf: 'center',
        marginTop: moderateVerticalScale(50)
    },
    msgerror: {
        marginLeft: moderateScale(5),
        alignSelf: 'flex-start',
        color: 'red',
    },
    done: {
        width: "100%",
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default UpdateProfileForCompany;