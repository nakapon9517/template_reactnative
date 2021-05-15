import React, { useMemo } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Color } from '@/constants';
import { Item } from '@/entities';
import { ListItem } from './ListItem';
import SectionList from 'react-native-tabs-section-list';

interface Props {
  routes: string[];
  items: Item[];
}
export const CalcList = (props: Props) => {
  type TabProps = {
    title: string;
    isActive: boolean;
  };
  const TabView = React.memo((props: TabProps) => {
    const styles = StyleSheet.create({
      tabContainer: {
        borderBottomColor: '#090909',
      },
      tabText: {
        padding: 16,
        color: '#9e9e9e',
        fontSize: 18,
        fontWeight: '500',
      },
    });
    return (
      <View
        style={[
          styles.tabContainer,
          { borderBottomWidth: props.isActive ? 3 : 0 },
        ]}
      >
        <Text
          style={[
            styles.tabText,
            { color: props.isActive ? Color.gray5 : Color.gray50 },
          ]}
        >
          {props.title}
        </Text>
      </View>
    );
  });

  const sections = useMemo(
    () =>
      props.routes.map((route, index) => {
        return {
          title: route,
          data: props.items.filter((item) => item.category === index),
        };
      }),
    [props.routes, props.items]
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => String(index)}
      stickySectionHeadersEnabled={false}
      initialNumToRender={10}
      tabBarStyle={styles.tabBar}
      contentContainerStyle={{ paddingBottom: 200, paddingHorizontal: 12 }}
      renderTab={({ title, isActive }) => (
        <TabView title={title} isActive={isActive} />
      )}
      renderSectionHeader={({ section }) => (
        <View>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      )}
      renderSectionFooter={({ section }) => (
        <ListItem
          footerItem={{
            count: section.data
              .map((item) => item.count)
              .reduce((prev, current) => prev + current),
            price: section.data
              .map((item) => item.price)
              .reduce((prev, current) => prev + current),
          }}
        />
      )}
      renderItem={({ item }) => <ListItem item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
  },
  tabBar: {
    paddingHorizontal: 12,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 16,
    color: Color.gray5,
  },
});
