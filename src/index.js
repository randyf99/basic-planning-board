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

function List(props) {
  const { list, toDone, id, children } = props;

  return (
    <div id={id}>
      <h3>{children}</h3>
      <ul>
        {list.map(item => {
          return (
            <li key={generateId()}>
              <Card
                task={item.task}
                id={item.id}
                removeButton={false}
                toDone={toDone}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

class Board extends Component {
  state = {
    todo: [],
    done: []
  };

  handleToDone = id => {
    const { todo, done } = this.state;
    const toSave = todo.find(item => item.id == id);
    const newTodo = todo.filter(item => item.id !== id);

    this.setState({
      todo: newTodo,
      done: done.concat(toSave)
    });
  };

  handleAddTodo = () => {
    let todo = this.state.todo;
    const diag = window.prompt('Pick your task');

    this.setState({
      todo: todo.concat({ task: diag, id: generateId() })
    });
  };

  render() {
    const { todo, done } = this.state;

    return (
      <div id="board">
        <h1>Planning board</h1>
        <div className="lists">
          <button id="todo" onClick={this.handleAddTodo}>
            To Do
          </button>
          <List list={todo} toDone={this.handleToDone} id="from-list">
            Todo
          </List>
          <List list={done} toDone={this.handleToDone} id="done">
            Done
          </List>
        </div>
      </div>
    );
  }
}

render(<Board />, document.getElementById('root'));
