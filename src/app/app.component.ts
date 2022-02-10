import { Component, OnInit, Output } from '@angular/core';
import { Todo } from './todo';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Mytodo';

  filter: 'all' | 'active' | 'check' = 'all'; 

  empty = true;
  date = Date.now();
  isEditVisible = false;
  isDeleteVisible = false;
  curentTask;
  filterSearch = '';
  field = 'description';
  counter = 1;
  type = 'asc';
  colorBG = ''

  todoList: Todo[] = [];

  get todos() {
    if (this.filter === 'all') {
      return this.todoList;    
    } 
    return this.todoList.filter(todo => this.filter === 'check' ? todo.check : !todo.check);    
  } 

  upPriority(task: Todo) {
    if (task.priority < 4) {
      task.priority++;
    }
    this.saveLocalStorage()
  }
  
  downPriority(task: Todo) {
    if (task.priority > 0) {
      task.priority--;
    }
    this.saveLocalStorage()
  }

  saveLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.todoList));    
  }

  getLocalStorage() {      
    const tasks: string = localStorage.getItem('tasks') as string;
    if (tasks) {
      return JSON.parse(tasks)
    }
    else {
      return []
    }    
  }
  ngOnInit() { 
    // this.todoList =[];
   this.todoList = this.getLocalStorage(); 
    
  }
  openEdit(task) {    
    this.isEditVisible = true;
    this.curentTask = task    
  }
  onCloseEdit(event) {
    this.isEditVisible = false;
    if(event.value) {
      this.curentTask.description = event.value
    }
    this.saveLocalStorage()   
  } 

  addItem(description: string) {       
    if (description !== "") {    
      this.todoList.unshift({
        date: Date.now(),
        priority: 1,
        description,
        check: false               
      });     
    } 
    else {
      this.empty = !this.empty
    } 
    this.counter++;  
    this.saveLocalStorage()
  }
  
  openDelete(task) {    
    this.isDeleteVisible = true;
    this.curentTask = task  
  }

  closeDelete(event) {
    this.isDeleteVisible = false;
  }

  remove(event) {
    this.isDeleteVisible = false;      
    if(event.value) {
      this.todoList.splice(this.todoList.indexOf(event.value), 1); 
    }   
    this.saveLocalStorage()
  }

  ok() {
    this.empty = true;
  }

  checked(task: Todo) {     
    task.check = !task.check;  
    this.saveLocalStorage()   
  } 
  
  sort(field) {
    if(field === this.field) {
      if (this.type === 'asc'){
        this.type = 'desc'
      }
      else {
        this.type = 'asc'
      }
    }
    else {
      this.field = field
    }    
  }
  
}
