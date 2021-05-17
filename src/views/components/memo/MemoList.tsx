import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Category, Memo } from '@/entities';
import { MemoItem } from './item/MemoItem';

interface Props {
  memos: Memo[];
  onPressList: (memo: Memo) => void;
}

const MemoList = (props: Props) => {
  return (
    <FlatList
      data={props.memos}
      renderItem={(memo) => (
        <MemoItem memo={memo} onPressList={props.onPressList} />
      )}
      keyExtractor={(memo, index) => String(index)}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export { MemoList };
