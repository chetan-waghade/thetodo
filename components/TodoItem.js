import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Text,
  Pressable,
  HStack,
  Menu,
  Box,
  Modal,
  Select,
  FormControl,
  Input,
  CheckIcon,
  Button,
} from 'native-base';

import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {todoDeleted, todoMarked, todoEdited} from '../features/todosSlice';
import {deleteData, updateData} from '../db/dbfunctions';

const TodoItem = props => {
  const [showModal, setShowModal] = React.useState(false);
  const [todoTitleInput, setTodoTitleInput] = React.useState(props.data.title);
  const [category, setCategory] = React.useState(props.data.category);

  const dispatch = useDispatch();
  const realm = useSelector(state => state.todos.db);
  const handleDelete = () => {
    dispatch(todoDeleted(props.data._id));
    deleteData(realm, props.data._id);
  };

  const handleMark = () => {
    dispatch(todoMarked(props.data._id));
    updateData(realm, {
      _id: props.data._id,
      title: props.data.title,
      completed: !props.data.completed,
      category: props.data.category,
    });
  };

  const handleEdit = () => {
    dispatch(
      todoEdited({
        _id: props.data._id,
        title: todoTitleInput,
        category: category,
      }),
    );
    updateData(realm, {
      _id: props.data._id,
      title: todoTitleInput,
      completed: props.data.completed,
      category: category,
    });
  };

  return (
    <TouchableOpacity
      onPress={handleMark}
      onLongPress={() => {
        setShowModal(true);
      }}>
      <HStack
        style={[
          styles.itemContainer,
          props.data.completed ? {backgroundColor: '#dcdde1'} : {},
        ]}
        space={'5'}
        alignItems={'center'}>
        <Text
          mx={3}
          flex={7}
          style={
            props.data.completed ? {textDecorationLine: 'line-through'} : {}
          }>
          {props.data.title}
        </Text>
        <Box h="80%" w="80%" alignItems="flex-start" flex={1}>
          <Menu
            w="100"
            trigger={triggerProps => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}>
                  <Icon name="dots-three-vertical" size={24} color="#7f8fa6" />
                </Pressable>
              );
            }}>
            <Menu.Item
              onPress={() => {
                setShowModal(true);
              }}>
              Edit{' '}
            </Menu.Item>
            <Menu.Item onPress={handleDelete}>Delete</Menu.Item>
          </Menu>
        </Box>
      </HStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Todo</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                value={todoTitleInput}
                onChangeText={text => setTodoTitleInput(text)}
              />
            </FormControl>
            <FormControl mt="3">
              <Select
                selectedValue={category}
                minWidth="200"
                accessibilityLabel="Change Category"
                placeholder="Change Category"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setCategory(itemValue)}>
                <Select.Item label="Work" value="work" />
                <Select.Item label="Personal" value="personal" />
                <Select.Item label="Important" value="important" />
              </Select>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  handleEdit();
                  setShowModal(false);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    height: 50,
    padding: 5,
    margin: 5,
    borderRadius: 4,
    backgroundColor: '#f5f6fa',
    borderColor: '#dcdde1',
  },
});

export default TodoItem;
