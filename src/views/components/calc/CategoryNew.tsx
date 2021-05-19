import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Color } from '@/constants';
import { Input } from 'react-native-elements';

type Props = {
  onSaveNewCategory: (text?: string) => void;
};

const CategoryNew = (props: Props) => {
  const [newCategory, setNewCategory] = useState<string>();

  return (
    <View style={styles.view}>
      <Input
        value={newCategory}
        label='カテゴリ追加'
        labelStyle={styles.label}
        placeholder='入力...'
        onChangeText={setNewCategory}
        containerStyle={styles.input}
        inputStyle={styles.inputName}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.onSaveNewCategory(newCategory)}
      >
        <Text>作成</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: Color.gray80,
    borderRadius: 4,
    backgroundColor: Color.gray100,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.gray40,
  },
  input: {
    width: 300,
  },
  inputName: {
    color: Color.gray5,
    paddingLeft: 8,
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.theme1,
  },
});

export { CategoryNew };
