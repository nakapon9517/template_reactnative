import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { Route, Color } from '@/constants';
import { Textarea, Header } from '@/views/components';
import { Memo } from '@/entities';
import { useMemoList } from '@/hooks';
import AppContext from '@/contexts/AppContext';
// import storage, { StorageName } from '@/utils/Storage';
import { Storage, StorageName } from '@/utils/Storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';
import { stringify, parse } from 'telejson';

interface Props {
  navigation: StackNavigationProp<Route, 'MemoInput'>;
  route: RouteProp<Route, 'MemoInput'>;
}

export const MemoInputScreen = (props: Props) => {
  const { memo } = props.route.params;
  const { memos, setMemos } = useContext(AppContext);
  // let memos: Memo[] = [];
  // useMemoList().then((res) => {
  //   memos = res.memos;
  // });
  const [id, setId] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // storage.remove({
    //   key: StorageName.MEMO_LIST,
    // });
    // console.log('delete::::::');
    if (memo) {
      setId(memo.id);
      setTitle(memo.title);
      setText(memo.text);
    } else {
      setId(String(memos ? memos.length : 0));
      setEdit(true);
    }
  }, []);

  const onUpdate = () => {
    const storage = new Storage<Memo[]>();
    if (id && title) {
      const memo: Memo = {
        id: id,
        title: title,
        text: text ?? '',
      };
      const datas = [...(memos ?? []), memo];
      console.log('update', datas);
      storage.save(
        StorageName.MEMO_LIST,
        // id: memo.id,
        datas
      );
      setMemos(datas);
      onClose();
    } else {
      setError(true);
    }
  };

  const onClose = () => {
    setTitle(undefined);
    setText('');
    setError(false);
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
                color={Color.gray40}
                size={20}
              />
            </TouchableOpacity>
          }
        />
        <View style={styles.body}>
          {edit && (
            <>
              <Input
                value={title}
                label='Title'
                labelStyle={styles.label}
                placeholder='name here..'
                onChangeText={setTitle}
                containerStyle={styles.input}
                inputStyle={styles.inputName}
              />
              {error && (
                <Text style={styles.errorText}>タイトルが未入力です</Text>
              )}
            </>
          )}
          <Textarea text={text} onChangeText={setText} />
          {/* {!error && (
            <TouchableOpacity
              style={styles.error}
              onPress={() => setError(false)}
            >
              <Text style={styles.errorText}>タイトルが未入力です</Text>
            </TouchableOpacity>
          )} */}
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
    paddingHorizontal: 8,
    marginRight: 4,
    alignItems: 'flex-end',
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
  error: {
    position: 'absolute',
    bottom: 0,
    width: '80%',
    height: 60,
    backgroundColor: Color.red,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: Color.red,
  },
});
