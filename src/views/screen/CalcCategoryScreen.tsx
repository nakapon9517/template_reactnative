import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import { useCalcCategories } from '@/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route, Color } from '@/constants';
import { Category } from '@/entities';
import { Header, CategoryNew } from '@/views/components';
import { RouteProp } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

type Props = {
  navigation: StackNavigationProp<Route, 'CalcCategoryScreen'>;
  route: RouteProp<Route, 'CalcCategoryScreen'>;
};

const CalcCategoryScreen = (props: Props) => {
  const { calcCategories, setCalcCategoryList } = useCalcCategories();

  const onSaveNewCategory = (text?: string) => {
    console.log('-----', calcCategories);
    if (!text) return;
    setCalcCategoryList([
      ...(calcCategories ?? []),
      { id: calcCategories ? calcCategories.length : 0, title: text },
    ]);
  };

  const onClickDelete = (id: number) => {
    calcCategories &&
      setCalcCategoryList(calcCategories.filter((_, index) => index !== id));
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
          <View>
            <Input
              leftIcon={
                <TouchableOpacity onPress={() => onClickDelete(category.index)}>
                  <Icon
                    type='material'
                    name='close'
                    color={Color.gray80}
                    size={16}
                    containerStyle={{
                      width: 32,
                      height: 32,
                      justifyContent: 'center',
                    }}
                  />
                </TouchableOpacity>
              }
              value={category.item.title}
              onChangeText={(text) => console.log(text)}
              containerStyle={styles.input}
              inputStyle={styles.inputName}
            />
          </View>
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
  input: {
    width: 300,
  },
  inputName: {
    color: Color.gray5,
    paddingLeft: 8,
  },
});

export { CalcCategoryScreen };
