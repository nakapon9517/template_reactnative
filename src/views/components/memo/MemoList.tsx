import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Memo } from '@/entities';
import { Color } from '@/constants';
import { MemoItem } from './item/MemoItem';
import { SwipeListView } from 'react-native-swipe-list-view';
interface Props {
  memos: Memo[];
  onPressList: (memo: Memo) => void;
  onRowDelete: (id: string) => void;
}

const MemoList = (props: Props) => {
  return (
    <SwipeListView
      data={props.memos}
      renderItem={(memo) => (
        <MemoItem memo={memo} onPressList={props.onPressList} />
      )}
      keyExtractor={(_, index) => String(index)}
      renderHiddenItem={(data, rowMap) => (
        <TouchableOpacity
          style={styles.rowBack}
          onPress={() => props.onRowDelete(data.item.id)}
        >
          <Text
            style={{
              color: Color.gray5,
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      )}
      disableRightSwipe
      rightOpenValue={-100}
      rightActivationValue={-100}
      rightActionValue={-100}
      // onRightAction={(key, map) => console.log(map.memo)}
      // onRightAction={(key, map) => props.onRowDelete(map.)}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  rowBack: {
    alignItems: 'flex-end',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Color.red,
  },
});

export { MemoList };
