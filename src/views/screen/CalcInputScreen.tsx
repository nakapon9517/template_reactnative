import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Route, Color } from '@/constants';
import { Header } from '@/views/components';
import { useCalcList, useCalcCategories } from '@/hooks';
import { Formatter } from '@/utils';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Input, Icon, Slider } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
  navigation: StackNavigationProp<Route, 'CalcInput'>;
  route: RouteProp<Route, 'CalcInput'>;
}

export const CalcInputScreen = (props: Props) => {
  const { calc } = props.route.params;
  const { calcs, setCalcList } = useCalcList();
  const { calcCategories } = useCalcCategories();
  const [category, setCategory] = useState<number>(0);
  const [id, setId] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [count, setCount] = useState<number>(0);
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    setId(calc?.id);
    setCategory(calc ? calc.category : 0);
    setTitle(calc?.name);
    setCount(calc ? calc.count : 0);
    setPrice(calc && calc.price !== 0 ? String(calc.price) : undefined);
  }, []);

  const onUpdate = () => {
    if (category === undefined) {
      Alert.alert('選択エラー', 'カテゴリは必須です');
      return;
    } else if (!title) {
      Alert.alert('入力エラー', 'タイトルは必須です');
      return;
    }
    const num = Number(price);
    if ((price && !Number.isSafeInteger(num)) || 0 > num || 99999999 < num) {
      Alert.alert('入力エラー', '価格は¥0 ~ ¥99,999,999で入力してください');
      return;
    }

    if (id !== undefined) {
      // 編集
      const edits = calcs;
      edits?.splice(
        edits.findIndex((e) => e.id === id),
        1,
        {
          id: id,
          name: title,
          count: count,
          price: price ? Number(price) : 0,
          category: category,
        }
      );
      setCalcList([...(edits ?? [])]);
    } else {
      // 新規
      const newId =
        calcs && calcs.length > 0
          ? (Math.max(...calcs.map((_) => Number(_.id))) + 1).toString()
          : '0';
      setCalcList([
        ...(calcs ?? []),
        {
          id: newId,
          name: title,
          count: count,
          price: price ? Number(price) : 0,
          category: category,
        },
      ]);
    }
    onClose();
  };

  const onClose = () => {
    setCategory(0);
    setTitle(undefined);
    setCount(0);
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.view}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modal}
        // keyboardVerticalOffset={300}
      >
        <Header
          onClickBack={onClose}
          RightComponent={
            <TouchableOpacity onPress={onUpdate} style={styles.icon}>
              <Icon
                type='material'
                name='check'
                size={24}
                color={Color.gray5}
                style={{
                  height: 40,
                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>
          }
        />
        <View style={styles.body}>
          <View>
            <Text style={styles.label}>カテゴリ*</Text>
            <View style={styles.countView}>
              <RNPickerSelect
                items={
                  calcCategories
                    ? calcCategories.map((category, i) => {
                        return { label: category.title, value: i, key: i };
                      })
                    : []
                }
                value={category}
                style={customPickerStyles}
                placeholder={{ label: '', value: undefined }}
                onValueChange={setCategory}
                Icon={() => (
                  <Icon
                    type='material'
                    name='keyboard-arrow-down'
                    size={24}
                    color={Color.gray5}
                    style={{
                      height: 40,
                      justifyContent: 'center',
                    }}
                  />
                )}
              />
            </View>
          </View>
          <Input
            value={title}
            label='タイトル'
            labelStyle={styles.label}
            placeholder='入力...'
            onChangeText={(text) => setTitle(text)}
            containerStyle={styles.input}
            inputStyle={styles.inputTitle}
          />
          <View style={styles.countWrapper}>
            <Text style={styles.label}>カウント {count}</Text>
            <Slider
              step={1}
              minimumValue={0}
              maximumValue={100}
              value={count}
              onValueChange={setCount}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: Color.theme2,
              }}
            />
          </View>
          <Input
            value={price}
            label='価格'
            labelStyle={styles.label}
            placeholder='入力...'
            onChangeText={setPrice}
            containerStyle={styles.input}
            inputStyle={styles.inputPrice}
            keyboardType='number-pad'
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Color.gray100,
  },
  modal: {
    flex: 1,
  },
  body: {
    flex: 10,
    paddingTop: 24,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Color.gray40,
  },
  input: {
    width: 300,
    paddingHorizontal: 10,
    marginTop: 24,
    paddingBottom: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.gray40,
  },
  inputTitle: {
    color: Color.gray5,
    paddingLeft: 8,
  },
  inputPrice: {
    color: Color.gray5,
    paddingRight: 8,
    textAlign: 'right',
  },
  countWrapper: {
    width: 300,
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
  countView: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8,
    padding: 0,
    borderRadius: 8,
    backgroundColor: Color.gray70,
  },
});

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    width: 288,
    height: 40,
    fontSize: 16,
    paddingLeft: 12,
    alignItems: 'center',
    borderRadius: 8,
    color: Color.gray5,
  },
});
