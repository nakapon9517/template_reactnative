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
import { useImage } from '@/hooks';
import { Admob, GridList, Header } from '@/views/components';
import { Item } from '@/entities';
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

  const AddButton = React.memo(() => {
    const styles = StyleSheet.create({
      add: {
        width: 54,
        height: 54,
        position: 'absolute',
        right: 8,
        bottom: 68,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 99,
        backgroundColor: Color.gray80,
        zIndex: 99,
      },
      addText: {
        fontSize: 32,
        color: Color.gray5,
      },
    });

    return (
      <TouchableOpacity style={styles.add} onPress={pickImage}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <GridList items={items} ListHeader={<Header title='カウント' />} />
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
      <AddButton />
      <Admob />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.gray90,
  },
});

export { GridScreen };
