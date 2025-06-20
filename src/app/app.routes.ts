import { Routes } from '@angular/router';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { authGuard } from './core/auth-guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskTableComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
];
