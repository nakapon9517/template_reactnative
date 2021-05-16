import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Platform, Alert } from 'react-native';
// import {Text} from 'react-native-elements'
import { Color } from '@/constants';
import { useImage } from '@/hooks';
import {
  Admob,
  GridList,
  Header,
  AddButton,
  GridInput,
} from '@/views/components';
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
  const [open, setOpen] = useState(false);

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
      {/* <AddButton /> */}
      {/* <AddButton onPress={pickImage} /> */}
      <AddButton onPress={() => setOpen(true)} />
      <GridInput open={open} setOpen={setOpen} />
      <Admob />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.gray100,
  },
});

export { GridScreen };
