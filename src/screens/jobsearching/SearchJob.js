import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_Color, TEXT_Color } from '../../utils/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import firestore from '@react-native-firebase/firestore'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SearchJob = () => {
      const navigation=useNavigation();

    const [search, setSearch] = useState('');
    const [jobs, setJobs] = useState([])
    const [savedJobs,setSavedJobs]=useState([])
    const isFocused=useIsFocused();
    const searchJob = (txt) => {
        firestore().collection('jobs').where('jobTitle', '==', txt).get().then(querySnapshot => {
            console.log(querySnapshot.docs);
            let temp = []
            querySnapshot.docs.forEach(item => {
                temp.push({ ...item.data(), id: item.id })
            });
            setJobs(temp)
        })
    }

    useEffect(() => {
      getSavedJobs()
    }, [isFocused])
    

    const saveJobs=async(data)=>{
        const id= await AsyncStorage.getItem("USER_ID");
        firestore().collection('saved_jobs').add({
            ...data,
            userId: id
        }).then(()=>{
            console.log('jobs saved');
            getSavedJobs()
        })
    }

    const getSavedJobs=async()=>{
        const id= await AsyncStorage.getItem("USER_ID");
        firestore().collection('saved_jobs').where('userId','==', id).get().then(querySnapshot=>{
            console.log(querySnapshot.docs)
            if(querySnapshot.docs.length>0){
                let temp=[];

                querySnapshot.docs.forEach(item => {
                    temp.push({...item.data(), savedId:item.id})
                    
                });
                setSavedJobs(temp);
            } else{
                setSavedJobs([]);
            }
            
        })
    }

    const removeSavedJob=async(id)=>{
const docId=await getSavedJobId(id)
        firestore().collection('saved_jobs').doc(docId).delete().then(()=>{
            getSavedJobs()
            
        })
    }

    const checkSavedJobs=(id)=>{
        let temp=savedJobs;
        let isSaved=true;
        temp.map(item=>{
            if(item.id==id){
                isSaved=true

            }
        });
        return isSaved
    }

    const getSavedJobId=async()=>{
        const id= await AsyncStorage.getItem("USER_ID");
        let jobId=''
        const snapshot=await firestore().collection('saved_jobs').where('userId','==', id).get()
        snapshot.docs.forEach(item=>{
            if(id==item.data().id){
                jobId=item.id;
            }
        });
        return jobId
    }
    return (
        <View style={styles.container}>
            <View style={styles.SearchBox}>
                <Image source={require('../../images/search.png')} style={styles.icon} />
                <TextInput placeholder='Search Jobs here.....' placeholderTextColor={'#9e9e9e'}
                    style={styles.input}
                    value={search}
                    onChangeText={txt => {
                        setSearch(txt)
                        searchJob(txt)
                    }}
                />
                {search != '' && <TouchableOpacity onPress={() => {
                    setSearch('');
                    searchJob("")
                }}>
                    <Image source={require('../../images/cross.png')} style={styles.cross} />
                </TouchableOpacity>}

            </View>
            <FlatList data={jobs} renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity style={styles.jobItem} onPress={()=>{
                        navigation.navigate('JobDetails', {data: item})
                    }}>
                        <View style={styles.topView}>
                            <Text style={styles.item}>{item.jobTitle}</Text>
                            <TouchableOpacity onPress={()=>{
                                if(checkSavedJobs(item.id)){
                                    removeSavedJob(item.id)
                                }else{
                                    saveJobs(item);
                                }
                            }}>
                                <Image source={checkSavedJobs(item.id)? require('../../images/lover.png'):require('../../images/heart.png')} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.subTitle}>{"Job Category: " + item.category}</Text>
                        <Text style={styles.subTitle}>{"Posted By: " + item.posterName}</Text>

                    </TouchableOpacity>
                )
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_Color
    },
    SearchBox: {
        width: '90%',
        height: verticalScale(40),
        borderWidth: .5,
        alignSelf: "center",
        marginTop: moderateScale(20),
        borderRadius: moderateScale(30),
        borderColor: '#9e9e9e',
        flexDirection: 'row',
        paddingLeft: moderateScale(15),
        alignItems: 'center'
    },
    icon: {
        width: scale(16),
        height: scale(16),
        
    },
    input: {
        width: '80%',
        height: '100%',
        marginLeft: moderateScale(10),
        fontSize: moderateScale(16),
        color: TEXT_Color
    },
    cross: {
        width: scale(16),
        height: scale(16),
        marginLeft: moderateScale(5)
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
    }
})

export default SearchJob

