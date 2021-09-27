import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todos.model';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  finishedTodos: Todo[] = [];

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(){
    this.todosService.getTodos().subscribe((response: Todo[])=>{
      this.todos = response.filter(todo=> !todo.completed);
      this.finishedTodos=response.filter(todo=>todo.completed);   
    });
  }

  addTodo(title: string){
    if(title === ''){
      return;
    }
    
    const todo: Todo = {title, completed:false};
    this.todosService.addTodo(todo);
  }

  deleteTodo(todo: Todo){
    this.todosService.deleteTodo(todo);
  }

  editTodo(todo: Todo){
    todo.completed = !todo.completed;
    this.todosService.editTodo(todo);
  }

}
