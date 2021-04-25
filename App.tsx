import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { Color } from '@/constants';
import { HomeScreen, ListScreen, SettingScreen } from '@/views/screen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        tabBarOptions={{
          showLabel: false,
          inactiveTintColor: 'gray',
          activeTintColor: 'gray',
          inactiveBackgroundColor: Color.gray10,
          activeBackgroundColor: Color.gray20,
        }}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Image',
            tabBarIcon: ({ color }) => (
              <Icon type='ionicons' name='image' color={color} size={28} />
            ),
          }}
        />
        <Tab.Screen
          name='sub1'
          component={ListScreen}
          options={{
            tabBarLabel: 'Memo',
            tabBarIcon: ({ color }) => (
              <Icon type='ionicons' name='list' color={color} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name='sub2'
          component={SettingScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <Icon type='ionicons' name='settings' color={color} size={28} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
