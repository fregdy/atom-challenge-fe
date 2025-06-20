import {Routes} from '@angular/router';
import {TaskListComponent} from './components/task-list/task-list.component';
import {authGuard} from './core/auth-guard';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
];
