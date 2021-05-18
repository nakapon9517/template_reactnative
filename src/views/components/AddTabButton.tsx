import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Color } from '@/constants';
import { Icon } from 'react-native-elements';

interface Props {
  onPress: () => void;
}

export const AddTabButton = React.memo((props: Props) => {
  return (
    <TouchableOpacity style={styles.add} onPress={props.onPress}>
      <Icon type='material' name='playlist-add' size={24} color={Color.gray5} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  add: {
    width: 54,
    height: 54,
    position: 'absolute',
    right: 8,
    bottom: 128,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    backgroundColor: Color.theme2,
    zIndex: 99,
  },
});
