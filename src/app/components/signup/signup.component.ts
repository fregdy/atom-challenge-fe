import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SignUpModel } from '../../shared/types/sign-up-model';

@Component({
  selector: 'app-signup-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  readonly dialogRef = inject(MatDialogRef<SignupComponent>);
  readonly data = inject<SignUpModel>(MAT_DIALOG_DATA);
  readonly email = model(this.data.email);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
