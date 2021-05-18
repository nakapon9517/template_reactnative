import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Memo } from '@/entities';
import { useMemoList } from '@/hooks';
import { AddButton, Admob, MemoList, Header } from '@/views/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route, Color } from '@/constants';
import AppContext from '@/contexts/AppContext';
import { RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';

type Props = {
  navigation: StackNavigationProp<Route, 'Memo'>;
  route: RouteProp<Route, 'Memo'>;
};

const MemoScreen = (props: Props) => {
  const { memos, setMemos } = useContext(AppContext);
  // let memos: Memo[] = [];
  // const [memos, setMemo] = useState<Memo[]>();
  // const [items, setItem] = useState<Memo[]>();
  // useMemoList().then((res) => {
  //   // memos = res.memos;
  //   setMemo(res.memos);
  // });
  const [edit, setEdit] = useState(false);

  const onClickAddButton = () => {
    props.navigation.navigate('MemoInput', {});
  };

  const onClickList = useCallback((memo: Memo) => {
    props.navigation.navigate('MemoInput', { memo });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Header
        title='メモ'
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
      <MemoList memos={memos ?? []} edit={edit} onPressList={onClickList} />
      <AddButton onPress={onClickAddButton} />
      <Admob />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.gray100,
  },
  icon: {
    padding: 8,
    marginRight: 4,
    alignItems: 'flex-end',
  },
});

export { MemoScreen };
