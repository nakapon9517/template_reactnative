import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Calc } from '@/entities';
import { Route, Color } from '@/constants';
import { useCalcList, useCalcCategories } from '@/hooks';
import {
  AddButton,
  AddTabButton,
  Admob,
  CalcList,
  Header,
} from '@/views/components';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';
import { Input } from 'react-native-elements';

type Props = {
  navigation: StackNavigationProp<Route, 'Calc'>;
  route: RouteProp<Route, 'Calc'>;
};

const CalcScreen = (props: Props) => {
  const { calcs, setCalcList } = useCalcList();
  const { calcCategories, setCalcCategoryList } = useCalcCategories();
  const [disabled, setDisabled] = useState(false);
  const [editCategory, setEditCategory] = useState<string>();
  const [editText, setEditText] = useState<string>();

  useEffect(() => {
    setDisabled(calcCategories ? calcCategories.length === 0 : true);
  }, [calcCategories]);

  const onClickUpdate = () => {
    calcCategories &&
      editCategory &&
      editText &&
      setCalcCategoryList([
        ...calcCategories.filter((_, i) => _.id !== editCategory),
        {
          id: editCategory,
          title: editText,
        },
      ]);
    setEditText(undefined);
    setEditCategory(undefined);
  };

  const onClickAddCategoryButton = () => {
    props.navigation.navigate('CalcCategoryScreen');
  };
  const onClickAddButton = () => {
    props.navigation.navigate('CalcInput', {});
  };

  const onClickItem = (calc: Calc) => {
    props.navigation.navigate('CalcInput', { calc });
  };

  const onClickCategory = (id: string) => {
    setEditText(calcCategories?.find((_) => _.id === id)?.title);
    setEditCategory(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Header title='集計' />
      <CalcList
        items={calcs ?? []}
        categories={calcCategories ?? []}
        onClickCategory={onClickCategory}
        onClickItem={onClickItem}
      />
      {Boolean(editCategory) && (
        <View style={styles.modalView}>
          <Modal isVisible onBackdropPress={() => setEditCategory(undefined)}>
            <View style={styles.modal}>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onClickUpdate}>
                  <Text>更新</Text>
                </TouchableOpacity>
              </View>
              <Input
                value={editText}
                label='カテゴリ'
                labelStyle={styles.label}
                onChangeText={setEditText}
                inputStyle={styles.text}
                maxLength={40}
              />
            </View>
          </Modal>
        </View>
      )}
      <AddTabButton onPress={onClickAddCategoryButton} />
      <AddButton disabled={disabled} onPress={onClickAddButton} />
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
  modalView: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 100,
    backgroundColor: Color.gray90,
  },
  buttons: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.theme1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.gray40,
  },
  text: {
    color: Color.gray5,
    paddingLeft: 8,
  },
});

export { CalcScreen };
