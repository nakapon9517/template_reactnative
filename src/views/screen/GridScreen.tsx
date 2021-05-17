import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Platform, Alert } from 'react-native';
import { Route, Color } from '@/constants';
import { useImage, useImageCategories } from '@/hooks';
import { Item } from '@/entities';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Admob, GridList, Header, AddButton } from '@/views/components';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImageEditor from '@react-native-community/image-editor';

type Props = {
  navigation: StackNavigationProp<Route, 'Grid'>;
  route: RouteProp<Route, 'Grid'>;
};

const GridScreen = (props: Props) => {
  const categories = useImageCategories();
  const { items } = useImage({ categories: categories });

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

  const onClickAddButton = () => {
    props.navigation.navigate('GridInput', {});
  };

  const onClickItem = (item: Item) => {
    props.navigation.navigate('GridInput', { item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <GridList
        items={items}
        ListHeader={<Header title='カウント' />}
        onPress={onClickItem}
      />
      <AddButton onPress={onClickAddButton} />
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
