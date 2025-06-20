import {Component, inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-task-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInput, MatButtonModule, ReactiveFormsModule],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TaskDialogComponent>);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
