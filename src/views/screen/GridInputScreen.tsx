import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Route, Color } from '@/constants';
import { Header } from '@/views/components';
import { useGridList } from '@/hooks';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { Input, Image, Slider, Icon } from 'react-native-elements';

interface Props {
  navigation: StackNavigationProp<Route, 'GridInput'>;
  route: RouteProp<Route, 'GridInput'>;
}
const noImage = require('@/assets/images/noImage_gray.png');

export const GridInputScreen = (props: Props) => {
  const { grid } = props.route.params;
  const { grids, setGridList } = useGridList();
  const [id, setId] = useState<string>();
  const [image, setImage] = useState<string>();
  const [name, setName] = useState<string>();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // const newId =
    //   Array.isArray(grids) && grids.length > 0
    //     ? (Math.max(...grids.map((_) => Number(_.id))) + 1).toString()
    //     : '0';
    setId(grid?.id);
    setImage(grid?.uri);
    setCount(grid ? grid.count : 0);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
      base64: true,
    });

    if (!result.cancelled) setImage(result.uri);
  };

  const onUpdate = () => {
    if (!image) {
      Alert.alert('選択エラー', '画像の選択は必須です');
      return;
    }

    if (id !== undefined) {
      // 編集
      const edits = grids;
      edits?.splice(
        edits.findIndex((e) => e.id === id),
        1,
        {
          id: id,
          count: count,
          name: name,
          uri: image,
        }
      );
      setGridList([...(edits ?? [])]);
    } else {
      // 新規
      const newId =
        grids && grids.length > 0
          ? (Math.max(...grids.map((_) => Number(_.id))) + 1).toString()
          : '0';
      setGridList([
        ...(grids ?? []),
        {
          id: newId,
          count: count,
          name: name,
          uri: image,
        },
      ]);
    }
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
        onClickBack={onClose}
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
        <TouchableOpacity
          style={[styles.imageWrapper, Boolean(image) && { borderWidth: 0 }]}
          onPress={pickImage}
        >
          <View>
            <Image
              source={image ? { uri: image } : noImage}
              style={styles.image}
              containerStyle={styles.image}
              placeholderStyle={{ backgroundColor: Color.theme2 }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.badge}>
              <Text style={styles.plus}>+</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Input
          value={name}
          label='タイトル'
          labelStyle={styles.label}
          placeholder='入力...'
          onChangeText={(text) => setName(text)}
          containerStyle={styles.input}
          inputStyle={styles.inputName}
        />
        <View style={styles.input}>
          <Text style={styles.label}>カウント {count}</Text>
          <Slider
            step={1}
            minimumValue={0}
            maximumValue={100}
            value={count}
            onValueChange={setCount}
            thumbStyle={{
              height: 20,
              width: 20,
              backgroundColor: Color.theme2,
            }}
          />
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
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderWidth: 1,
    borderColor: Color.gray50,
    borderStyle: 'dashed',
  },
  plus: {
    color: Color.gray20,
    fontSize: 18,
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
});
