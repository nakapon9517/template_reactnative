import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Color } from '@/constants';
import { Icon } from 'react-native-elements';

interface HeaderProps {
  title?: string;
  onClickBack?: () => void;
  CenterComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
}

export const Header = React.memo((props: HeaderProps) => {
  return (
    <View style={styles.view}>
      <View style={[styles.component, { alignItems: 'flex-start' }]}>
        {props.onClickBack && (
          <TouchableOpacity style={styles.icon} onPress={props.onClickBack}>
            <Icon
              type='material'
              name='chevron-left'
              color={Color.gray5}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.component, { flexDirection: 'row' }]}>
        <Text style={styles.text}>{props.title}</Text>
        {props.CenterComponent && (
          <View style={styles.icon}>{props.CenterComponent}</View>
        )}
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
    alignItems: 'center',
  },
  back: {
    padding: 8,
    marginRight: 4,
    alignItems: 'flex-end',
  },
  icon: {
    paddingHorizontal: 8,
  },
  text: {
    color: Color.gray5,
    textAlign: 'center',
    fontSize: 16,
  },
});
