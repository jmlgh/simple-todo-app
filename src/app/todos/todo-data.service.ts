// The TodoData Service will manage Todo instances

import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId:number;

  // Placeholder for todo's
  todos: Todo[];

  constructor() { 
    this.todos = [];
    this.lastId = 0;
  }

  // Simulate POST /todos
  public addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // Simulate DELETE /todos/:id
  public deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  public updateTodoById(id: number, values: Object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  public getAllTodos(): Todo[] {
    return this.todos;
  }

  // Simulate GET /todos/:id
  public getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Simulate GET /todos/:category
  public getTodoByCategory(cat_id: number): Todo[] {
    return this.todos
      .filter( todo => todo.category === cat_id);
  }

  // Toggle todo complete
  public toggleTodoComplete(todo: Todo) {
    const updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
}
