import React from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Grid } from '@/entities';
import { ImageItem } from './item/ImageItem';

interface Props {
  items: Grid[];
  edit: boolean;
  onPress: (item: Grid) => void;
  onClickCount: (add: boolean, item: Grid) => void;
  onClickDelete: (id: string) => void;
}
export const GridList = React.memo((props: Props) => {
  const { width, height } = Dimensions.get('screen');

  return (
    <FlatList
      data={props.items}
      keyExtractor={(item, index) => item.id + index}
      initialNumToRender={5}
      numColumns={2}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.column}
      renderItem={({ item }) => (
        <ImageItem
          item={item}
          edit={props.edit}
          width={height / 4.5}
          onPress={props.onPress}
          onClickCount={props.onClickCount}
          onClickDelete={props.onClickDelete}
        />
      )}
    />
  );
});

const styles = StyleSheet.create({
  list: {
    // flex: 1,
    // justifyContent: 'space-between',
    // paddingHorizontal: 12,
  },
  column: {
    // padding: 0,
    // margin: 0,
  },
});
