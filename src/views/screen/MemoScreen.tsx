import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Input, Icon } from 'react-native-elements';
import { Color } from '@/constants';
import { Textarea } from '@/views/components';

interface Props {
  test: string;
}

const MemoScreen = (props: Props) => {
  const [text, setText] = useState('');

  const HeaderView = () => {
    const styles = StyleSheet.create({
      view: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: Color.gray90,
        borderBottomWidth: 1,
        borderBottomColor: Color.gray80,
      },
      icon: {
        padding: 12,
        marginRight: 4,
      },
    });

    return (
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => Keyboard.dismiss()}
        >
          <Icon type='material' name='list' color={Color.gray5} size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <HeaderView />
      {[''].map((_, i) => (
        <Textarea key={i} text={text} onChangeText={(text) => setText(text)} />
      ))}
      <View style={styles.admob}>
        <Text style={{ color: Color.gray5 }}>admob</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.gray90,
  },
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
  text: {
    color: Color.gray5,
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
  admob: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.theme2,
  },
});

export { MemoScreen };
