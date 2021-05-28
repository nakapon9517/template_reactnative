import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { Grid } from '@/entities';
import { Color } from '@/constants';
import { Image } from 'react-native-elements';
interface Props {
  item: Grid;
  edit: boolean;
  width: number;
  onPress: (item: Grid) => void;
  onClickCount: (add: boolean, item: Grid) => void;
  onClickDelete: (id: string) => void;
}

const ImageItem = React.memo((props: Props) => {
  return (
    <>
      {props.edit ? (
        <View style={styles.view}>
          <TouchableOpacity
            style={[
              styles.image,
              {
                width: props.width,
                height: props.width,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: Color.gray20,
              },
            ]}
            onPress={() => props.onPress(props.item)}
          >
            <TouchableOpacity
              style={styles.close}
              onPress={() => props.onClickDelete(props.item.id)}
            >
              <Text style={styles.closeText}>-</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: props.item.uri, cache: 'force-cache' }}
              containerStyle={[
                styles.image,
                { width: props.width, height: props.width },
              ]}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={styles.indicator}
              resizeMode='cover'
            />
            <View style={styles.badgeEdit}>
              <Text style={styles.count}>+</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{props.item.name}</Text>
        </View>
      ) : (
        <View style={styles.view}>
          <View
            style={[styles.image, { width: props.width, height: props.width }]}
          >
            <TouchableOpacity
              style={[styles.left, { width: props.width / 2, maxWidth: 120 }]}
              onPress={() => props.onClickCount(false, props.item)}
            >
              <View style={styles.leftBadge}>
                <Text style={styles.minus}>-</Text>
              </View>
            </TouchableOpacity>
            <Image
              source={{ uri: props.item.uri, cache: 'force-cache' }}
              containerStyle={[
                styles.image,
                {
                  width: props.width,
                  height: props.width,
                  maxWidth: 240,
                  maxHeight: 240,
                },
              ]}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={styles.indicator}
              resizeMode='cover'
            />
            <View style={styles.badge}>
              <Text style={styles.count}>{props.item.count}</Text>
            </View>
            <TouchableOpacity
              style={[styles.right, { width: props.width / 2, maxWidth: 120 }]}
              onPress={() => props.onClickCount(true, props.item)}
            >
              <View style={styles.rightBadge}>
                <Text style={styles.plus}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{props.item.name}</Text>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  close: {
    width: Dimensions.get('screen').height / 24,
    height: Dimensions.get('screen').height / 24,
    position: 'absolute',
    top: 4,
    left: 4,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Color.red,
    zIndex: 3,
    backgroundColor: Color.gray100,
  },
  closeText: {
    color: Color.red,
    fontWeight: 'bold',
    fontSize: Dimensions.get('screen').height / 25,
    textAlign: 'center',
    lineHeight: Dimensions.get('screen').height / 24,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: Dimensions.get('screen').height / 24,
    height: Dimensions.get('screen').height / 24,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Color.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.gray100,
  },
  badgeEdit: {
    width: Dimensions.get('screen').height / 24,
    height: Dimensions.get('screen').height / 24,
    position: 'absolute',
    top: 4,
    right: 4,
    borderRadius: 99,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Color.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  right: {
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 99,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  leftBadge: {
    width: Dimensions.get('screen').height / 24,
    height: Dimensions.get('screen').height / 24,
    position: 'absolute',
    left: -12,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Color.gray80,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    backgroundColor: Color.gray100,
  },
  rightBadge: {
    width: Dimensions.get('screen').height / 24,
    height: Dimensions.get('screen').height / 24,
    position: 'absolute',
    right: -12,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Color.gray80,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    backgroundColor: Color.gray100,
  },
  count: {
    color: Color.gray5,
  },
  minus: {
    color: Color.gray5,
    fontSize: 20,
  },
  plus: {
    color: Color.gray5,
    fontSize: 20,
  },
  name: {
    color: Color.gray10,
    paddingTop: 4,
  },
});

export { ImageItem };
