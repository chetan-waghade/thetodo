import React from 'react';

import {View} from 'native-base';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import TodoItem from './TodoItem';

const Important = () => {
  const importantTodos = useSelector(state =>
    state.todos.todos.filter(item => item.category === 'important'),
  );
  const renderItem = ({item}) => <TodoItem data={item} />;

  return (
    <View>
      <FlatList
        data={importantTodos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Important;
