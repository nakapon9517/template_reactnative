import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color } from '@/constants';
import { GridScreen, CalcScreen, MemoScreen } from '@/views/screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Memo'
        tabBarOptions={{
          showLabel: false,
          inactiveTintColor: Color.gray50,
          activeTintColor: Color.gray5,
          inactiveBackgroundColor: Color.gray90,
          activeBackgroundColor: Color.gray90,
        }}
      >
        <Tab.Screen
          name='Memo'
          component={MemoScreen}
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
          name='Calc'
          component={CalcScreen}
          options={{
            tabBarLabel: '計算',
            tabBarIcon: ({ color }) => (
              <Icon type='material' name='calculate' color={color} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name='Grid'
          component={GridScreen}
          options={{
            tabBarLabel: 'カウント',
            tabBarIcon: ({ color }) => (
              <Icon
                type='fontisto'
                name='nav-icon-grid-a'
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
