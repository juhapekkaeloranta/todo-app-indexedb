import React, { Component } from 'react';
import './App.css';
import { getTable, insertIntoTable, updateTable, deleteFromTable } from './indexdb/indexedb';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { stateAppend, stateUpdate, stateDelete } from './reducers/stateReducers';
import Todo from './domain/TodoObj';

class App extends Component {
  constructor() {
    super();
    //data-state:
    this.state = { todos: [] };
    
    //data-state API:
    this.AddTodo = this.AddTodo.bind(this);
    this.DeleteTodo = this.DeleteTodo.bind(this);
    this.ToggleTodo = this.ToggleTodo.bind(this);
  }

  componentDidMount() {
    getTable('todos')
      .then((todos => {
        this.setState({ todos: todos })
      })
    )
  }

  AddTodo(title) {
    insertIntoTable('todos', new Todo(title))
      .then((todo) => {
        this.setState( stateAppend(this.state, 'todos', todo) );
      });
  }

  ToggleTodo(id, done) {
    updateTable('todos', id, { done })
      .then((todo) => {
        this.setState( stateUpdate(this.state, 'todos', todo) );
      });
  }

  DeleteTodo(id) {
    deleteFromTable('todos', id)
      .then(() => {
        this.setState( stateDelete(this.state, 'todos', id) );
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React + Dexie Todo Example</h2>
        </div>
        <AddTodo 
          handleAddTodo={this.AddTodo} 
        />
        <TodoList
          todos={this.state.todos}
          handleToggleTodo={this.ToggleTodo}
          handleDeleteTodo={this.DeleteTodo}
        />
      </div>
    );
  }
}

export default App;
