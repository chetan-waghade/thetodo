export const TodosSchema = {
  name: 'Todos',
  properties: {
    _id: 'string',
    title: 'string',
    completed: 'bool',
    category: 'string',
  },
  primaryKey: '_id',
};
