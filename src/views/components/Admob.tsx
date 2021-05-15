import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '@/constants';

export const Admob = React.memo(() => {
  const styles = StyleSheet.create({
    admob: {
      width: '100%',
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.theme2,
    },
  });
  return (
    <View style={styles.admob}>
      <Text style={{ color: Color.gray5 }}>admob</Text>
    </View>
  );
});
