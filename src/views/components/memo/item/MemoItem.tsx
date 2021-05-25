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
  onRowDelete: (id: string) => void;
}

export const MemoItem = (props: Props) => {
  return (
    <View style={styles.view}>
      <TouchableOpacity
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
      {props.edit && (
        <TouchableOpacity
          onPress={() => props.onRowDelete(props.memo.item.id)}
          style={styles.delete}
        >
          <Text style={styles.deleteText}>削除</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.4,
    borderBottomColor: Color.gray90,
    backgroundColor: Color.gray100,
  },
  list: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
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
  delete: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.red,
    zIndex: 3,
  },
  deleteText: {
    fontSize: 16,
    color: Color.gray10,
  },
});
