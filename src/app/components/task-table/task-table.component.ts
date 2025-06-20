import {AfterViewInit, Component, inject, signal} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {TaskDto} from "../../api/models/task-dto";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCheckbox} from "@angular/material/checkbox";
import {TaskService} from "../../api/services/task.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";

@Component({
  selector: 'app-task-list',
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatProgressSpinnerModule, MatCheckbox],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
})
export class TaskTableComponent implements AfterViewInit {
  readonly taskService= inject(TaskService);
  readonly dialog = inject(MatDialog);
  isLoading = signal(true);
  displayedColumns: string[] = ['title', 'description', 'createdAt','status'];
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

  onAddTaskDialog(){
    const dialogRef = this.dialog.open(TaskDialogComponent);
    dialogRef.afterClosed().subscribe((newTask) => {
      if (newTask == undefined) {
        return;
      }
      this.isLoading.set(true);
      this.taskService
        .taskControllerCreateTask({ body: { ...newTask } })
        .subscribe({
          next: () => this.refreshTaskTable(),
          error: () => {
            // TODO: show error toast
            this.isLoading.set(false);
          },
        });
    });
  }

  convertTimestampToDateString(timestamp: { _seconds: number; _nanoseconds: number }): string {
    const milliseconds = timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1_000_000);
    const date = new Date(milliseconds);
    return date.toLocaleString();
  }
}
