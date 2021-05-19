import React from 'react';
import {
  CalcScreen,
  CalcInputScreen,
  CalcCategoryScreen,
} from '@/views/screen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const CalcNavigator = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Calc' component={CalcScreen} />
      <Stack.Screen
        name='CalcInput'
        component={CalcInputScreen}
        initialParams={{}}
      />
      <Stack.Screen name='CalcCategoryScreen' component={CalcCategoryScreen} />
    </Stack.Navigator>
  );
};

export default CalcNavigator;
