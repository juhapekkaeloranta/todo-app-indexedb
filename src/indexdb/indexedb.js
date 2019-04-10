import Dexie from 'dexie';

const db = new Dexie('ReactSampleDB');
db.version(1).stores({ todos: '++id' });

export const getTable = async (tableName) => {
  return await db.table(tableName).toArray()
}

export const insertIntoTable = async (tableName, item) => {
  const id = await db
    .table(tableName)
    .add(item)
  return await db
    .table(tableName)
    .get(id)
}

export const updateTable = async (tableName, id, updates) => {
  await db
    .table(tableName)
    .update(id, updates)
  return await db
    .table(tableName)
    .get(id)
}

export const deleteFromTable = async (tableName, id) => {
  return db
    .table(tableName)
    .delete(id)
}