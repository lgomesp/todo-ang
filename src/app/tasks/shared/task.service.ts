import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import { Task } from "src/app/tasks/shared/task.model";

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: AngularFireList<any>;
  selectedTask: Task = new Task();

  constructor(private firebase: AngularFireDatabase) {

   }

   getData() {
     this.taskList = this.firebase.list('tasks');
     return this.taskList;
   }

   insertTask(task: Task) {
     alert('por');
     this.taskList.push({
      name: task.name,
      category: task.category
     });
   }

   updateTask(task: Task) {
     this.taskList.update(task.$key, {
      name: task.name,
      category: task.category
     });
   }

   deleteTask($key: string) {
     this.taskList.remove($key);
   }

}
