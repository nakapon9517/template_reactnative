import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Grid } from '@/entities';
import { Route, Color } from '@/constants';
import { useGridList } from '@/hooks';
import { Admob, GridList, Header, AddButton } from '@/views/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import * as Haptics from 'expo-haptics';

type Props = {
  navigation: StackNavigationProp<Route, 'Grid'>;
  route: RouteProp<Route, 'Grid'>;
};

const GridScreen = (props: Props) => {
  const { grids, setGridList } = useGridList();
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

  const onClickCount = (add: boolean, item: Grid) => {
    setGridList(
      grids
        ? grids.map((grid) => {
            return {
              id: grid.id,
              name: grid.name,
              count: grid.count + (item.id === grid.id ? (add ? +1 : -1) : 0),
              uri: grid.uri,
            };
          })
        : []
    );
    Haptics.selectionAsync();
  };

  const onClickAddButton = () => {
    props.navigation.navigate('GridInput', {});
  };

  const onClickDelete = (id: string) => {
    setGridList(grids?.filter((grid) => grid.id !== id) ?? []);
  };

  const onClickItem = (grid: Grid) => {
    props.navigation.navigate('GridInput', { grid });
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
      <GridList
        items={grids ?? []}
        edit={edit}
        onPress={onClickItem}
        onClickCount={onClickCount}
        onClickDelete={onClickDelete}
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
  icon: {
    padding: 8,
    marginRight: 4,
    alignItems: 'flex-end',
  },
});

export { GridScreen };
