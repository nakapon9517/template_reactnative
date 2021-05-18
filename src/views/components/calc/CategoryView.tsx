import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Calc, Category } from '@/entities';
import { Color } from '@/constants';
import Modal from 'react-native-modal';

interface Props {
  calcs: Calc[];
  visible: boolean;
  categories: Category[];
  setOpen: (_: boolean) => void;
  onClickItem: (item: Calc) => void;
}
const CategoryView = (props: Props) => {
  return (
    <View style={styles.view}>
      <Modal
        style={styles.modalWrapper}
        isVisible={props.visible}
        backdropColor={Color.gray100}
        onBackdropPress={() => props.setOpen(false)}
        onSwipeComplete={() => props.setOpen(false)}
        swipeDirection='down'
        swipeThreshold={Dimensions.get('screen').height / 2}
      >
        <View style={styles.modal}></View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    // flex: 1,
  },
  modalWrapper: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    marginTop: 72,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: Color.gray90,
  },
  modal: {
    flex: 1,
  },
});

export { CategoryView };
