import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageSourcePropType,
  SafeAreaView,
} from 'react-native';
// import {Text} from 'react-native-elements'
import { Color } from '@/constants';
import { Item } from '@/entities';
import { dateSlash, price } from '@/utils';

interface Props {
  item: Item;
}

const ListItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>{props.item.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>{props.item.count}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.money}>{price(props.item.money)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>{dateSlash(props.item.date)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: Color.gray10,
  },
  row: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: Color.gray90,
  },
  money: {
    textAlign: 'right',
    paddingEnd: 12,
  },
});

export { ListItem };
