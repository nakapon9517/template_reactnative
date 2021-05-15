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
import { StatusBar } from 'expo-status-bar';
import { Color } from '@/constants';
import { useItemCategories, useItem } from '@/hooks';
import { ListItem } from '@/views/components';
import SectionList from 'react-native-tabs-section-list';

interface Props {
  test: string;
}
const CalcScreen = (props: Props) => {
  const { items } = useItem();
  const [routes] = useState(() => useItemCategories());

  type TabProps = {
    title: string;
    isActive: boolean;
  };
  const TabView = (props: TabProps) => {
    const styles = StyleSheet.create({
      tabContainer: {
        // marginBottom: 24,
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
  };

  const sections = routes.map((route, index) => {
    return {
      title: route,
      data: items.filter((item) => item.category === index),
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
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
      <View style={styles.add}>
        <Text style={styles.addText}>+</Text>
      </View>
      <View style={styles.admob}>
        <Text style={{ color: Color.gray5 }}>admob</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.gray90,
  },
  list: {
    paddingHorizontal: 12,
  },
  add: {
    width: 54,
    height: 54,
    position: 'absolute',
    right: 8,
    bottom: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    backgroundColor: Color.gray80,
    zIndex: 999,
  },
  addText: {
    fontSize: 32,
    color: Color.gray5,
  },
  admob: {
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
    color: Color.gray5,
  },
});

export { CalcScreen };
