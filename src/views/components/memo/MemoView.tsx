import React from 'react';
import { StyleSheet } from 'react-native';
import { Category, Memo } from '@/entities';
import { Color } from '@/constants';
import { Textarea } from './item/Textarea';
import { MemoList } from './MemoList';

interface Props {
  memos: Memo[];
  category?: Category;
  onPressList: (category: Category) => void;
}

export const MemoView = (props: Props) => {
  const memo = props.memos.filter(
    (memo) => memo.category.id === props.category?.id
  )[0];

  return (
    <>
      {props.category && memo ? (
        <Textarea
          key={memo.category.id}
          text={memo.text}
          category={memo.category}
          onChangeText={(text) => console.log(text)}
          onChangeCategory={(category) => console.log(category)}
        />
      ) : (
        <MemoList memos={props.memos} onPressList={props.onPressList} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
