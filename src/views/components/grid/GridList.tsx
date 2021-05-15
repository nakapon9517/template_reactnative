import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Item } from '@/entities';
import { ImageItem } from './ImageItem';

interface Props {
  items: Item[];
  ListHeader: React.ReactNode;
}
export const GridList = (props: Props) => {
  return (
    <FlatList
      data={props.items}
      keyExtractor={(item) => item.id}
      initialNumToRender={5}
      numColumns={3}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<>{props.ListHeader}</>}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => <ImageItem item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    // flex: 1,
    // justifyContent: 'space-between',
    // paddingHorizontal: 12,
    // marginBottom: 480,
    // paddingBottom: 480,
  },
});
