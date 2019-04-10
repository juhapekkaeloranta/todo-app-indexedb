/*

Note: Following state format is assumed:

{
  tableName: [
    { dataRow1 },
    { dataRow2 }
  ]
}

dataRow objects must have id property

*/

export const stateAppend = (state, tableName, newItem) => {
  return { ...state, [tableName]: [...state[tableName], newItem] }
}

export const stateUpdate = (state, tableName, updatedItem) => {
  return { ...state, [tableName]: [
      ...state[tableName].filter((item) => item.id !== updatedItem.id),
      updatedItem
  ]}
}

export const stateDelete = (state, tableName, id) => {
  return { ...state, [tableName]: state[tableName].filter((item) => item.id !== id) }
}