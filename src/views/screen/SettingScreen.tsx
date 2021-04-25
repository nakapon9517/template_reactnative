import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  test: string;
}

const SettingScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>SettingScreen!</Text>
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SettingScreen };
