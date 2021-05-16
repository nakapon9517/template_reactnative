import React from 'react';
import { CalcScreen } from '@/views/screen';
import { CalcInputScreen } from '@/views/screen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const CalcNavigator = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Calc' component={CalcScreen} />
      <Stack.Screen name='CalcInput' component={CalcInputScreen} />
    </Stack.Navigator>
  );
};
