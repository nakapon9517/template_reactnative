import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useMemoList } from '@/hooks';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { Color } from '@/constants';
import { Admob, MemoView, Header } from '@/views/components';
import { Category } from '@/entities';

interface Props {
  test: string;
}

const MemoScreen = (props: Props) => {
  const { memos } = useMemoList();
  const [category, setCategory] = useState<Category>();

  const onClickList = (category: Category) => {
    setCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Header
        title='メモ'
        LeftComponent={
          category && (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setCategory(undefined)}
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
      <MemoView memos={memos} category={category} onPressList={onClickList} />
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
