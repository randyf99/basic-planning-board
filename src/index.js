import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

function Card(props) {
  const { task, id, toDone, removeButton } = props;
  const value = generateId();

  return (
    <div>
      <span>{task}</span>
      {removeButton ? null : (
        <button value={value} onClick={() => toDone(id)}>
          >
        </button>
      )}
    </div>
  );
}

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: [],
      done: []
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleToDone = this.handleToDone.bind(this);
  }

  handleToDone(id) {
    const { todo, done } = this.state;
    const toSave = todo.find(item => item.id == id);
    const newTodo = todo.filter(item => item.id !== id);

    this.setState({
      todo: newTodo,
      done: done.concat(toSave)
    });
  }

  handleAddTodo() {
    let todo = this.state.todo;
    const diag = window.prompt('Pick your task');

    this.setState({
      todo: todo.concat({ task: diag, id: generateId() })
    });
  }

  render() {
    const { todo, done } = this.state;

    return (
      <div id="board">
        <div>
          <h1>Planning board</h1>
          <h3>ToDo</h3>
          <h3>Done</h3>
        </div>
        <button id="todo" onClick={this.handleAddTodo}>
          To Do
        </button>
        <ul id="from-list">
          {todo.map(item => {
            return (
              <li key={generateId()}>
                <Card task={item.task} id={item.id} removeButton={false} toDone={this.handleToDone} />
              </li>
            );
          })}
        </ul>
        <ul id="done">
          {done.map(item => {
            return (
              <li key={generateId()}>
                <Card task={item.task} id={item.id} removeButton={true} toDone={this.handleToDone} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

render(<Board />, document.getElementById('root'));
