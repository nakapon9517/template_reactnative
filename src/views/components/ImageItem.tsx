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
  // console.log(props.item);
  // const image = props.item.uri && require(props.item.uri);
  return (
    <Card containerStyle={styles.view}>
      <Card.Image
        source={{ uri: props.item.uri, cache: 'force-cache' }}
        containerStyle={{ width: 100, height: 100 }}
        PlaceholderContent={<ActivityIndicator />}
        resizeMode='stretch'
        // borderTopLeftRadius={50}
        // borderTopRightRadius={50}
        // borderBottomLeftRadius={50}
        // borderBottomRightRadius={50}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  view: {
    // flex: 1,
    padding: 0,
    margin: 0,
  },
  indicator: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#2A3132',
  },
});

export { ImageItem };
