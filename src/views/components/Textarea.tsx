import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Color } from '@/constants';

interface Props {
  text: string;
  onChangeText: (text: string) => void;
}

export const Textarea = (props: Props) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
    };
  }, []);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.input}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView>
            <TextInput
              multiline
              value={props.text}
              onChangeText={props.onChangeText}
              style={styles.textarea}
              placeholder='入力...'
              placeholderTextColor={Color.gray70}
            />
          </ScrollView>
          {keyboardStatus && (
            <View style={styles.inputFooter}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => Keyboard.dismiss()}
              >
                <Icon
                  type='material'
                  name='keyboard-hide'
                  color={Color.gray5}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          )}
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: '100%',
  },
  textarea: {
    flex: 1,
    marginVertical: 8,
    paddingHorizontal: 12,
    color: Color.gray5,
    fontSize: 16,
    // backgroundColor: 'yellow',
  },
  inputFooter: {
    width: Dimensions.get('window').width,
    padding: 4,
    alignItems: 'flex-end',
  },
  icon: {
    width: 56,
    height: 56,
    padding: 16,
    borderWidth: 1,
    borderColor: Color.gray80,
    borderRadius: 99,
  },
});
