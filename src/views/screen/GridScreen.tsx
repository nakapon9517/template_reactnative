import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
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
import { Icon } from 'react-native-elements';

type Props = {
  navigation: StackNavigationProp<Route, 'Grid'>;
  route: RouteProp<Route, 'Grid'>;
};

const GridScreen = (props: Props) => {
  const categories = useImageCategories();
  const { items } = useImage({ categories: categories });
  const [edit, setEdit] = useState(false);

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
      <Header
        title='カウント'
        RightComponent={
          <TouchableOpacity style={styles.icon} onPress={() => setEdit(!edit)}>
            <Icon
              type='material'
              name='edit'
              color={edit ? Color.gray5 : Color.gray80}
              size={24}
            />
          </TouchableOpacity>
        }
      />
      <GridList items={items} edit={edit} onPress={onClickItem} />
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
  icon: {
    padding: 8,
    marginRight: 4,
    alignItems: 'flex-end',
  },
});

export { GridScreen };
