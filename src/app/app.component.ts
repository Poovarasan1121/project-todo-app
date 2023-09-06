import { Component } from '@angular/core';
import{FormGroup,FormControl} from '@angular/forms';
import{v4 as uuid }  from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  public todoset: any = [];
  public selectedTodo: any = '';
  public updatedTodo: any = '';
  // to hide the addbtn
  public hiddenAddBtn = false;
  todolist:any = new FormGroup({
    todoname: new FormControl(),
  });

  onFormSubmit(todolist: any) {
    //Pushing todo data to todoset
    this.todoset.push({ todo: todolist.controls.todoname.value,id:uuid()});
    //This is for clearing form data
    this.todolist.setValue({ todoname:"" });
  }
  onEditTodo(x: any) {
    // to hide the addbtn
    this.hiddenAddBtn = true;
    this.todolist.setValue({ todoname: x.todo });
    this.selectedTodo = x
    console.log("selected todo",x)
  }

  onDeleteTodo(x: any) {
    this.todoset = this.todoset.filter((item: any) => item.id !== x.id);
    console.log("selected todo",x)
  }

  savedata() {
    this.updatedTodo = this.todoset.find((x: any) => x.id == this.selectedTodo.id)
    this.updatedTodo.todo = this.todolist.controls.todoname.value
    this.updatedTodo.id = this.updatedTodo.id
    this.todolist.setValue({ todoname: ""})
    this.selectedTodo = false
    this.hiddenAddBtn = false
  }
  canceldata() {
    // this.todolist.setValue({ todoname:"" });
    this.selectedTodo = false
    this.hiddenAddBtn = false
  }
}
