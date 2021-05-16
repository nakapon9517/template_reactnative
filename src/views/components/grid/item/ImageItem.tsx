import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Item } from '@/entities';
import { Card } from 'react-native-elements';

interface Props {
  item: Item;
  width: number;
  onPress: (item: Item) => void;
}

const ImageItem = React.memo((props: Props) => {
  return (
    <TouchableOpacity
      style={styles.view}
      onPress={() => props.onPress(props.item)}
    >
      <Card.Image
        source={{ uri: props.item.uri, cache: 'force-cache' }}
        containerStyle={[
          styles.image,
          { width: props.width, height: props.width },
        ]}
        PlaceholderContent={<ActivityIndicator />}
        placeholderStyle={styles.indicator}
        resizeMode='cover'
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  indicator: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#2A3132',
  },
  image: {
    maxWidth: 240,
    maxHeight: 240,
    borderRadius: 999,
  },
});

export { ImageItem };
