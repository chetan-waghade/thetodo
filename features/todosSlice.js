import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  status: '',
  error: '',
  db: undefined,
};

const todosSlice = createSlice({
  name: 'Todos',
  initialState,
  reducers: {
    setDBInstance(state, action) {
      state.db = action.payload;
    },
    fetchDataFromRealm(state, action) {
      state.todos = state.todos.concat(JSON.parse(action.payload));
    },
    //triggers when todoAdded Dispatch is called
    todoAdded(state, action) {
      state.todos.push(action.payload);
    },
    todoMarked(state, action) {
      const _id = action.payload;
      console.log(_id);
      const existingTodo = state.todos.find(item => item._id === _id);

      existingTodo.completed = !existingTodo.completed;
    },
    todoDeleted(state, action) {
      const _id = action.payload;
      state.todos = state.todos.filter(item => item._id !== _id);
    },
    todoEdited(state, action) {
      const _id = action.payload._id;
      const exisitingTodo = state.todos.find(item => item._id === _id);
      exisitingTodo.title = action.payload.title;
      exisitingTodo.category = action.payload.category;
    },
  },
});

export const {
  todoAdded,
  fetchDataFromRealm,
  todoMarked,
  todoDeleted,
  todoEdited,
  setDBInstance,
} = todosSlice.actions;

export default todosSlice.reducer;
