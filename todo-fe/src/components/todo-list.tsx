import React, {useEffect, useState} from 'react';
import {Button, Input} from 'antd';
import {TodosService} from "../core/services";
import {Todo} from "../core/types";

import './index.css';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = () => {
    TodosService.getAll()
      .then(res => setTodos(res))
      .catch(() => alert("Something went wrong"))
  }

  const addTodo = () => {
    TodosService.create({title: newTodo})
      .then((res) => {
        setTodos((prevTodos) => [...prevTodos, res]);
        setNewTodo('');
      })
      .catch(() => alert("Something went wrong"))
  };

  const removeTodo = (id: number) => {
    TodosService.remove(id)
      .then(() => {
        setTodos((prevTodos: Todo[]) => prevTodos.filter(todo => todo.id !== id));
      })
      .catch(() => alert("Something went wrong"))
  };

  const toggleCompletion = async (id: number, currentStatus: boolean) => {
    try {
      await TodosService.updateIsCompleted({id: id, isCompleted: !currentStatus})

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !currentStatus } : todo
        )
      );
    } catch (error) {
      alert("Something went wrong")
    }
  };


  return (
    <div className="container">
      <div style={{display: "flex"}}>
        <Input
          size={'large'}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a task"
        />
        <Button size={'large'} disabled={!newTodo.trim()} onClick={addTodo}>Add</Button>
      </div>
      {todos.length === 0 ? (
        <p>No tasks to display</p>
      ) : (
        <ul>
          {todos.map((todo: Todo) => (
            <li className={'todo'} key={todo.id}>
              <p style={todo.isCompleted ? {textDecoration: "line-through"} : {}}>{todo.title}</p>
              <div>
                <button
                  style={{marginRight:15}}
                  onClick={() => removeTodo(todo.id)}
                >
                  Delete
                </button>
                <button onClick={() => toggleCompletion(todo.id, todo.isCompleted)}>
                  {todo.isCompleted ? "Complete" : "Done"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
