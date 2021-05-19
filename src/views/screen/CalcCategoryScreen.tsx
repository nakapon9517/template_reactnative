import React, { useState } from 'react';
import { StyleSheet, Dimensions, FlatList, SafeAreaView } from 'react-native';
import { Category } from '@/entities';
import { useCalcCategories } from '@/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route, Color } from '@/constants';
import { Header, CategoryNew } from '@/views/components';
import { RouteProp } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

type Props = {
  navigation: StackNavigationProp<Route, 'CalcCategoryScreen'>;
  route: RouteProp<Route, 'CalcCategoryScreen'>;
};

const CalcCategoryScreen = (props: Props) => {
  const { calcCategories, setCalcCategoryList } = useCalcCategories();

  const onSaveNewCategory = (text?: string) => {
    if (!text) return;
    setCalcCategoryList([
      ...(calcCategories ?? []),
      { id: calcCategories ? calcCategories.length : 0, title: text },
    ]);
  };

  const onClose = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Header title='カテゴリ' onClickBack={onClose} />
      <FlatList
        contentContainerStyle={{ alignItems: 'center' }}
        data={calcCategories}
        keyExtractor={(_, index) => String(index)}
        stickyHeaderIndices={[0]}
        renderItem={(category) => (
          <Input
            value={category.item.title}
            label={category.index}
            labelStyle={styles.label}
            onChangeText={(text) => console.log(text)}
            containerStyle={styles.input}
            inputStyle={styles.inputName}
          />
        )}
        ListHeaderComponent={() => (
          <CategoryNew onSaveNewCategory={onSaveNewCategory} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.gray100,
  },
  modalWrapper: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    marginTop: 72,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: Color.gray90,
  },
  modal: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.gray40,
  },
  input: {
    width: 300,
    paddingHorizontal: 10,
    marginTop: 24,
    paddingBottom: 0,
  },
  inputName: {
    color: Color.gray5,
    paddingLeft: 8,
  },
});

export { CalcCategoryScreen };
