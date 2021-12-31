import React, {useEffect, useState} from 'react';

import {View} from 'native-base';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TodoItem from './TodoItem';

import Realm from 'realm';
import {TodosSchema} from '../db/schema';

import {fetchDataFromRealm, setDBInstance} from '../features/todosSlice';

let realm;

const All = () => {
  const todosDATA = useSelector(state => state.todos.todos);

  const renderItem = ({item}) => <TodoItem data={item} />;

  const dispatch = useDispatch();

  useEffect(() => {
    const getRealmInstance = async () => {
      try {
        realm = await Realm.open({
          path: 'todoRealm',
          schema: [TodosSchema],
        });

        const todos = realm.objects('Todos');
        const stringifiedTodos = JSON.stringify(todos);

        dispatch(fetchDataFromRealm(stringifiedTodos)); //
        dispatch(setDBInstance(realm));
        // realm.close();
      } catch (e) {
        console.log(e);
      }
    };
    getRealmInstance();
  }, []);

  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={todosDATA}
        renderItem={renderItem}
      />
    </View>
  );
};

export default All;
