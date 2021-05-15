import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageSourcePropType,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'react-native-elements';
import { Color } from '@/constants';
import { useImage, useImageCategories } from '@/hooks';
import { ListItem } from '@/views/components';
import { Item } from '@/entities';
import SectionList from 'react-native-tabs-section-list';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Card } from 'react-native-elements';

interface Props {
  item: Item;
}

const ImageItem = (props: Props) => {
  // const image = props.item.uri && require(props.item.uri);
  return (
    <TouchableOpacity style={styles.view}>
      <Card.Image
        source={{ uri: props.item.uri, cache: 'force-cache' }}
        containerStyle={{ width: 100, height: 100, borderRadius: 50 }}
        PlaceholderContent={<ActivityIndicator />}
        placeholderStyle={styles.indicator}
        resizeMode='stretch'
        // borderTopLeftRadius={50}
        // borderTopRightRadius={50}
        // borderBottomLeftRadius={50}
        // borderBottomRightRadius={50}
      />
    </TouchableOpacity>
  );
};

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
