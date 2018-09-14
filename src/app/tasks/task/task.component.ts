import { Component, OnInit } from '@angular/core';

import { TaskService } from '../shared/task.service';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(taskForm: NgForm) {
    if(taskForm.value.$key == null)
      this.taskService.insertTask(taskForm.value);
    else 
      this.taskService.updateTask(taskForm.value);
    this.resetForm(taskForm);
    this.toastr.success('TOP', 'entrou');
  }

  resetForm(taskForm?: NgForm) {
    if(taskForm != null)
      taskForm.reset();
    this.taskService.selectedTask = {
      $key: null,
      name: '',
      category: ''
    }
  }

}
