import React from 'react';
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
  const [selectIndex, setSelectIndex] = React.useState(0);
  const [routes] = React.useState(() => useCategories());

  const TabView = () => {
    const styles = StyleSheet.create({
      view: {
        // flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.gray40,
        borderBottomWidth: 1,
      },
      tab: {
        height: 36,
        marginVertical: 12,
        paddingHorizontal: 12,
      },
      active: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.gray90,
        paddingVertical: 8,
      },
      inactive: {
        flex: 1,
        fontSize: 20,
        color: Color.gray40,
        paddingVertical: 8,
      },
    });
    return (
      <ScrollView
        horizontal
        contentContainerStyle={styles.view}
        showsHorizontalScrollIndicator={false}
      >
        {routes.map((route, index) => (
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectIndex(index)}
            key={index}
          >
            <Text
              style={selectIndex === index ? styles.active : styles.inactive}
            >
              {route}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const SECTIONS = routes.map((route, index) => {
    return {
      title: route,
      data: items.filter((item) => item.category === index),
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item, index) => String(index)}
        stickySectionHeadersEnabled={false}
        scrollToLocationOffset={50}
        tabBarStyle={styles.tabBar}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderTab={({ title, isActive }) => (
          <View
            style={[
              styles.tabContainer,
              { borderBottomWidth: isActive ? 1 : 0 },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: isActive ? '#090909' : '#9e9e9e' },
              ]}
            >
              {title}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <View style={styles.sectionHeaderContainer} />
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderSectionFooter={({ section }) => (
          <View>
            <Text>
              Total:
              {section.data
                .map((item) => item.money)
                .reduce((prev, current) => prev + current)}
            </Text>
          </View>
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
    // height: '100%',
    // marginBottom: 100,
    // paddingBottom: 100,
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
    width: '100%',
    height: 60,
    // position: 'absolute',
    // right: 0,
    // bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.theme2,
  },

  tabBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  tabContainer: {
    borderBottomColor: '#090909',
  },
  tabText: {
    padding: 16,
    color: '#9e9e9e',
    fontSize: 18,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    width: '96%',
    alignSelf: 'flex-end',
    backgroundColor: '#eaeaea',
  },
  sectionHeaderContainer: {
    height: 10,
    // backgroundColor: '#f6f6f6',
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    color: Color.gray100,
    // backgroundColor: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

export { HomeScreen };
