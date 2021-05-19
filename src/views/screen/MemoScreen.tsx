import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Memo } from '@/entities';
import { AddButton, Admob, MemoList, Header } from '@/views/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route, Color } from '@/constants';
import { useMemoList } from '@/hooks';
import { RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';

type Props = {
  navigation: StackNavigationProp<Route, 'Memo'>;
  route: RouteProp<Route, 'Memo'>;
};

const MemoScreen = (props: Props) => {
  const { memos, setMemoList } = useMemoList();

  const onRowDelete = (id: string) => {
    setMemoList(memos?.filter((memo) => memo.id !== id) ?? []);
  };

  const onClickAddButton = () => {
    props.navigation.navigate('MemoInput', {});
  };

  const onClickList = useCallback((memo: Memo) => {
    props.navigation.navigate('MemoInput', { memo });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Header title='メモ' />
      <MemoList
        memos={memos ?? []}
        onPressList={onClickList}
        onRowDelete={onRowDelete}
      />
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
