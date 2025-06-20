import {AfterViewInit, Component, inject, signal} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {TaskDto} from "../../api/models/task-dto";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCheckbox} from "@angular/material/checkbox";
import {TaskService} from "../../api/services/task.service";

@Component({
  selector: 'app-task-list',
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatProgressSpinnerModule, MatCheckbox],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
})
export class TaskTableComponent implements AfterViewInit {
  readonly taskService= inject(TaskService);
  isLoading = signal(true);
  displayedColumns: string[] = ['title', 'description', 'date','status'];
  dataSource: TaskDto[] = [];
  ngAfterViewInit(): void {
   this.refreshTaskTable();
  }

  refreshTaskTable(){
    this.taskService.taskControllerGetAllTasks().subscribe(tasks => {
      this.isLoading.set(false)
      this.dataSource = tasks;
    });
  }

  addTask(){
  }
}
