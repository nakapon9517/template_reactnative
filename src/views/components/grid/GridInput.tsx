import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Item } from '@/entities';
import { Color } from '@/constants';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { Input, Image, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
  item?: Item;
  open: boolean;
  setOpen: (_: boolean) => void;
}
export const GridInput = (props: Props) => {
  const noImage = require('@/assets/images/noImage_gray.png');
  const pickNumbers = Array(100)
    .fill(undefined)
    .map((_, i) => {
      return { label: String(i), value: i };
    });
  const [image, setImage] = useState<string>();
  const [name, setName] = useState<string>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (props.item) {
      setImage(props.item.uri);
      setName(props.item.name);
      setCount(props.item.count);
    }
  }, [props.item]);

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
      // console.log(result.uri);
      setImage(result.uri);
    }
  };

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
    console.log('aaaaa');
    onClose();
  };

  const onClose = () => {
    setImage(undefined);
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
        <View style={styles.modal}>
          <Header />
          <View style={styles.body}>
            <TouchableOpacity
              style={[
                styles.imageWrapper,
                Boolean(image) && { borderWidth: 0 },
              ]}
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
                    style={customPickerStyles}
                    onValueChange={(value) => setCount(value)}
                    items={pickNumbers}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    // flex: 1,
  },
  modalWrapper: {
    // flex: 1,
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
  imageWrapper: {
    // flex: 1,
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
