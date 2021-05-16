import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Memo, Category } from '@/entities';
import { Route, Color } from '@/constants';
import { Textarea } from '@/views/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';

interface Props {
  item?: Memo;
  navigation: StackNavigationProp<Route, 'MemoInput'>;
  route: RouteProp<Route, 'MemoInput'>;
}

export const MemoInputScreen = (props: Props) => {
  const [category, setCategory] = useState<Category>();
  const [text, setText] = useState<string>();

  useEffect(() => {
    if (props.item) {
      setCategory(props.item.category);
      setText(props.item.text);
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
    setText(undefined);
    props.navigation.goBack();
    // props.setOpen(false);
  };

  return (
    <View style={styles.view}>
      {/* <Modal
        style={styles.modalWrapper}
        isVisible={true}
        backdropColor={Color.gray100}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        swipeDirection='down'
        swipeThreshold={Dimensions.get('screen').height / 2}
      > */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modal}
        keyboardVerticalOffset={300}
      >
        <Header />
        <View style={styles.body}>
          <View>
            <Text style={styles.category}>{props.item?.category.title}</Text>
          </View>
          <Input
            value={text}
            label='Name'
            labelStyle={styles.label}
            placeholder='name here..'
            onChangeText={(text) => setText(text)}
            containerStyle={styles.input}
            inputStyle={styles.inputName}
          />
          <Textarea
            text={props.item?.text ? props.item?.text : ''}
            onChangeText={(text) => console.log(text)}
          />
        </View>
      </KeyboardAvoidingView>
      {/* </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    // // width: Dimensions.get('screen').width,
    // // height: Dimensions.get('screen').height,
    // marginTop: 72,
    // marginLeft: 0,
    // marginRight: 0,
    // marginBottom: 0,
    // paddingLeft: 0,
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
    backgroundColor: Color.gray80,
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
});
