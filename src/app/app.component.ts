import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CategoryDataService } from './categories/category-data.service';
import { TodoDataService } from './todos/todo-data.service';
import { Todo } from './todos/todo';
import { Category } from './categories/category';

@Component({
  selector: 'mdb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoDataService, CategoryDataService]
})
export class AppComponent implements OnInit{
  
  newTodo: Todo = new Todo();
  newCategory: Category = new Category();
  selectedCategory: Category;

  constructor(
    private todoDataService: TodoDataService,
    private categoryDataService: CategoryDataService,
    private cdRef: ChangeDetectorRef
  ){}

  public addTodo(): void{
    // get the category id
    this.newTodo.category = this.selectedCategory.id;
    this.todoDataService.addTodo(this.newTodo);
    // assign to newTodo a brand new Todo instance
    this.newTodo = new Todo();
    console.log(this.todos);
  }

  public toggleTodoComplete(todo: Todo): void{
    this.todoDataService.toggleTodoComplete(todo);
  }

  public removeTodoItem(todo: Todo): void{
    this.todoDataService.deleteTodoById(todo.id);
  }

  public get todos(): Todo[]{
    return this.todoDataService.getAllTodos();
  }

  // the get name creates the property todosForCat and a getter
  public get todosForCat(): Todo[]{
    return this.todoDataService.getTodoByCategory(this.selectedCategory.id);
  }

  public countTodosByCat(id: number): number{
    const count =  this.todoDataService.getTodoByCategory(id).length;
    return count;
  }

  public addCategory(): void {
    this.categoryDataService.addCategory(this.newCategory);
    this.newCategory = new Category();
  }

  public removeCategory(category: Category): void{
    this.categoryDataService.deleteCategoryById(category.id);
  }

  public get categories(): Category[]{
    return this.categoryDataService.getAllCategories();
  }

  public getCategory(id: number): Category{
    return this.categoryDataService.getCategoryById(id);
  }

  public addInitialCategory(category: Category): void{
    this.categoryDataService.addCategory(category);
  }

  public addInitialTodo(todo: Todo): void{
    this.todoDataService.addTodo(todo);
  }

  public onSelect(category: Category): void {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
  }

  ngOnInit(): void {
    // add initial categories and todo items
    let initCat = new Category();
    initCat = {'name' : 'Today', 'id' : null , };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Tomorrow', 'id' : null , };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Work', 'id' : null , };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Holidays', 'id' : null , };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Shopping list', 'id' : null , };
    this.addInitialCategory(initCat);

    let initTodo = new Todo();
    initTodo = {'title' : 'Task1', 'complete': false, 'id' : null , category: 1 };
    this.addInitialTodo(initTodo);
    initTodo = {'title' : 'Task2', 'complete': true, 'id' : null , category: 2 };
    this.addInitialTodo(initTodo);
    initTodo = {'title' : 'Task3', 'complete': true, 'id' : null , category: 1 };
    this.addInitialTodo(initTodo);
  }
}
