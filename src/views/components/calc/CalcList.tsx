import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Color } from '@/constants';
import { Calc, Category } from '@/entities';
import { ListItem } from './item/ListItem';
import SectionList from 'react-native-tabs-section-list';
import { Icon } from 'react-native-elements';

interface Props {
  items: Calc[];
  edit: boolean;
  categories: Category[];
  onClickItem: (item: Calc) => void;
  onClickCategory: (id: string) => void;
  onRowDelete: (id: string) => void;
}
export const CalcList = (props: Props) => {
  const sections = useMemo(
    () =>
      props.categories.map((category, index) => {
        return {
          key: category.id,
          title: category.title,
          data: props.items.filter((item) => item.category === index),
        };
      }),
    [props.categories, props.items]
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => String(item.key) + index}
      initialNumToRender={10}
      tabBarStyle={styles.tabBar}
      contentContainerStyle={{ paddingBottom: 200, paddingHorizontal: 12 }}
      renderTab={({ title, isActive }) => {
        const styles = StyleSheet.create({
          tabContainer: {
            borderBottomColor: Color.gray5,
            borderBottomWidth: isActive ? 2 : 0,
          },
          tabText: {
            padding: 16,
            fontSize: 18,
            fontWeight: '500',
            color: isActive ? Color.gray5 : Color.gray50,
          },
        });
        return (
          <View style={styles.tabContainer}>
            <Text style={styles.tabText}>{title}</Text>
          </View>
        );
      }}
      renderSectionHeader={({ section }) => (
        <TouchableOpacity
          style={styles.sectionHeaderView}
          onPress={() => props.onClickCategory(section.key ? section.key : '')}
        >
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
          <View style={styles.icon}>
            <Icon type='material' name='edit' color={Color.gray40} size={24} />
          </View>
        </TouchableOpacity>
      )}
      renderSectionFooter={({ section }) => (
        <ListItem
          footerItem={{
            count: section.data
              .map((item) => item.count)
              .reduce((prev, current) => prev + current, 0),
            price: section.data
              .map((item) => item.price)
              .reduce((prev, current) => prev + current, 0),
          }}
        />
      )}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          edit={props.edit}
          onClickItem={props.onClickItem}
          onRowDelete={props.onRowDelete}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
  },
  tabBar: {
    paddingHorizontal: 12,
    borderBottomColor: Color.gray40,
    borderBottomWidth: 1,
  },
  sectionHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.gray100,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 16,
    color: Color.gray5,
  },
  icon: {
    marginLeft: 8,
  },
});
