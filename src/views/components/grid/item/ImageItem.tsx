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
}

const ImageItem = React.memo((props: Props) => {
  // const image = props.item.uri && require(props.item.uri);
  return (
    <TouchableOpacity style={styles.view}>
      <Card.Image
        source={{ uri: props.item.uri, cache: 'force-cache' }}
        containerStyle={{ width: 100, height: 100, borderRadius: 50 }}
        PlaceholderContent={<ActivityIndicator />}
        placeholderStyle={styles.indicator}
        resizeMode='stretch'
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 12,
    width: Dimensions.get('window').width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#2A3132',
  },
});

export { ImageItem };
