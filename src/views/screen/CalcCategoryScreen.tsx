import React from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useCalcList, useCalcCategories } from '@/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route, Color } from '@/constants';
import { Header, CategoryNew } from '@/views/components';
import { RouteProp } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

type Props = {
  navigation: StackNavigationProp<Route, 'CalcCategoryScreen'>;
  route: RouteProp<Route, 'CalcCategoryScreen'>;
};

const CalcCategoryScreen = (props: Props) => {
  const { calcs, setCalcList } = useCalcList();
  const { calcCategories, setCalcCategoryList } = useCalcCategories();

  const onSaveNewCategory = (text?: string) => {
    if (!text) return;
    setCalcCategoryList([
      ...(calcCategories ?? []),
      { id: calcCategories ? calcCategories.length : 0, title: text },
    ]);
  };

  const onClickDelete = (id: number) => {
    calcs && setCalcList(calcs.filter((_, index) => index !== id));
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
            <View style={styles.input}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => onClickDelete(category.index)}
              >
                <Icon
                  type='material'
                  name='close'
                  color={Color.gray80}
                  size={12}
                />
              </TouchableOpacity>
              <Text style={styles.inputRead}>{category.item.title}</Text>
            </View>
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
  input: {
    width: 300,
    height: 48,
    padding: 8,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.gray70,
  },
  icon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Color.gray80,
  },
  inputRead: {
    flex: 1,
    color: Color.gray5,
    paddingLeft: 8,
  },
});

export { CalcCategoryScreen };
