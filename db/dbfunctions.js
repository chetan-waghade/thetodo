export const createData = (db, data) => {
  if (!db) {
    return;
  }
  db.write(() => {
    db.create('Todos', data);
  });
};

export const deleteData = (db, data) => {
  if (!db) {
    return;
  }
  db.write(() => {
    let item = db.objectForPrimaryKey('Todos', data);
    db.delete(item);
    item = null;
  });
};

export const updateData = (db, data) => {
  if (!db) {
    return;
  }
  db.write(() => {
    let item = db.objectForPrimaryKey('Todos', data._id);
    item.title = data.title;
    item.completed = data.completed;
    item.category = data.category;
  });
};
