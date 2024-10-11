import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditTodoModal = ({ isVisible, onClose, onSave, initialContent , title }) => {
  const [content, setContent] = useState(initialContent);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Modifier {title}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setContent}
            value={content}
            autoFocus
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Enregistrer"
              onPress={() => onSave(content)}
              color="#6200EE"
            />
            <View style={styles.buttonMargin} />
            <Button
              title="Annuler"
              onPress={onClose}
              color="#6200EE"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonMargin: {
    marginVertical: 10,
  },
});

export default EditTodoModal;
