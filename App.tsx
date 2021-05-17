import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color } from '@/constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalcNavigator, GridNavigator, MemoNavigator } from '@/navigators';

const Tab = createBottomTabNavigator();
// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state',
// ]);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Memo'
        tabBarOptions={{
          showLabel: false,
          inactiveTintColor: Color.gray50,
          activeTintColor: Color.gray5,
          inactiveBackgroundColor: Color.gray100,
          activeBackgroundColor: Color.gray100,
        }}
      >
        <Tab.Screen
          name='MemoTab'
          component={MemoNavigator}
          options={{
            tabBarLabel: 'メモ',
            tabBarIcon: ({ color }) => (
              <Icon
                type='material'
                name='description'
                color={color}
                size={28}
              />
            ),
          }}
        />
        <Tab.Screen
          name='CalcTab'
          component={CalcNavigator}
          options={{
            tabBarLabel: '計算',
            tabBarIcon: ({ color }) => (
              <Icon type='material' name='calculate' color={color} size={28} />
            ),
          }}
        />
        <Tab.Screen
          name='GridTab'
          component={GridNavigator}
          options={{
            tabBarLabel: 'カウント',
            tabBarIcon: ({ color }) => (
              <Icon
                type='fontisto'
                name='nav-icon-grid-a'
                color={color}
                size={22}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
