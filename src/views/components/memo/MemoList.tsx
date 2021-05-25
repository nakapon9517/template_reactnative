import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Memo } from '@/entities';
import { MemoItem } from './item/MemoItem';
interface Props {
  memos: Memo[];
  edit: boolean;
  onPressList: (memo: Memo) => void;
  onRowDelete: (id: string) => void;
}

const MemoList = (props: Props) => {
  return (
    <FlatList
      data={props.memos}
      renderItem={(memo) => (
        <MemoItem
          memo={memo}
          edit={props.edit}
          onPressList={props.onPressList}
          onRowDelete={props.onRowDelete}
        />
      )}
      keyExtractor={(_, index) => _.id + index}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export { MemoList };
