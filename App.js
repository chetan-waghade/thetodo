import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {
  Radio,
  Center,
  NativeBaseProvider,
  Input,
  Button,
  View,
  Text,
  Heading,
  HStack,
} from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';

import DisplayScreen from './components/DisplayScreen';
import Icon from 'react-native-vector-icons/Entypo';

//Redux Store
import {Provider, useSelector} from 'react-redux';
import store from './app/store';
import {dayAndDate} from './utils/DayString';
import {getCategoryName} from './utils/TodosCategory';

import {useDispatch} from 'react-redux';
import {todoAdded} from './features/todosSlice';
import {nanoid} from '@reduxjs/toolkit';

import {createData} from './db/dbfunctions';

//Notifee
import notifee, {AndroidImportance, TriggerType} from '@notifee/react-native';
import NotificationSounds, {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';

const TodoInputScreen = () => {
  const [value, setValue] = React.useState('one');
  const [todoTitle, setTodoTitle] = React.useState('');
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [time, setTime] = React.useState(new Date());
  const realmInstance = useSelector(state => state.todos.db);

  //Dispatch
  const dispatch = useDispatch();

  //Push todos to store
  const handleAdd = () => {
    const todo = {
      _id: nanoid(),
      title: todoTitle,
      completed: false,
      category: getCategoryName(value),
    };
    dispatch(todoAdded(todo));
    createData(realmInstance, todo);
    setTodoTitle('');
  };

  async function onCreateTriggerNotification() {
    await notifee.requestPermission({
      sound: true,
    });

    // Retrieve a list of system notification sounds
    const soundsList = await NotificationSounds.getNotifications(
      'notification',
    );
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'custom-sound',
      name: 'System Sound',
      importance: AndroidImportance.DEFAULT,
      sound: 'default',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
      },
    });
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentDate);
    const triggerDate = new Date();
    triggerDate.setHours(11);
    triggerDate.setMinutes(10);
  };

  return (
    <>
      <Radio.Group
        name="myRadioGroup"
        accessibilityLabel="todo category"
        value={value}
        onChange={nextValue => {
          setValue(nextValue);
        }}
        style={{display: 'flex', flexDirection: 'row'}}>
        <Radio value="one" mx={1} size="sm">
          Personal
        </Radio>
        <Radio value="two" mx={1} size="sm">
          Work
        </Radio>
        <Radio value="three" mx={1} size="sm">
          Important
        </Radio>
      </Radio.Group>

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Input
          placeholder="What you wanna do..?"
          w={{
            base: '75%',
            md: '25%',
          }}
          my="3"
          value={todoTitle}
          onChangeText={todoTitle => setTodoTitle(todoTitle)}
        />
        <Button size="lg" mx="2" my="3" onPress={handleAdd}>
          <Icon name="plus" size={24} color="#fff" />
        </Button>
      </View>
      <HStack space={1} alignItems="center">
        <Heading>Todo </Heading>
        <Text fontSize="md" color={'gray.500'}>
          {dayAndDate}
        </Text>
        <Button onPress={() => onCreateTriggerNotification()}>SN</Button>
        <Button
          onPress={() => {
            setShowTimePicker(!showTimePicker);
          }}>
          DT
        </Button>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </HStack>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <DisplayScreen style={{flex: 7}} />
        <Center
          px="2"
          py="2"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: 'white',
            elevation: 5,
          }}>
          <TodoInputScreen />
        </Center>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
