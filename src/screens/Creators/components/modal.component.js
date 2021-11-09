import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Modal, Text } from "@ui-kitten/components";

export const ModalDelete = ({
  title,
  text,
  onDelete,
  modalVisibility,
  setModalVisibility,
}) => {
  const Header = (props) => (
    <View {...props}>
      <Text category="h6">{title}</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size="medium"
        status="basic"
        onPress={() => setModalVisibility(false)}
      >
        Cancelar
      </Button>
      <Button style={styles.footerControl} size="medium" onPress={onDelete}>
        Sim, excluir
      </Button>
    </View>
  );

  return (
    <Modal
      visible={modalVisibility}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setModalVisibility(false)}
    >
      <Card style={styles.card} header={Header} footer={Footer}>
        <Text>{text}</Text>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
