import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawwer from './Drawwer';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();
const Main = () => {
  return (

    <Drawer.Navigator drawerContent={props=><CustomDrawer {...props}/>}>

      <Drawer.Screen name="Drawwer" component={Drawwer} options={{title:'FindMyJob'}}/>
      
    </Drawer.Navigator>
  )
}

export default Main