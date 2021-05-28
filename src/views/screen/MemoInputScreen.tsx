import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
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
    setId(memo?.id);
    setTitle(memo?.title);
    setText(memo?.text);
    setEdit(!memo);
  }, []);

  const onUpdate = () => {
    if (!title) {
      Alert.alert('入力エラー', 'タイトルは必須です');
      return;
    }

    if (id !== undefined) {
      // 編集
      const edits = memos;
      edits?.splice(
        edits.findIndex((e) => e.id === id),
        1,
        {
          id: id,
          title: title,
          text: text ?? '',
        }
      );
      setMemoList([...(edits ?? [])]);
    } else {
      // 新規
      const newId =
        memos && memos.length > 0
          ? (Math.max(...memos.map((_) => Number(_.id))) + 1).toString()
          : '0';
      setMemoList([
        ...(memos ?? []),
        {
          id: newId,
          title: title,
          text: text ?? '',
        },
      ]);
    }
    onClose();
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
    alignItems: 'center',
    justifyContent: 'center',
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
