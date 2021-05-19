import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import { Calc, Category } from '@/entities';
import { Color } from '@/constants';
import Modal from 'react-native-modal';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon, Input } from 'react-native-elements';

interface Props {
  calcs: Calc[];
  visible: boolean;
  categories: Category[];
  newCategory: string;
  setNewCategory: (text: string) => void;
  setOpen: (_: boolean) => void;
  onClickItem: (item: Calc) => void;
  onSaveNewCategory: () => void;
}
const CategoryView = (props: Props) => {
  const [newCategory, setNewCategory] = useState('');

  console.log('aaa');

  return (
    <View style={styles.view}>
      <Modal
        style={styles.modalWrapper}
        isVisible={props.visible}
        backdropColor={Color.gray100}
        onBackdropPress={() => props.setOpen(false)}
        onSwipeComplete={() => props.setOpen(false)}
        swipeDirection='down'
        swipeThreshold={Dimensions.get('screen').height / 3}
      >
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={props.categories}
          keyExtractor={(category) => String(category.id)}
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
            <Input
              value={newCategory}
              label='カテゴリを作成する'
              labelStyle={styles.label}
              placeholder='入力...'
              // onBlur={props.onSaveNewCategory}
              onChangeText={setNewCategory}
              containerStyle={styles.input}
              inputStyle={styles.inputName}
            />
          )}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    // flex: 1,
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

export { CategoryView };
