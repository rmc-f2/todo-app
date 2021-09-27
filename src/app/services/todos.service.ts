import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Todo } from '../models/todos.model';
@Injectable({
  providedIn: 'root'
})
export class TodosService {
  
  todosCollection: AngularFirestoreCollection<Todo>;
  todoDoc?:AngularFirestoreDocument<Todo>
  todos: Observable<Todo[]>;
  
  constructor(
    private fs: AngularFirestore
  ) { 
    this.todosCollection = this.fs.collection('todos');

    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(x =>{
          const data = x.payload.doc.data() as Todo;
          data.id = x.payload.doc.id;
          return data;
        });
      })
    );
  }

  getTodos(){
    return this.todos;
  }

  addTodo(todo: Todo){
    this.todosCollection.add(todo);
  }

  deleteTodo(todo: Todo){
    this.todoDoc = this.fs.doc(`todos/${todo.id}`);
    this.todoDoc.delete();
  }

  editTodo(todo: Todo){
    this.todoDoc = this.fs.doc(`todos/${todo.id}`);
    this.todoDoc.update(todo);
  }
}
