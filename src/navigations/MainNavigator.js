import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/onboarding/Splash';
import SelectUser from '../screens/onboarding/SelectUser';
import JobSearchingNavigator from './JobSearchingNavigator';
import JobPostingNavigator from './JobPostingNavigator';
import DashboardForCompany from '../screens/jobposting/DashboardForCompany';
import AddJob from '../screens/jobposting/Tabs/AddJob';
import EditJob from '../screens/jobposting/Tabs/EditJob';
import UpdateProfileForCompany from '../screens/jobposting/UpdateProfileForCompany';
import ChangeImgCompany from '../screens/jobposting/ChangeImgCompany';
import Contactus from '../screens/jobposting/Contactus';
import SearchCandidate from '../screens/jobposting/Tabs/SearchCandidate';
import UserDetails from '../screens/jobposting/UserDetails';
import NewMsg from '../screens/jobposting/Tabs/NewMsg';


const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Splash" component={Splash}  options={{headerShown: false}}/>
    <Stack.Screen name="DashboardForCompany" component={DashboardForCompany}  options={{headerShown: false}}/>
    <Stack.Screen name="AddJob" component={AddJob}  options={{headerShown: false}}/>
    <Stack.Screen name="EditJob" component={EditJob}  options={{headerShown: false}}/>
    <Stack.Screen name="UpdateProfileForCompany" component={UpdateProfileForCompany}  options={{headerShown: false}}/>
    <Stack.Screen name="ChangeImgCompany" component={ChangeImgCompany}  options={{headerShown: false}}/>
    <Stack.Screen name="Contactus" component={Contactus}  options={{headerShown: false}}/>
    <Stack.Screen name="SearchCandidate" component={SearchCandidate}  options={{headerShown: false}}/>
    <Stack.Screen name="UserDetails" component={UserDetails}  options={{headerShown: false}}/>
    <Stack.Screen name="NewMsg" component={NewMsg}  options={{headerShown: false}}/>

    <Stack.Screen name="SelectUser" component={SelectUser}  options={{headerShown: false}}/>
    <Stack.Screen name="JobSearchingNavigator" component={JobSearchingNavigator}  options={{headerShown: false}}/>
    <Stack.Screen name="JobPostingNavigator" component={JobPostingNavigator}  options={{headerShown: false}}/>

    
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator