import React from 'react';
import { StyleSheet, FlatList, View, Text, Alert } from 'react-native';
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
        <View style={styles.rowBack}>
          <Text
            style={{
              color: Color.gray5,
            }}
          >
            Delete
          </Text>
        </View>
      )}
      disableRightSwipe
      rightOpenValue={-100}
      rightActivationValue={-100}
      rightActionValue={-100}
      onRightAction={props.onRowDelete}
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
