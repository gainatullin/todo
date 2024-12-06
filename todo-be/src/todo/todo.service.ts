import { Injectable, NotFoundException } from '@nestjs/common';

export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private currentId = 0;

  create(dto: { title: string }): Todo {
    const newTodo: Todo = {
      id: this.currentId++,
      title: dto.title,
      isCompleted: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  getAll(): Todo[] {
    return this.todos;
  }

  remove(id): void {
    const foundTodo = this.findTodoById(id);
    this.todos = this.todos.filter((todo) => todo.id !== foundTodo.id);
  }

  updateTodoStatus(id: number, isCompleted: boolean): void {
    const todo = this.findTodoById(id);
    todo.isCompleted = isCompleted;
  }

  private findTodoById(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo with same id was not found!');
    }
    return todo;
  }
}
