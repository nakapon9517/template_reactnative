import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Route, Color } from '@/constants';
import { Textarea, Header } from '@/views/components';
import { useMemoList } from '@/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';

interface Props {
  navigation: StackNavigationProp<Route, 'MemoInput'>;
  route: RouteProp<Route, 'MemoInput'>;
}

export const MemoInputScreen = (props: Props) => {
  const { memo } = props.route.params;
  const { memos, setMemoList } = useMemoList();
  const [id, setId] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const newId =
      Array.isArray(memos) && memos.length > 0
        ? (Math.max(...memos.map((_) => Number(_.id))) + 1).toString()
        : '0';
    setId(memo ? memo.id : newId);
    setTitle(memo?.title);
    setText(memo?.text);
    setEdit(!memo);
  }, []);

  const onUpdate = () => {
    if (id && title) {
      setMemoList([
        ...(memos ?? []),
        {
          id: id,
          title: title,
          text: text ?? '',
        },
      ]);
      onClose();
    } else {
      Alert.alert('選択エラー', 'カテゴリは必須です');
      return;
    }
  };

  const onClose = () => {
    setTitle(undefined);
    setText('');
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
          RightComponent={
            <TouchableOpacity onPress={onUpdate} style={styles.icon}>
              <Text>更新</Text>
            </TouchableOpacity>
          }
        />
        <View style={styles.body}>
          {edit && (
            <Input
              value={title}
              label='タイトル*'
              labelStyle={styles.label}
              placeholder='入力...'
              onChangeText={setTitle}
              containerStyle={styles.input}
              inputStyle={styles.inputName}
            />
          )}
          <Textarea text={text} onChangeText={setText} />
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
    width: 50,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    backgroundColor: Color.theme1,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flex: 10,
    width: '100%',
    maxWidth: 600,
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
