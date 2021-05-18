import React from 'react';
import { GridScreen } from '@/views/screen';
import { GridInputScreen } from '@/views/screen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const GridNavigator = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Grid' component={GridScreen} />
      <Stack.Screen
        name='GridInput'
        component={GridInputScreen}
        initialParams={{}}
      />
    </Stack.Navigator>
  );
};

export default GridNavigator;
