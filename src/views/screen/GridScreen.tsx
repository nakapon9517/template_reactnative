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
import { useGridList, useGridCategories } from '@/hooks';
import { Admob, GridList, Header, AddButton } from '@/views/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';

type Props = {
  navigation: StackNavigationProp<Route, 'Grid'>;
  route: RouteProp<Route, 'Grid'>;
};

const GridScreen = (props: Props) => {
  const { grids, setGrids } = useGridList();
  const categories = useGridCategories();
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
      <GridList items={grids ?? []} edit={edit} onPress={onClickItem} />
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
