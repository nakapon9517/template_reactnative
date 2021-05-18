import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import { Color } from '@/constants';
import { Memo } from '@/entities';
import { Icon } from 'react-native-elements';

interface Props {
  memo: ListRenderItemInfo<Memo>;
  edit: boolean;
  onPressList: (memo: Memo) => void;
}

export const MemoItem = (props: Props) => {
  return (
    <TouchableOpacity
      key={props.memo.index}
      style={styles.list}
      onPress={() => props.onPressList(props.memo.item)}
    >
      <Text style={styles.text} numberOfLines={2}>
        {props.memo.item.title}
      </Text>
      <Text style={styles.category} numberOfLines={1}>
        {props.memo.item.text}
      </Text>
      <View>
        <Icon
          type='material'
          name='chevron-right'
          color={Color.gray5}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  list: {
    width: Dimensions.get('window').width,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.4,
    borderBottomColor: Color.gray90,
    backgroundColor: Color.gray100,
  },
  text: {
    width: '60%',
    color: Color.gray5,
    fontSize: 18,
    textAlign: 'left',
    alignItems: 'center',
    marginRight: 12,
  },
  category: {
    flex: 1,
    textAlign: 'right',
    color: Color.gray40,
    paddingRight: '3%',
  },
});
