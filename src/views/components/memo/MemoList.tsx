import React from 'react';
import { StyleSheet, FlatList, View, Text, Alert } from 'react-native';
import { Memo } from '@/entities';
import { Color } from '@/constants';
import { MemoItem } from './item/MemoItem';
import { SwipeListView } from 'react-native-swipe-list-view';
interface Props {
  memos: Memo[];
  edit: boolean;
  onPressList: (memo: Memo) => void;
}

const MemoList = (props: Props) => {
  const onRowDidOpen = (rowKey: any) => {
    console.log('This row opened', rowKey);
    Alert.alert('aaaa');
    // Alert.alert(
    //   'did' + props.memos[Number(rowKey)].title,
    //   props.memos[Number(rowKey)].text.slice(0, 30),
    //   [
    //     { text: 'OK', onPress: () => console.log('OK') },
    //     { text: 'Cancel', onPress: () => console.log('Cancel') },
    //   ]
    // );
  };
  const onRightAction = (rowKey: any) => {
    console.log('This row opened', rowKey);
    Alert.alert('bbbbb');
    // Alert.alert(
    //   'did' + props.memos[Number(rowKey)].title,
    //   props.memos[Number(rowKey)].text.slice(0, 30),
    //   [
    //     { text: 'OK', onPress: () => console.log('OK') },
    //     { text: 'Cancel', onPress: () => console.log('Cancel') },
    //   ]
    // );
  };

  return (
    <SwipeListView
      data={props.memos}
      renderItem={(memo) => (
        <MemoItem
          memo={memo}
          edit={props.edit}
          onPressList={props.onPressList}
        />
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
      onRowDidOpen={onRowDidOpen}
      rightOpenValue={-100}
      rightActivationValue={-100}
      rightActionValue={-100}
      // onRightAction={onRightAction}
      // onRightActionStatusChange={onRightAction}
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
