import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageSourcePropType,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Color } from '@/constants';
import { Item, Category } from '@/entities';
import { dateSlash, price } from '@/utils';

type FooterProps = {
  count: number;
  price: number;
};
interface Props {
  item?: Item;
  footerItem?: FooterProps;
  onClickItem?: (item: Item) => void;
}

const ListItem = React.memo((props: Props) => {
  return (
    <>
      {props.item && (
        <TouchableOpacity
          style={styles.borderItem}
          onPress={() =>
            props.item && props.onClickItem && props.onClickItem(props.item)
          }
        >
          <View style={styles.titleView}>
            <Text style={styles.text}>{props.item.name}</Text>
          </View>
          <View style={styles.countView}>
            <Text style={styles.text}>{props.item.count}</Text>
          </View>
          <View style={styles.moneyView}>
            {props.item.price !== undefined && (
              <Text style={styles.money}>{price(props.item.price)}</Text>
            )}
          </View>
        </TouchableOpacity>
      )}
      {props.footerItem && (
        <View style={styles.borderFooterItem}>
          <View style={styles.titleView} />
          <View style={styles.countView}>
            <Text style={styles.text}>{props.footerItem.count}</Text>
          </View>
          <View style={styles.moneyView}>
            <Text style={styles.money}>{price(props.footerItem.price)}</Text>
          </View>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  borderItem: {
    paddingLeft: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: Color.gray80,
  },
  borderFooterItem: {
    paddingLeft: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Color.gray20,
  },
  titleView: {
    flex: 1,
    paddingEnd: 8,
    minWidth: '55%',
  },
  countView: {
    flex: 1,
    paddingEnd: 8,
    minWidth: '15%',
  },
  moneyView: {
    flex: 1,
    minWidth: '30%',
  },
  text: {
    fontSize: 14,
    color: Color.gray5,
  },
  money: {
    textAlign: 'right',
    paddingEnd: 12,
    color: Color.gray5,
  },
});

export { ListItem };
