import React, { useState } from 'react';
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
} from 'react-native';
// import {Text} from 'react-native-elements'
import { Color } from '@/constants';
import { useCategories, useItem } from '@/hooks';
import { ListItem } from '@/views/components';
import { Item } from '@/entities';
import SectionList from 'react-native-tabs-section-list';

interface Props {
  test: string;
}
const HomeScreen = (props: Props) => {
  const { items } = useItem();
  const [routes] = useState(() => useCategories());

  type TabProps = {
    title: string;
    isActive: boolean;
  };
  const TabView = (props: TabProps) => {
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
            { color: props.isActive ? '#090909' : '#9e9e9e' },
          ]}
        >
          {props.title}
        </Text>
      </View>
    );
  };

  const sections = routes.map((route, index) => {
    return {
      title: route,
      data: items.filter((item) => item.category === index),
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => String(index)}
        stickySectionHeadersEnabled={false}
        scrollToLocationOffset={10}
        tabBarStyle={styles.tabBar}
        contentContainerStyle={{ paddingBottom: 72, paddingHorizontal: 12 }}
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
      <View style={styles.add}>
        <Text style={styles.addText}>+</Text>
      </View>
      <View style={styles.admob}>
        <Text style={{ color: Color.white }}>admob</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 12,
  },
  add: {
    width: 48,
    height: 48,
    position: 'absolute',
    right: 8,
    bottom: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: Color.theme1,
    zIndex: 999,
  },
  addText: {
    fontSize: 24,
    color: Color.gray5,
  },
  admob: {
    // width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.theme2,
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
  },
});

export { HomeScreen };
