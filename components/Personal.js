import React from 'react';

import {View} from 'native-base';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import TodoItem from './TodoItem';

const Personal = () => {
  const personalTodos = useSelector(state =>
    state.todos.todos.filter(item => item.category === 'personal'),
  );
  const renderItem = ({item}) => <TodoItem data={item} />;

  return (
    <View>
      <FlatList
        data={personalTodos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Personal;
