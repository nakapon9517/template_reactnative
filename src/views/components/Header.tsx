import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Color } from '@/constants';

interface HeaderProps {
  title?: string;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
}

export const Header = React.memo((props: HeaderProps) => {
  return (
    <View style={styles.view}>
      <View style={[styles.component, { alignItems: 'flex-start' }]}>
        {props.LeftComponent ? <>{props.LeftComponent}</> : <Text> </Text>}
      </View>
      <View style={styles.component}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
      <View style={[styles.component, { alignItems: 'flex-end' }]}>
        {props.RightComponent ? <>{props.RightComponent}</> : <Text> </Text>}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Color.gray80,
    backgroundColor: Color.gray100,
  },
  component: {
    width: Dimensions.get('window').width / 3,
    height: 40,
    justifyContent: 'center',
  },
  text: {
    color: Color.gray5,
    textAlign: 'center',
    fontSize: 16,
  },
});
