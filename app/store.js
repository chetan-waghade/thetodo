import {configureStore} from '@reduxjs/toolkit';

import TodosReducer from '../features/todosSlice';

const store = configureStore({
  reducer: {
    todos: TodosReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export default store;
