# React + Dexie Todo Example

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## State-management

`App`-component holds data-state in `this.state`

State is modified by "data-state API" defined in `App.js`. It has three functions:
- `AddTodo(title)`
- `ToggleTodo(id, done)`
- `DeleteTodo(id)`

State is read by `<App>`-component and passed as props to child-components.

"data-state API" functions do two things:
- update indexedb (via API offered by `indexedb.js`)
- update state (using reducers defined in `stateReducers.js`)

## Notes

- The state in `<App>` would be redundant is indexedb was observable!
- Now all mutations have to be done two times!
- Indexedb API is cleaner than React states

### Example 1

Deleting an item from state

```
export const stateDelete = (state, tableName, id) => {
  return { ...state, [tableName]: state[tableName].filter((item) => item.id !== id) }
}
```

Deleting an item from indexed

```
export const deleteFromTable = async (tableName, id) => {
  return db
    .table(tableName)
    .delete(id)
}
```

For comparison a SQL query:

```
DELETE
FROM table
WHERE id='id';
```

The fact that developer has to take care of immutability increases the code complexity.

This can be improved with libraries like Ramda.js. Here's an example:

```
export const stateDelete = (state, tableName, id) => {
  return { ...state, [tableName]: R.dissoc(id, state[tableName])}
}
```

## Ideas

What is frontend state was queried with SQL?
- still keeping RestAPI
- copy-paste queries between frontend and backend?
- problem with schema exposion? i.e. postgres schema is shown in the frontend

Even further?
- RestAPI replaced with log shipping (similar to postgres cluster)
- i.e. continuous database sync operation
- with websockets?