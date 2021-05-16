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
} from 'react-native';
import { Item, Category } from '@/entities';
import { Color } from '@/constants';
import Modal from 'react-native-modal';
import { Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  item?: Item;
  category?: Category;
  open: boolean;
  setOpen: (_: boolean) => void;
}
export const CalcInput = (props: Props) => {
  const pickNumbers = Array(101)
    .fill(undefined)
    .map((_, i) => {
      return { label: String(i), value: i };
    });
  const [category, setCategory] = useState<Category>();
  const [name, setName] = useState<string>();
  const [count, setCount] = useState<number>();
  const [price, setPrice] = useState<number>();

  useEffect(() => {
    if (props.item) {
      setCategory(props.category);
      setName(props.item.name);
      setCount(props.item.count);
      setPrice(props.item.price);
    }
  }, [props.item]);

  const Header = () => {
    const styles = StyleSheet.create({
      header: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'space-between',
      },
      buttons: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Color.gray50,
        paddingHorizontal: 8,
      },
      componentLeft: {
        flex: 1,
        alignItems: 'flex-start',
      },
      componentCenter: {
        flex: 1,
        alignItems: 'center',
      },
      componentRight: {
        flex: 1,
        alignItems: 'flex-end',
      },
    });
    return (
      <View style={styles.header}>
        <View style={styles.buttons}>
          <View style={styles.componentLeft}>
            <Icon type='material' name='close' size={24} color={Color.gray5} />
          </View>
          <TouchableOpacity style={styles.componentRight} onPress={onUpdate}>
            <Icon type='material' name='check' size={24} color={Color.gray5} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onUpdate = () => {
    // データ更新処理
    console.log('bbbb');
    onClose();
  };

  const onClose = () => {
    setCategory(undefined);
    setName(undefined);
    setCount(0);
    props.setOpen(false);
  };

  return (
    <View style={styles.view}>
      <Modal
        style={styles.modalWrapper}
        isVisible={props.open}
        backdropColor={Color.gray100}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        swipeDirection='down'
        swipeThreshold={Dimensions.get('screen').height / 2}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modal}
          keyboardVerticalOffset={300}
        >
          <Header />
          <View style={styles.body}>
            <View>
              <Text style={styles.category}>{props.category?.title}</Text>
            </View>
            <Input
              label='Name'
              labelStyle={styles.label}
              value={name}
              onChangeText={(text) => setName(text)}
              containerStyle={styles.input}
              inputStyle={styles.inputName}
            />
            <View style={styles.countWrapper}>
              <Text style={styles.label}>Count(Max:100)</Text>
              <View style={styles.countView}>
                <View>
                  <RNPickerSelect
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
                    value={count}
                    placeholder='aaa'
                    style={customPickerStyles}
                    onValueChange={(value) => setCount(value)}
                    items={pickNumbers}
                  />
                </View>
              </View>
            </View>
            <Input
              label='Price'
              labelStyle={styles.label}
              value={String(price)}
              onChangeText={(text) => setPrice(Number(text))}
              containerStyle={styles.input}
              inputStyle={styles.inputName}
              keyboardType='number-pad'
            />
          </View>
        </KeyboardAvoidingView>
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
    paddingLeft: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: Color.gray80,
  },
  modal: {
    flex: 1,
  },
  body: {
    flex: 10,
    paddingTop: 24,
    alignItems: 'center',
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
