import React from 'react';

import {View, Text} from 'native-base';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Work from './Work';
import Personal from './Personal';
import All from './All';
import Important from './Important';

const Tab = createMaterialTopTabNavigator();

export default DisplayScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: {width: 120},
          lazy: true,
          lazyPreloadDistance: 2,
        }}>
        <Tab.Screen name="All" component={All} />
        <Tab.Screen name="Work" component={Work} />
        <Tab.Screen name="Personal" component={Personal} />
        <Tab.Screen name="Important" component={Important} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
