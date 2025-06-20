import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../api/services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { AccessToken } from '../../api/models/access-token';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButton,
    MatProgressSpinner,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly userService = inject(UserService);
  readonly router = inject(Router);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly dialog = inject(MatDialog);

  errorMessage = signal('');
  isLoading = signal<boolean>(false);

  onSubmit() {
    this.isLoading.set(true);
    this.userService
      .userControllerLogIn({ body: { email: this.email.value! } })
      .subscribe({
        next: (data) => this.setTokenAndRedirect(data),
        error: (err) => {
          this.isLoading.set(false);
          switch (err.status) {
            case 404: // Not found
              return this.openDialog();
            default:
            // TODO: show error toast
          }
        },
      });
  }

  setTokenAndRedirect(data: AccessToken) {
    localStorage.setItem('token', data.access_token);
    return this.router.navigate(['/']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      data: { email: this.email.value },
    });
    dialogRef.afterClosed().subscribe((email) => {
      if (email == undefined) {
        return;
      }
      this.isLoading.set(true);
      this.userService
        .userControllerSignUp({ body: { email: email } })
        .subscribe({
          next: (data) => this.setTokenAndRedirect(data),
          error: () => {
            // TODO: show error toast
            this.isLoading.set(false);
          },
        });
    });
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}
