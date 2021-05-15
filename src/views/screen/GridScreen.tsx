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
  Alert,
} from 'react-native';
// import {Text} from 'react-native-elements'
import { Color } from '@/constants';
import { useImage, useImageCategories } from '@/hooks';
import { ImageItem } from '@/views/components';
import { Item } from '@/entities';
import SectionList from 'react-native-tabs-section-list';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImageEditor from '@react-native-community/image-editor';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

interface Props {
  test: string;
}
const GridScreen = (props: Props) => {
  const { items } = useImage();
  const [routes] = useState(() => useImageCategories());
  const [image, setImage] = useState<string>();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('権限がありません');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 0,
      base64: true,
    });

    if (!result.cancelled) {
      console.log(result.base64);
      // setImage(result.base64);
      console.log(result.uri);
      setImage(result.uri);
    }
  };

  const HeaderView = () => {
    const styles = StyleSheet.create({
      view: {
        // flex: 1,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.gray90,
        borderBottomWidth: 1,
        borderBottomColor: Color.gray80,
      },
      text: {
        color: Color.gray5,
      },
    });

    return (
      <View style={styles.view}>
        <Text style={styles.text}>カウント</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
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
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        numColumns={3}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<HeaderView />}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => <ImageItem item={item} />}
      />
      {/* <View
        style={{
          // display: 'none',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Color.gray20,
        }}
      >
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View> */}
      <TouchableOpacity style={styles.add} onPress={pickImage}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
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
    // flex: 1,
    // justifyContent: 'space-between',
    // paddingHorizontal: 12,
    // marginBottom: 480,
    // paddingBottom: 480,
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

export { GridScreen };
