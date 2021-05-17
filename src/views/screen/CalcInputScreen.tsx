import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { Item, Category } from '@/entities';
import { Route, Color } from '@/constants';
import { Header } from '@/views/components';
import { useItemCategories } from '@/hooks';
import Modal from 'react-native-modal';
import { Input, Icon } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
  navigation: StackNavigationProp<Route, 'CalcInput'>;
  route: RouteProp<Route, 'CalcInput'>;
}

export const CalcInputScreen = (props: Props) => {
  const { item } = props.route.params;
  const categories = useItemCategories();
  const [category, setCategory] = useState<Category>();
  const [name, setName] = useState<string>();
  const [count, setCount] = useState<number>();
  const [price, setPrice] = useState<number>();
  const pickNumbers = Array(101)
    .fill(undefined)
    .map((_, i) => {
      return { label: String(i), value: i, key: i };
    });

  useEffect(() => {
    if (item) {
      setCategory(categories[item.category]);
      setName(item.name);
      setCount(item.count);
      setPrice(item.price);
    }
  }, []);

  const onUpdate = () => {
    // データ更新処理
    console.log('bbbb');
    onClose();
  };

  const onClose = () => {
    setCategory(undefined);
    setName(undefined);
    setCount(0);
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.view}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modal}
        keyboardVerticalOffset={300}
      >
        <Header title={category?.title} goBack onClickBack={onClose} />
        <View style={styles.body}>
          <Input
            value={name}
            label='Name'
            labelStyle={styles.label}
            placeholder='name here..'
            onChangeText={(text) => setName(text)}
            containerStyle={styles.input}
            inputStyle={styles.inputName}
          />
          <View style={styles.countWrapper}>
            <Text style={styles.label}>Count(Max:100)</Text>
            <View style={styles.countView}>
              <View>
                <RNPickerSelect
                  items={pickNumbers}
                  value={count}
                  style={customPickerStyles}
                  placeholder={{ label: 'Select...', value: undefined }}
                  onValueChange={(value) => setCount(value)}
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
          </View>
          <Input
            value={price ? String(price) : undefined}
            label='Price'
            labelStyle={styles.label}
            placeholder='100..'
            onChangeText={(text) => setPrice(Number(text))}
            containerStyle={styles.input}
            inputStyle={styles.inputName}
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
    padding: 8,
    marginRight: 4,
    alignItems: 'flex-end',
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
  inputName: {
    color: Color.gray5,
    paddingLeft: 8,
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
    width: 260,
    height: 40,
    fontSize: 16,
    alignItems: 'center',
    borderRadius: 8,
    color: Color.gray5,
  },
});
