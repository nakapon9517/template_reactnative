import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Platform, Alert } from 'react-native';
// import {Text} from 'react-native-elements'
import { Color } from '@/constants';
import { useImage } from '@/hooks';
import { Item } from '@/entities';
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
  const [open, setOpen] = useState(false);
  const [selectedItem, setItem] = useState<Item>();

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

  const onClickItem = (item: Item) => {
    setItem(item);
    setOpen(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <GridList
        items={items}
        ListHeader={<Header title='カウント' />}
        onPress={onClickItem}
      />
      <AddButton onPress={() => setOpen(true)} />
      <GridInput item={selectedItem} open={open} setOpen={setOpen} />
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
