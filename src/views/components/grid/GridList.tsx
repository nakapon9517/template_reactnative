import React from 'react';
import {
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Item } from '@/entities';
import { ImageItem } from './item/ImageItem';

interface Props {
  items: Item[];
  ListHeader: React.ReactNode;
  onPress: (item: Item) => void;
}
export const GridList = React.memo((props: Props) => {
  const width = Dimensions.get('screen').width;

  return (
    <FlatList
      data={props.items}
      keyExtractor={(item) => item.id}
      initialNumToRender={5}
      numColumns={3}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.column}
      ListHeaderComponent={<>{props.ListHeader}</>}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => (
        <ImageItem item={item} width={width / 4} onPress={props.onPress} />
      )}
    />
  );
});

const styles = StyleSheet.create({
  list: {
    // flex: 1,
    // justifyContent: 'space-between',
    // paddingHorizontal: 12,
    // marginBottom: 480,
    // paddingBottom: 480,
  },
  column: {
    // padding: 0,
    // margin: 0,
  },
});
