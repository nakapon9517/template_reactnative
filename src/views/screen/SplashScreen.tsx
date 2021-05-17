import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Route, Color } from '@/constants';

interface Props {
  navigation: StackNavigationProp<Route, 'Splash'>;
  route: RouteProp<Route, 'Splash'>;
}

export const SplashScreen: React.FC<Props> = () => {
  return (
    <View style={styles.screen}>
      <Image
        source={require('@/assets/splash.png')}
        resizeMode='contain'
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.gray100,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
