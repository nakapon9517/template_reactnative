import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Formatter } from '@/utils';
import { Calc } from '@/entities';
import { Color } from '@/constants';

type FooterProps = {
  count: number;
  price: number;
};
interface Props {
  item?: Calc;
  edit?: boolean;
  footerItem?: FooterProps;
  onClickItem?: (calc: Calc) => void;
  onRowDelete?: (id: string) => void;
}

const ListItem = React.memo((props: Props) => {
  return (
    <>
      {props.item && (
        <View style={styles.view}>
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
                <Text style={styles.money}>
                  {Formatter().price(props.item.price)}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          {props.edit && (
            <TouchableOpacity
              style={styles.editView}
              onPress={() =>
                props.onRowDelete &&
                props.item &&
                props.onRowDelete(props.item.id)
              }
            >
              <Text style={styles.text}>削除</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {props.footerItem && (
        <View style={styles.borderFooterItem}>
          <View style={styles.titleView} />
          <View style={styles.countView}>
            <Text style={styles.text}>{props.footerItem.count}</Text>
          </View>
          <View style={styles.moneyView}>
            <Text style={styles.money}>
              {Formatter().price(props.footerItem.price)}
            </Text>
          </View>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  borderItem: {
    flex: 9,
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
    borderColor: Color.gray50,
  },
  titleView: {
    flex: 6,
    paddingEnd: 8,
  },
  countView: {
    flex: 1,
    paddingEnd: 8,
  },
  moneyView: {
    flex: 2,
  },
  editView: {
    flex: 1,
    minWidth: 40,
    backgroundColor: Color.red,
    alignItems: 'center',
    justifyContent: 'center',
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
