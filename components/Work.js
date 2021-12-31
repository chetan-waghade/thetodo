import React from 'react';

import {View} from 'native-base';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import TodoItem from './TodoItem';

const Work = () => {
  const workTodos = useSelector(state =>
    state.todos.todos.filter(item => item.category === 'work'),
  );

  workTodos.forEach(item => console.log(item));

  const renderItem = ({item}) => <TodoItem data={item} />;
  return (
    <View>
      <FlatList
        data={workTodos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Work;
