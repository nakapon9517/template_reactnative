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
  Image,
} from 'react-native';
// import {Text} from 'react-native-elements'
import { Color } from '@/constants';
import { useImage, useImageCategories } from '@/hooks';
import { ImageItem } from '@/views/components';
import { Item } from '@/entities';
import SectionList from 'react-native-tabs-section-list';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImageEditor from '@react-native-community/image-editor';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

interface Props {
  test: string;
}
const HomeScreen = (props: Props) => {
  const { items } = useImage();
  const [routes] = useState(() => useImageCategories());
  const [image, setImage] = useState<string>();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // allowsMultipleSelection: true,
      aspect: [9, 9],
      quality: 0,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      console.log(result.base64);
      // setImage(result.base64);
      console.log(result.uri);
      setImage(result.uri);
    }
  };

  type TabProps = {
    title: string;
    isActive: boolean;
  };
  const TabView = (props: TabProps) => {
    const styles = StyleSheet.create({
      tabContainer: {
        // flex: 3,
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
    const sectionItems = items.filter((item) => item.category === index);
    return {
      title: route,
      data: new Array(Math.ceil(sectionItems.length / 3))
        .fill(undefined)
        .map((_, i) => sectionItems.slice(i * 3, (i + 1) * 3)),
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id}
        stickySectionHeadersEnabled={false}
        initialNumToRender={5}
        tabBarStyle={styles.tabBar}
        removeClippedSubviews
        contentContainerStyle={{
          width: '100%',
          paddingBottom: 72,
          paddingHorizontal: 12,
        }}
        renderTab={({ title, isActive }) => (
          <TabView title={title} isActive={isActive} />
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row' }}>
            {item.map((item, index) => (
              <ImageItem key={index} item={item} />
            ))}
          </View>
        )}
      /> */}
      {/* <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        numColumns={3}
        renderItem={({ item }) => <ImageItem item={item} />}
      /> */}
      <View
        style={{
          // display: 'none',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Color.gray20,
        }}
      >
        <Button title='Pick an image from camera roll' onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
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
    fontSize: 32,
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
