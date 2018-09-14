import { Component, OnInit } from '@angular/core';

import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskList: Task[];

  constructor(private toastr: ToastrService, private taskService: TaskService) { }

  ngOnInit() {
    var x = this.taskService.getData();
    x.snapshotChanges().subscribe(item => {
      this.taskList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        this.taskList.push(y as Task);
      })
    });
  }

  onEdit(task: Task) {
    this.taskService.selectedTask = Object.assign({}, task);
  }

  onDelete(key: string) {
    this.taskService.deleteTask(key);
    this.toastr.warning('TOP', 'saiu');
  }

}
