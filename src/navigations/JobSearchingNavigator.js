import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../screens/jobsearching/Main';
import SearchJob from '../screens/jobsearching/SearchJob';
import JobDetails from '../screens/jobsearching/JobDetails';
import LoginForUser from '../screens/jobsearching/LoginForUser';
import SignupForUser from '../screens/jobsearching/SignupForUser';
import SavedJobs from '../screens/jobsearching/SavedJobs';
import Chat1 from '../screens/jobsearching/tabs/Chat1';
import EditProfile from '../screens/jobsearching/EditProfile';
import ChangeImg from '../screens/jobsearching/ChangeImg';
import ContactUs from '../screens/jobsearching/ContactUs';
import RateUs from '../screens/jobsearching/RateUs';
import ChangeBackground from '../screens/jobsearching/ChangeBackground';


const Stack = createStackNavigator();


const JobSearchingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
        <Stack.Screen name="SavedJobs" component={SavedJobs} options={{headerShown: true, title:'Saved Jobs'}} />
        <Stack.Screen name="ContactUs" component={ContactUs} options={{headerShown: true, title:'Contact Us'}} />
        <Stack.Screen name="RateUs" component={RateUs} options={{headerShown: true, title:'Rate Us'}} />
        <Stack.Screen name="ChangeBackground" component={ChangeBackground} options={{headerShown: false, title:'Upload Image'}} />
        <Stack.Screen name="SearchJob" component={SearchJob} options={{headerShown: true, title:'Search Jobs'}} />
        <Stack.Screen name="JobDetails" component={JobDetails} options={{headerShown: true, title:'Job Details'}} />
        <Stack.Screen name="Chat1" component={Chat1} options={{headerShown: true, title:'Chat'}} />

        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false, title:'Profile Setting'}} />
        <Stack.Screen name="ChangeImg" component={ChangeImg} options={{headerShown: false, title:''}} />
        <Stack.Screen name="LoginForUser" component={LoginForUser} options={{headerShown: true, title:'Login'}} />
        <Stack.Screen name="SignupForUser" component={SignupForUser} options={{headerShown: true, title:'Register'}} />
      </Stack.Navigator>
  )
}

export default JobSearchingNavigator