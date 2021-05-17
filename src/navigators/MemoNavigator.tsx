import React from 'react';
import { MemoScreen } from '@/views/screen';
import { MemoInputScreen } from '@/views/screen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const MemoNavigator = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Memo' component={MemoScreen} />
      <Stack.Screen
        name='MemoInput'
        component={MemoInputScreen}
        initialParams={{}}
      />
    </Stack.Navigator>
  );
};
