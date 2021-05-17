import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { Memo } from '@/entities';
import { Route, Color } from '@/constants';
import { Textarea, Header } from '@/views/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';

interface Props {
  navigation: StackNavigationProp<Route, 'MemoInput'>;
  route: RouteProp<Route, 'MemoInput'>;
}

export const MemoInputScreen = (props: Props) => {
  const { memo } = props.route.params;
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log(memo);
    if (memo) {
      setTitle(memo.title);
      setText(memo.text);
    } else {
      setEdit(true);
    }
  }, [memo]);

  const onUpdate = () => {
    // データ更新処理
    console.log('bbbb');
    onClose();
  };

  const onClose = () => {
    setTitle(undefined);
    setText(undefined);
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
          title={title}
          goBack
          onClickBack={onClose}
          CenterComponent={
            !edit && (
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Icon
                  type='material'
                  name='edit'
                  color={Color.gray40}
                  size={20}
                />
              </TouchableOpacity>
            )
          }
        />
        <View style={styles.body}>
          {edit && (
            <Input
              value={title}
              label='Title'
              labelStyle={styles.label}
              placeholder='name here..'
              onChangeText={setTitle}
              containerStyle={styles.input}
              inputStyle={styles.inputName}
            />
          )}
          <Textarea text={text ?? ''} onChangeText={(text) => setText(text)} />
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
  icon: {
    padding: 8,
    marginRight: 4,
    alignItems: 'flex-end',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flex: 10,
    width: 600,
    paddingTop: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Color.gray40,
  },
  input: {
    width: 300,
    paddingHorizontal: 10,
    marginTop: 24,
    paddingBottom: 0,
    zIndex: 1,
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
