import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Item } from '@/entities';
import { Route, Color } from '@/constants';
import { Header } from '@/views/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { Input, Image, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
  navigation: StackNavigationProp<Route, 'GridInput'>;
  route: RouteProp<Route, 'GridInput'>;
}

export const GridInputScreen = (props: Props) => {
  const { item } = props.route.params;
  const noImage = require('@/assets/images/noImage_gray.png');
  const pickNumbers = Array(100)
    .fill(undefined)
    .map((_, i) => {
      return { label: String(i), value: i };
    });
  const [image, setImage] = useState<string>();
  const [name, setName] = useState<string>();
  const [count, setCount] = useState<number>();

  useEffect(() => {
    if (item) {
      setImage(item.uri);
      setName(item.name);
      setCount(item.count);
    }
  }, [item]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
      base64: true,
    });

    if (!result.cancelled) {
      // console.log(result.base64);
      // setImage(result.base64);
      console.log(result.uri);
      setImage(result.uri);
    }
  };

  const onUpdate = () => {
    // データ更新処理
    console.log('aaaaa');
    onClose();
  };

  const onClose = () => {
    setImage(undefined);
    setName(undefined);
    setCount(0);
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.view}>
      <Header
        // title={title}
        goBack
        onClickBack={onClose}
      />
      <View style={styles.body}>
        <TouchableOpacity
          style={[styles.imageWrapper, Boolean(image) && { borderWidth: 0 }]}
          onPress={pickImage}
        >
          <View>
            <Image
              source={image ? { uri: image } : noImage}
              style={styles.image}
              containerStyle={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
            {image && (
              <View style={styles.badge}>
                <Icon
                  type='material'
                  name='close'
                  size={16}
                  color={Color.gray5}
                  onPress={() => setImage(undefined)}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Input
          label='Name'
          labelStyle={styles.label}
          value={name}
          onChangeText={(text) => setName(text)}
          containerStyle={styles.input}
          inputStyle={styles.inputName}
        />
        <View style={styles.input}>
          <Text style={styles.label}>Count</Text>
          <View style={styles.countView}>
            <View>
              <RNPickerSelect
                items={pickNumbers}
                value={count}
                style={customPickerStyles}
                placeholder={{ label: 'Select...', value: undefined }}
                onValueChange={(value) => setCount(value)}
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
              />
            </View>
          </View>
        </View>
      </View>
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
  body: {
    flex: 10,
    paddingTop: 24,
    alignItems: 'center',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.gray70,
    borderRadius: 99,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 99,
  },
  badge: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 4,
    right: 4,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.gray70,
  },
  input: {
    width: 300,
    padding: 10,
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
