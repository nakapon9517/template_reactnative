import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useMemoList } from '@/hooks';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Route, Color } from '@/constants';
import { AddButton, Admob, MemoList, Header } from '@/views/components';
import { Memo } from '@/entities';

type Props = {
  navigation: StackNavigationProp<Route, 'Memo'>;
  route: RouteProp<Route, 'Memo'>;
};

const MemoScreen = (props: Props) => {
  const { memos } = useMemoList();
  const [selectedMemo, setMemo] = useState<Memo>();

  const onClickAddButton = () => {
    setMemo(undefined);
  };

  const onClickList = (memo: Memo) => {
    setMemo(memo);
    props.navigation.navigate('MemoInput', { memo });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Header
        title='メモ'
        LeftComponent={
          selectedMemo && (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setMemo(undefined)}
            >
              <Icon
                type='material'
                name='chevron-left'
                color={Color.gray5}
                size={24}
              />
            </TouchableOpacity>
          )
        }
      />
      <MemoList memos={memos} onPressList={onClickList} />
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
